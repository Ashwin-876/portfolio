import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { icon: Mail, label: "Email", value: "ashwinshaijus@gmail.com", href: "mailto:ashwinshaijus@gmail.com" },
  { icon: FaLinkedin, label: "LinkedIn", value: "linkedin.com/in/ashwinshaiju", href: "https://linkedin.com/in/ashwinshaiju" },
  { icon: FaGithub, label: "GitHub", value: "github.com/Ashwin-876", href: "https://github.com/Ashwin-876" },
  { icon: FaInstagram, label: "Instagram", value: "instagram.com/ashwin_876_", href: "https://instagram.com/ashwin_876_" },
  { icon: MapPin, label: "Location", value: "Chennai, India", href: null },
];

export default function ContactForm() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scroll reveal for the whole container
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 100 },
      {
        opacity: 1, 
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Staggered reveal for contact cards
    const cards = containerRef.current.querySelectorAll('.contact-card');
    gsap.fromTo(cards,
      { opacity: 0, x: -50, filter: 'blur(10px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // Floating idle animation for cards
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: -5,
        duration: 2 + Math.random(),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });
  }, []);

  // Magnetic Button Effect
  useEffect(() => {
    if (!buttonRef.current) return;
    const xTo = gsap.quickTo(buttonRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(buttonRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const rect = buttonRef.current.parentElement.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const wrapper = buttonRef.current.parentElement;
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (formRef.current) formRef.current.reset();
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section className="relative w-full bg-black py-24 z-10 overflow-hidden" id="contact-form">
      {/* Ambient background visuals */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none translate-y-1/4 translate-x-1/4" />

      <div ref={containerRef} className="max-w-[90rem] mx-auto px-6 sm:px-12 md:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: Contact Cards & Info */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-emerald-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
                Available for Freelance & AI Projects
              </span>
            </div>
            <h3 className="text-white text-4xl md:text-5xl font-light tracking-tight mt-2">
              Let's start a <br/>
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">conversation.</span>
            </h3>
            <p className="text-neutral-400 font-light text-sm max-w-sm leading-relaxed">
              Drop me a message below or reach out through my social profiles. I typically respond within 24 hours.
            </p>
          </div>

          <div className="flex flex-col gap-4 relative">
            {contactLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target={link.href ? "_blank" : undefined}
                rel={link.href ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.02, x: 10 }}
                className={`contact-card flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-colors duration-300 group ${!link.href && 'cursor-default'}`}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300">
                  <link.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-400 group-hover:text-cyan-400 font-bold transition-colors">{link.label}</span>
                </div>
              </motion.a>
            ))}
            
            {/* Holographic Orb behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[60px] -z-10 mix-blend-screen" />
          </div>
        </div>

        {/* RIGHT COLUMN: Premium Glassmorphism Form */}
        <div className="lg:col-span-8 w-full relative">
          
          <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 rounded-[34px] blur-xl opacity-50 pointer-events-none" />
          
          <div className="relative w-full bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Internal reflections */}
            <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none" />
            
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 group">
                  <label className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base placeholder-neutral-500 outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2 group">
                  <label className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base placeholder-neutral-500 outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 group">
                <label className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Project Type</label>
                <select 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-neutral-900">Select type...</option>
                  <option value="Web Development" className="bg-neutral-900">Web Development</option>
                  <option value="AI Integration" className="bg-neutral-900">AI Integration / Dashboard</option>
                  <option value="UI/UX Design" className="bg-neutral-900">UI/UX Design</option>
                  <option value="Other" className="bg-neutral-900">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 group">
                <label className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Message</label>
                <textarea 
                  rows="6"
                  required 
                  placeholder="Tell me about your vision, timeline, and goals..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base placeholder-neutral-500 outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 resize-none"
                />
              </div>

              <div className="mt-4 inline-block relative">
                {/* Magnetic Wrapper */}
                <div className="p-4 -m-4"> 
                  <button 
                    ref={buttonRef}
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="relative w-full md:w-auto px-20 py-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center gap-5 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
                    
                    <span className="relative z-10 text-white font-bold tracking-[0.25em] text-lg uppercase drop-shadow-md">
                      {isSubmitting ? 'SENDING...' : submitted ? 'SENT SUCCESSFULLY' : 'SEND MESSAGE'}
                    </span>
                    
                    {!isSubmitting && !submitted && (
                      <Send className="relative z-10 w-7 h-7 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 drop-shadow-md" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
