import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);
  const [activeItem, setActiveItem] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleRef = useRef(null);
  const dotsRef = useRef([]);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);

  const navItems = ['Home', 'About', 'Projects', 'Services', 'Clients', 'Testimonials', 'Contact'];

  // Handle scroll to add premium blur/opacity adjustments
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Entrance Animation
  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  // Menu Toggle Animation (Dot Grid to X Morph)
  useEffect(() => {
    const tl = gsap.timeline();
    
    if (isOpen) {
      // Morph 2x2 dots into an X (white lines on dark bg)
      tl.to(dotsRef.current[0], { x: 3, y: 3, scaleX: 3.2, rotate: 45, backgroundColor: '#ffffff', duration: 0.45, ease: "power3.inOut" }, 0)
        .to(dotsRef.current[3], { x: -3, y: -3, scaleX: 3.2, rotate: 45, backgroundColor: '#ffffff', duration: 0.45, ease: "power3.inOut", opacity: 0 }, 0)
        .to(dotsRef.current[1], { x: -3, y: 3, scaleX: 3.2, rotate: -45, backgroundColor: '#ffffff', duration: 0.45, ease: "power3.inOut" }, 0)
        .to(dotsRef.current[2], { x: 3, y: -3, scaleX: 3.2, rotate: -45, backgroundColor: '#ffffff', duration: 0.45, ease: "power3.inOut", opacity: 0 }, 0)
        
        // Change text to CLOSE with slide-up effect
        .to(textRef.current, { opacity: 0, y: -8, duration: 0.2, ease: "power2.in" }, 0)
        .add(() => { if(textRef.current) textRef.current.innerText = "CLOSE" }, 0.2)
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.2)
        
        // Show Fullscreen Overlay
        .to(overlayRef.current, { autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 0)
        
        // Stagger list items in with rotation, drift and letter-spacing
        .fromTo(menuItemsRef.current, 
          { y: 50, opacity: 0, letterSpacing: "-0.05em" },
          { y: 0, opacity: 1, letterSpacing: "0em", duration: 0.9, stagger: 0.08, ease: "power3.out" },
          0.15
        );
    } else {
      // Morph toggle back to 2x2 grid (dark dots)
      tl.to(dotsRef.current, { x: 0, y: 0, scaleX: 1, rotate: 0, opacity: 1, backgroundColor: 'rgba(0,0,0,0.7)', duration: 0.45, ease: "power3.inOut" }, 0)
        
        // Change text back to MENU
        .to(textRef.current, { opacity: 0, y: 8, duration: 0.2, ease: "power2.in" }, 0)
        .add(() => { if(textRef.current) textRef.current.innerText = "MENU" }, 0.2)
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.2)

        // Hide list items
        .to(menuItemsRef.current, { y: 25, opacity: 0, duration: 0.35, stagger: -0.04, ease: "power2.in" }, 0)
        
        // Hide Overlay
        .to(overlayRef.current, { autoAlpha: 0, duration: 0.6, ease: "power3.inOut" }, 0.15);
    }
  }, [isOpen]);

  const handleMenuClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);
    
    // Smooth scroll to section
    const targetElement = document.getElementById(item.toLowerCase());
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* FULLSCREEN MOBILE OVERLAY */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl invisible opacity-0 flex flex-col items-center justify-center pointer-events-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 pointer-events-none"></div>
        
        {/* Futuristic glowing blur ambient background inside overlay */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <ul className="flex flex-col items-center gap-6 relative z-10">
          {navItems.map((item, i) => (
            <li 
              key={item} 
              ref={el => menuItemsRef.current[i] = el}
              className="opacity-0 translate-y-10"
            >
              <button 
                onClick={() => handleMenuClick(item)}
                className={`text-4xl sm:text-5xl md:text-7xl font-light tracking-tight transition-all duration-500 hover:scale-105 hover:tracking-wide ${
                  activeItem === item 
                    ? 'text-white font-normal drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'text-white/30 hover:text-white/80'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 md:px-8 pointer-events-none">
        <nav 
          ref={navRef}
          className={`pointer-events-auto flex items-center justify-between px-4 md:px-6 py-3 w-full max-w-5xl transition-all duration-500 rounded-full border ${
            isOpen
              ? 'bg-transparent border-transparent'
              : isScrolled
                ? 'bg-white/80 border-neutral-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl'
                : 'bg-white/30 border-white/20 shadow-[0_4px_24px_rgb(0,0,0,0.02)] backdrop-blur-md'
          }`}
        >
          {/* Left Side Logo */}
          <div 
            onClick={() => handleMenuClick('Home')} 
            className="flex-shrink-0 cursor-pointer flex items-center group"
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-500 group-hover:rotate-90">
              <path d="M8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H0V8C0 3.58172 3.58172 0 8 0Z" className={`transition-colors duration-500 ${isOpen ? 'fill-white' : 'fill-black'}`}/>
              <path d="M12 10L20 16L12 22V10Z" className={`transition-colors duration-500 ${isOpen ? 'fill-black' : 'fill-white'}`}/>
            </svg>
            <span className={`ml-3 font-semibold tracking-[0.25em] text-xs uppercase transition-colors duration-500 ${isOpen ? 'text-white' : 'text-black'}`}>Ashwin S</span>
          </div>

          {/* Center Menu (Desktop Only) */}
          <div className={`hidden lg:flex items-center space-x-1.5 transition-opacity duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {navItems.map((item) => (
              <button 
                key={item} 
                onClick={() => handleMenuClick(item)}
                className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                  activeItem === item 
                    ? 'bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/10' 
                    : 'text-black/50 hover:bg-black/5 hover:text-black'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Section (CTA + Custom Toggle) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleMenuClick('Contact')}
              className={`hidden sm:flex group items-center gap-2.5 backdrop-blur-md transition-all duration-500 rounded-full px-6 py-2.5 text-xs tracking-wider uppercase font-medium hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] border ${
                isOpen
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  : 'bg-black text-white hover:bg-neutral-800 border-black'
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400"></span>
              </span>
              HIRE ME
            </button>




            {/* EXPANDABLE PILL + DOT GRID TOGGLE (Mobile & Tablet) */}
            <button 
              ref={toggleRef}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative flex items-center gap-3 px-4 h-11 rounded-full transition-all duration-500 backdrop-blur-md group overflow-hidden border ${
                isOpen 
                  ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white' 
                  : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'
              }`}
            >
              <span 
                ref={textRef} 
                className="text-[9px] font-bold tracking-[0.2em] uppercase origin-center inline-block"
              >
                Menu
              </span>
              
              {/* 2x2 Dot Grid Icon */}
              <div className="relative w-3.5 h-3.5 grid grid-cols-2 grid-rows-2 gap-[2.5px] items-center justify-center">
                <div ref={el => dotsRef.current[0] = el} className="bg-black/70 rounded-full w-1.5 h-1.5 origin-center transition-colors duration-500"></div>
                <div ref={el => dotsRef.current[1] = el} className="bg-black/70 rounded-full w-1.5 h-1.5 origin-center transition-colors duration-500"></div>
                <div ref={el => dotsRef.current[2] = el} className="bg-black/70 rounded-full w-1.5 h-1.5 origin-center transition-colors duration-500"></div>
                <div ref={el => dotsRef.current[3] = el} className="bg-black/70 rounded-full w-1.5 h-1.5 origin-center transition-colors duration-500"></div>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

