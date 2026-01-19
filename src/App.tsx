// This is my portfolio website

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";

import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import PixelSnow from "./components/PixelSnow";

const queryClient = new QueryClient();

const App = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile device
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background relative">
          {/* Pixel Snow Background */}
          <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
            <PixelSnow 
              color="#ffffff"
              flakeSize={0.01}
              minFlakeSize={1.25}
              pixelResolution={500}
              speed={0.50}
              density={0.3}
              direction={125}
              brightness={1}
              depthFade={8}
              farPlane={20}
              gamma={0.4545}
              variant="round"
            />
          </div>
          
          {/* Main Content */}
          <div className={`relative z-10 ${isMobile ? 'w-[98%]' : ''}`}>
            <Navbar />
<main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            
            <Education />
            <Experience />
            <Contact />
          </main>
            <Footer />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

