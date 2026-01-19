import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi';
import { portfolioData } from '../data/content';
import { containerVariants, itemVariants } from '../utils/motionVariants';

const Contact = () => {
  const { contact, personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rateLimitError, setRateLimitError] = useState('');
  const submissionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSubmissionTime = useRef<number>(0);
  const submissionAttempts = useRef<number>(0);

  // Rate limiting: max 1 submission per 30 seconds, max 5 submissions per hour
  const RATE_LIMIT_SECONDS = 30;
  const HOURLY_LIMIT = 5;
  const HOUR_IN_MS = 3600000;

  // Check rate limiting on mount
  useEffect(() => {
    const resetTime = localStorage.getItem('contactResetTime');
    const attempts = parseInt(localStorage.getItem('contactAttempts') || '0');
    
    if (resetTime && Date.now() > parseInt(resetTime)) {
      localStorage.removeItem('contactAttempts');
      localStorage.removeItem('contactResetTime');
      localStorage.removeItem('lastSubmissionTime');
      submissionAttempts.current = 0;
    } else {
      submissionAttempts.current = attempts;
      const lastTime = parseInt(localStorage.getItem('lastSubmissionTime') || '0');
      lastSubmissionTime.current = lastTime;
    }

    return () => {
      if (submissionTimeoutRef.current) {
        clearTimeout(submissionTimeoutRef.current);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Enhanced validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
    } else if (formData.email.trim().length > 254) {
      newErrors.email = 'Email is too long';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }
    
    // Check for potential spam patterns
    const messageLower = formData.message.toLowerCase();
    const spamPatterns = ['http://', 'https://', 'www.', '.com', 'click here', 'buy now', 'free money', 'urgent'];
    if (spamPatterns.some(pattern => messageLower.includes(pattern))) {
      newErrors.message = 'Message appears to contain spam content';
    }
    
    return newErrors;
  };

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    
    // Reset hourly counter if hour has passed
    if (now - lastSubmissionTime.current > HOUR_IN_MS) {
      submissionAttempts.current = 0;
      localStorage.removeItem('contactAttempts');
      localStorage.removeItem('contactResetTime');
    }
    
    // Check hourly limit
    if (submissionAttempts.current >= HOURLY_LIMIT) {
      const timeUntilReset = Math.ceil((HOUR_IN_MS - (now - lastSubmissionTime.current)) / 60000);
      setRateLimitError(`Hourly limit reached. Please try again in ${timeUntilReset} minutes.`);
      return false;
    }
    
    // Check rate limit between submissions
    const timeSinceLastSubmission = now - lastSubmissionTime.current;
    if (timeSinceLastSubmission < RATE_LIMIT_SECONDS * 1000) {
      const waitTime = RATE_LIMIT_SECONDS - Math.ceil(timeSinceLastSubmission / 1000);
      setRateLimitError(`Please wait ${waitTime} seconds before submitting another message.`);
      return false;
    }
    
    setRateLimitError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limit first
    if (!checkRateLimit()) {
      return;
    }
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Sanitize input data
      const sanitizedData = {
        name: formData.name.trim().replace(/[<>]/g, ''),
        email: formData.email.trim().toLowerCase().replace(/[<>]/g, ''),
        message: formData.message.trim().replace(/[<>]/g, ''),
        createdAt: serverTimestamp(),
        ip: 'client-side', // Note: In production, get real IP from server
        userAgent: navigator.userAgent.substring(0, 200), // Limit length
      };
      
      // Add contact details to Firestore with error handling
      let writeSuccess = false;
      try {
        await addDoc(collection(db, 'contacts'), sanitizedData);
        writeSuccess = true;
        
        // Update rate limiting counters
        const now = Date.now();
        lastSubmissionTime.current = now;
        submissionAttempts.current += 1;
        localStorage.setItem('lastSubmissionTime', now.toString());
        localStorage.setItem('contactAttempts', submissionAttempts.current.toString());
        localStorage.setItem('contactResetTime', (now + HOUR_IN_MS).toString());
        
      } catch (err) {
        console.error('❌ Failed to write contact to Firestore:', err);
        setErrors({ submit: 'Failed to send message. Please try again later.' });
      } finally {
        setIsSubmitting(false);
      }

      if (writeSuccess) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        // Reset success state after 5 seconds
        submissionTimeoutRef.current = setTimeout(() => setIsSubmitted(false), 5000);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text"
        >
          {contact.title}
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg text-muted-foreground text-center mb-16"
        >
          {contact.copy}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            {rateLimitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm"
              >
                {rateLimitError}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    maxLength={100}
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors focus-ring ${
                      errors.name ? 'border-red-500' : 'border-border hover:border-primary/40 focus:border-primary'
                    }`}
                    placeholder="Your name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  maxLength={254}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors focus-ring ${
                    errors.email ? 'border-red-500' : 'border-border hover:border-primary/40 focus:border-primary'
                  }`}
                  placeholder="your.email@example.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  autoComplete="off"
                  maxLength={1000}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors resize-none focus-ring ${
                    errors.message ? 'border-red-500' : 'border-border hover:border-primary/40 focus:border-primary'
                  }`}
                  placeholder="Your message..."
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
                {errors.submit && (
                  <p className="mt-1 text-sm text-red-400">{errors.submit}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={!isSubmitting && !isSubmitted ? { y: -2 } : {}}
                whileTap={!isSubmitting && !isSubmitted ? { scale: 0.95 } : {}}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all focus-ring ${
                  isSubmitted
                    ? 'bg-green-600 text-white'
                    : isSubmitting
                    ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <FiCheck className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    {contact.submitLabel}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="card-interactive p-8 bg-gradient-to-br from-card/80 to-card/40">
              <h3 className="text-xl font-semibold text-foreground mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                {contact.altContacts.map((contactInfo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {contactInfo.label === 'Email' && <FiMail className="w-5 h-5 text-primary" />}
                      {contactInfo.label === 'LinkedIn' && <FiLinkedin className="w-5 h-5 text-primary" />}
                      {contactInfo.label === 'GitHub' && <FiGithub className="w-5 h-5 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{contactInfo.label}</p>
                      <p className="text-sm text-muted-foreground">{contactInfo.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <motion.a
                href={`mailto:${personal.email}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 button-secondary focus-ring"
              >
                <FiMail className="w-4 h-4 mr-2" />
                Email
              </motion.a>
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 button-secondary focus-ring"
              >
                <FiLinkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;