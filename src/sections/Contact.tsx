import { useState } from 'react';
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Add contact details to Firestore with error handling
      let writeSuccess = false;
      try {
        await addDoc(collection(db, 'contacts'), {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          createdAt: serverTimestamp(),
        });
        writeSuccess = true;
      } catch (err) {
        console.error('❌ Failed to write contact to Firestore:', err);
      } finally {
        setIsSubmitting(false);
      }

      if (writeSuccess) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        // Reset success state after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
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
                  className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors focus-ring ${
                    errors.name ? 'border-red-500' : 'border-border hover:border-primary/40 focus:border-primary'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
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
                  className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors focus-ring ${
                    errors.email ? 'border-red-500' : 'border-border hover:border-primary/40 focus:border-primary'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
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
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg bg-input border transition-colors resize-none focus-ring ${
                    errors.message ? 'border-red-500' : 'border-border hover:border-primary/40 focus:border-primary'
                  }`}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
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