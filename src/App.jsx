import React, { useEffect, useRef, useState } from 'react';
import PremiumHero from './components/PremiumHero';
import PillNav from './components/PillNav';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import CircularGallery from './components/CircularGallery';
import LogoLoop from './components/LogoLoop';
import CountUpStat from './components/CountUpStat';
import Shuffle from './components/Shuffle';
import Folder from './components/Folder';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss, SiNodedotjs, SiMongodb, SiFigma, SiGithub, SiPython, SiFirebase } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import TechStack from './components/TechStack';
import ContactCTA from './components/ContactCTA';
import ContactForm from './components/ContactForm';
import PremiumFooter from './components/PremiumFooter';
import AIProfileCard from './components/AIProfileCard';
import AITimeline from './components/AITimeline';
import AITerminal from './components/AITerminal';
import AIFuturisticExperience from './components/AIFuturisticExperience';
import SplitLoadingScreen from './components/SplitLoadingScreen';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss />, title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://mongodb.com" },
  { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiPython />, title: "Python", href: "https://python.org" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
];

// Import local premium AI Developer WebGL showcase images
import aiNetworkImg from './assets/ai_network.png';
import aiDashboardImg from './assets/ai_dashboard.png';
import aiBrainImg from './assets/ai_brain.png';
import aiGlobeImg from './assets/ai_globe.png';
import aiCyberImg from './assets/ai_cyber.png';
import aiFlowImg from './assets/ai_flow.png';

// Silicon Valley WebGL Gallery Items List
const galleryItems = [
  { image: aiNetworkImg, text: 'Neural Synapse Core' },
  { image: aiDashboardImg, text: 'ML Coding Interface' },
  { image: aiBrainImg, text: 'Cognitive Cybernetic Brain' },
  { image: aiGlobeImg, text: 'Global Data Cyberspace' },
  { image: aiCyberImg, text: 'Cyber Command Room' },
  { image: aiFlowImg, text: 'Algorithmic Flow Grid' }
];

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Interactive Canvas Floating Particles Component
function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles = [];
    const properties = {
      bgColor: 'transparent',
      particleColor: 'rgba(59, 130, 246, 0.08)', // Soft blue transparent nodes
      particleRadius: 2.2,
      particleCount: 75,
      maxVelocity: 0.6,
      lineLength: 140,
    };

    window.onresize = () => {
      if(canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX = (Math.random() * (properties.maxVelocity * 2)) - properties.maxVelocity;
        this.velocityY = (Math.random() * (properties.maxVelocity * 2)) - properties.maxVelocity;
      }

      position() {
        if (this.x + this.velocityX > w || this.x + this.velocityX < 0) {
          this.velocityX = -this.velocityX;
        }
        if (this.y + this.velocityY > h || this.y + this.velocityY < 0) {
          this.velocityY = -this.velocityY;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    function drawLines() {
      let x1, y1, x2, y2, length, opacity;
      for (let i in particles) {
        for (let j in particles) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 1 - (length / properties.lineLength);
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.05})`; // Soft network lines
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    }

    let animationFrameId;
    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (let i in particles) {
        particles[i].position();
        particles[i].draw();
      }
      drawLines();
      animationFrameId = requestAnimationFrame(loop);
    }

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// Exactly 6 Premium Services Data
const servicesData = [
  { 
    id: "01", 
    name: "Web Development", 
    desc: "Building ultra-fast responsive websites using Next.js, React, GSAP, Tailwind CSS, and scalable frontend architectures optimized for performance and modern user experience.",
    tech: ["Next.js", "React", "GSAP", "Tailwind CSS", "Performance"],
    bgClass: "bg-blue-600 group-hover:bg-blue-500",
    shadowClass: "shadow-[0_20px_50px_rgba(37,99,235,0.15)] group-hover:shadow-[0_32px_100px_rgba(37,99,235,0.3)] border-blue-400/30 group-hover:border-blue-300/50",
    textClass: "text-white",
    descClass: "text-blue-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "02", 
    name: "App Development", 
    desc: "Designing cross-platform mobile applications with Flutter and React Native integrated with cloud databases, authentication systems, and AI-powered features.",
    tech: ["Flutter", "React Native", "Cloud Databases", "Auth", "AI Features"],
    bgClass: "bg-emerald-600 group-hover:bg-emerald-500",
    shadowClass: "shadow-[0_20px_50px_rgba(5,150,105,0.15)] group-hover:shadow-[0_32px_100px_rgba(5,150,105,0.3)] border-emerald-400/30 group-hover:border-emerald-300/50",
    textClass: "text-white",
    descClass: "text-emerald-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "03", 
    name: "UI/UX Design", 
    desc: "Crafting premium Apple-inspired interfaces with minimal layouts, smooth interactions, advanced prototyping, and pixel-perfect design systems.",
    tech: ["Apple-Inspired", "Minimal Layouts", "Prototyping", "Design Systems"],
    bgClass: "bg-purple-600 group-hover:bg-purple-500",
    shadowClass: "shadow-[0_20px_50px_rgba(147,51,234,0.15)] group-hover:shadow-[0_32px_100px_rgba(147,51,234,0.3)] border-purple-400/30 group-hover:border-purple-300/50",
    textClass: "text-white",
    descClass: "text-purple-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "04", 
    name: "AI Solutions", 
    desc: "Developing intelligent AI systems including chatbots, computer vision, recommendation engines, automation tools, and generative AI integrations.",
    tech: ["Chatbots", "Computer Vision", "Automation", "Generative AI"],
    bgClass: "bg-amber-600 group-hover:bg-amber-500",
    shadowClass: "shadow-[0_20px_50px_rgba(217,119,6,0.15)] group-hover:shadow-[0_32px_100px_rgba(217,119,6,0.3)] border-amber-400/30 group-hover:border-amber-300/50",
    textClass: "text-white",
    descClass: "text-amber-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "05", 
    name: "SaaS Development", 
    desc: "Building scalable SaaS platforms with dashboards, authentication, subscriptions, payment gateways, analytics, and secure backend infrastructures.",
    tech: ["Dashboards", "Auth", "Subscriptions", "Payment", "Analytics"],
    bgClass: "bg-rose-600 group-hover:bg-rose-500",
    shadowClass: "shadow-[0_20px_50px_rgba(225,29,72,0.15)] group-hover:shadow-[0_32px_100px_rgba(225,29,72,0.3)] border-rose-400/30 group-hover:border-rose-300/50",
    textClass: "text-white",
    descClass: "text-rose-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "06", 
    name: "Motion Design", 
    desc: "Creating cinematic web experiences using GSAP, Framer Motion, Lenis smooth scrolling, split text animations, parallax effects, and immersive transitions.",
    tech: ["GSAP", "Framer Motion", "Lenis", "Parallax", "Transitions"],
    bgClass: "bg-indigo-600 group-hover:bg-indigo-500",
    shadowClass: "shadow-[0_20px_50px_rgba(79,70,229,0.15)] group-hover:shadow-[0_32px_100px_rgba(79,70,229,0.3)] border-indigo-400/30 group-hover:border-indigo-300/50",
    textClass: "text-white",
    descClass: "text-indigo-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  }
];

// Custom Premium Service Card Component with magnetic mouse effects
function ServiceCard({ srv, isGrid }) {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Use quickTo for massive performance boost on mouse move tracking
  // This prevents creating hundreds of new tweens per second, which causes GC micro-stutter
  const xTo = useRef(null);
  const yTo = useRef(null);
  const rotXTo = useRef(null);
  const rotYTo = useRef(null);
  const glowXTo = useRef(null);
  const glowYTo = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // Set initial perspective so quickTo can animate 3D transforms properly
    gsap.set(cardRef.current, { transformPerspective: 1000 });
    
    // Initialize high-performance GSAP setters
    xTo.current = gsap.quickTo(cardRef.current, "x", { duration: 0.4, ease: "power3.out" });
    yTo.current = gsap.quickTo(cardRef.current, "y", { duration: 0.4, ease: "power3.out" });
    rotXTo.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.4, ease: "power3.out" });
    rotYTo.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.4, ease: "power3.out" });
    
    if (glowRef.current) {
      glowXTo.current = gsap.quickTo(glowRef.current, "x", { duration: 0.2, ease: "power2.out" });
      glowYTo.current = gsap.quickTo(glowRef.current, "y", { duration: 0.2, ease: "power2.out" });
    }
  }, []);

  const handleMouseMove = (e) => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !xTo.current) return;
    
    // Calculate position relative to the static wrapper
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Pipe values directly into the high-performance setters
    xTo.current(x * 0.15);
    yTo.current(y * 0.15);
    rotXTo.current(-y * 0.05);
    rotYTo.current(x * 0.05);

    if (glowRef.current && glowXTo.current) {
      glowXTo.current(e.clientX - rect.left);
      glowYTo.current(e.clientY - rect.top);
      // Ensure glow is visible
      gsap.to(glowRef.current, { opacity: 1, duration: 0.2, overwrite: "auto" });
    }
  };

  const handleMouseLeave = () => {
    if (!xTo.current) return;

    // Reset card translation and rotation smoothly using the same cached tweens
    xTo.current(0);
    yTo.current(0);
    rotXTo.current(0);
    rotYTo.current(0);

    // Hide glow spotlight smoothly
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
    }
  };

  // Safe fallback for transition so we don't accidentally transition transforms
  const safeTransitionStyle = { transition: "border-color 0.5s ease-out, box-shadow 0.5s ease-out" };

  if (isGrid) {
    return (
      <div 
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full group"
      >
      <div 
        ref={cardRef}
        style={safeTransitionStyle}
        className={`grid-service-card relative p-8 md:p-10 border rounded-[32px] ${srv.bgClass} flex flex-col justify-between gap-6 ${srv.shadowClass} cursor-default overflow-hidden select-none h-full min-h-[420px] w-full transition-all duration-500`}
      >
        {/* Dynamic Cursor-Tracking Glow Spotlight (Inside the Card) */}
        <div 
          ref={glowRef}
          className={`absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 ${srv.glowClass} rounded-full blur-[60px] pointer-events-none opacity-0 left-0 top-0`}
        />
        
        {/* Subtle Static Ambient Glow Blob (Under the Card/Behind Card) */}
        <div className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full ${srv.glowClass} blur-[40px] group-hover:scale-125 transition-all duration-700 pointer-events-none`} />

        <div className="flex flex-col gap-4 relative z-10">
          <span className={`${srv.descClass} opacity-80 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300`}>
            {srv.id} / SERVICE CARD
          </span>
          <h3 className={`${srv.textClass} text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300`}>
            {srv.name}
          </h3>
          <p className={`${srv.descClass} font-light text-sm sm:text-base leading-relaxed mt-2`}>
            {srv.desc}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
          {srv.tech.map((t) => (
            <span key={t} className={`border text-[10px] px-3 py-1.5 rounded-full font-mono uppercase tracking-wider ${srv.tagClass} transition-colors duration-300`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      </div>
    );
  }

  return (
    <div 
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[95vw] lg:max-w-[1400px] group min-h-[500px] md:min-h-[600px] mx-auto"
    >
      <div 
        ref={cardRef}
        style={safeTransitionStyle}
        className={`relative w-full h-full p-12 md:p-20 border rounded-[40px] ${srv.bgClass} flex flex-col md:flex-row md:items-center justify-between gap-12 md:gap-20 ${srv.shadowClass} cursor-default overflow-hidden select-none transition-all duration-500`}
      >
        {/* Dynamic Cursor-Tracking Glow Spotlight (Inside the Card) */}
        <div 
          ref={glowRef}
          className={`absolute w-[36rem] h-[36rem] -translate-x-1/2 -translate-y-1/2 ${srv.glowClass} rounded-full blur-[90px] pointer-events-none opacity-0 left-0 top-0`}
        />
        
        {/* Subtle Static Ambient Glow Blob (Under the Card/Behind Card) */}
        <div className={`absolute -right-36 -bottom-36 w-80 h-80 rounded-full ${srv.glowClass} blur-[60px] group-hover:scale-125 transition-all duration-700 pointer-events-none`} />

        <div className="flex flex-col gap-6 max-w-lg relative z-10 w-full">
          <span className={`${srv.descClass} opacity-80 font-mono text-xs md:text-sm font-bold tracking-[0.25em] uppercase transition-colors duration-300`}>
            {srv.id} / SERVICE CARD
          </span>
          <h3 className={`${srv.textClass} text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-300`}>
            {srv.name}
          </h3>
        </div>
        
        <div className="flex flex-col gap-8 max-w-md md:items-end md:text-right relative z-10 w-full">
          <p className={`${srv.descClass} font-light text-base md:text-lg leading-relaxed`}>
            {srv.desc}
          </p>
          <div className="flex flex-wrap gap-2.5 md:justify-end">
            {srv.tech.map((t) => (
              <span key={t} className={`border text-[10px] md:text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-wider ${srv.tagClass} transition-colors duration-300`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeItem, setActiveItem] = useState('#home');

  const pillNavItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CLIENTS', href: '#clients' },
    { label: 'TESTIMONIALS', href: '#testimonials' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'HIRE ME', href: '#hire', highlight: true } // highlight prop is custom to add the blue dot
  ];

  const [loading, setLoading] = useState(true);
  const [servicesViewMode, setServicesViewMode] = useState('stack');
  const horizontalRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);


  // Horizontal Scroll Setup (exactly 10 projects track)
  useEffect(() => {
    if (loading) return;

    const sections = horizontalRef.current;
    if (!sections) return;

    const pin = gsap.to(sections, {
      x: () => -(sections.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${sections.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      pin.kill();
    };
  }, [loading]);

  // Scroll Progress and Reveal Timelines
  useEffect(() => {
    if (loading) return;

    gsap.to(scrollIndicatorRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, [loading]);

  // Recalculate ScrollTrigger markers on view mode toggle
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [servicesViewMode]);

  // GSAP stagger reveal for grid view service cards
  useEffect(() => {
    if (loading || servicesViewMode !== 'grid') return;

    const cards = document.querySelectorAll('.grid-service-card');
    if (!cards.length) return;

    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#services-grid-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [loading, servicesViewMode]);

  // GSAP stagger reveal for testimonial reviews cards
  useEffect(() => {
    if (loading) return;

    const cards = document.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.9, 
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#testimonials-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [loading]);



  // Exactly 10 Sample Projects Data
  const projectsData = [
    {
      num: "01",
      title: "AI Power Line Detection System",
      desc: "Advanced AI-powered infrastructure monitoring platform that detects vegetation growth, damaged electrical components, and dangerous obstacles near power transmission lines using CNN models, OpenCV image processing, and real-time analytics dashboards for smart grid maintenance and safety management.",
      tech: ["Python", "TensorFlow", "OpenCV", "React", "Firebase", "Node.js"],
      color: "from-blue-400 to-indigo-500",
      status: "Completed Successfully",
      performance: ["98% Detection Accuracy", "40% Faster Monitoring"]
    },
    {
      num: "02",
      title: "FreshNova Food Expiry Tracker",
      desc: "Modern AI-powered food management platform that tracks food expiry dates, sends intelligent notifications, recommends recipes using available ingredients, and helps reduce food waste through predictive AI suggestions and cloud synchronization.",
      tech: ["React Native", "Firebase", "Node.js", "MongoDB", "Express"],
      color: "from-cyan-400 to-teal-500",
      status: "Live Product",
      performance: ["15K+ Active Users", "4.9★ User Rating"]
    },
    {
      num: "03",
      title: "Smart IoT Home Automation",
      desc: "Next-generation IoT-powered smart home ecosystem for controlling lights, appliances, sensors, and security systems with real-time monitoring, voice assistant integration, cloud automation, and intelligent energy optimization dashboards.",
      tech: ["Arduino", "MQTT", "React", "ESP32", "Firebase", "Node.js"],
      color: "from-indigo-400 to-purple-500",
      status: "Production Ready",
      performance: ["99.9% System Stability", "60% Energy Optimization"]
    },
    {
      num: "04",
      title: "AI Resume Analyzer Platform",
      desc: "AI-powered resume analysis platform that scans resumes, evaluates ATS compatibility, identifies missing skills, and provides intelligent career improvement suggestions using OpenAI models, NLP technologies, and smart recommendation systems.",
      tech: ["React", "Python", "Flask", "OpenAI API", "MongoDB", "Tailwind CSS"],
      color: "from-rose-400 to-pink-500",
      status: "Live SaaS Platform",
      performance: ["92% ATS Accuracy", "20K+ Resume Scans"]
    },
    {
      num: "05",
      title: "Crypto Dashboard Analytics App",
      desc: "Advanced cryptocurrency analytics dashboard with live market tracking, AI-powered predictions, portfolio management, interactive trading charts, and real-time financial insights for modern crypto investors and traders.",
      tech: ["Next.js", "Tailwind CSS", "Chart.js", "Firebase", "CoinGecko API"],
      color: "from-amber-400 to-orange-500",
      status: "Live SaaS Dashboard",
      performance: ["120K+ Monthly Users", "99.8% Server Uptime"]
    },
    {
      num: "06",
      title: "Modern Portfolio Website",
      desc: "Interactive futuristic portfolio experience featuring immersive GSAP animations, smooth scrolling transitions, cinematic layouts, 3D motion effects, premium storytelling sections, and advanced UI interactions.",
      tech: ["React", "GSAP", "Framer Motion", "Three.js", "Lenis Scroll"],
      color: "from-emerald-400 to-teal-500",
      status: "Award-Winning Concept",
      performance: ["95+ Lighthouse Score", "Ultra Smooth 120FPS"]
    },
    {
      num: "07",
      title: "Smart Attendance System using Face Recognition",
      desc: "AI-powered face recognition attendance management platform with real-time identity verification, automated reporting, cloud analytics, and intelligent monitoring using advanced computer vision technologies.",
      tech: ["Python", "OpenCV", "TensorFlow", "MongoDB", "Flask"],
      color: "from-violet-400 to-fuchsia-500",
      status: "Production Ready",
      performance: ["98% Face Detection Accuracy", "85% Faster Attendance Process"]
    },
    {
      num: "08",
      title: "AI Chatbot Assistant",
      desc: "Advanced conversational AI assistant with contextual understanding, voice interaction, multilingual support, smart automation workflows, and intelligent real-time responses powered by NLP technologies and OpenAI APIs.",
      tech: ["React", "Node.js", "OpenAI API", "Express", "MongoDB"],
      color: "from-sky-400 to-blue-500",
      status: "Live AI Platform",
      performance: ["500K+ AI Conversations", "95% User Satisfaction"]
    },
    {
      num: "09",
      title: "Finance Tracker Dashboard",
      desc: "Modern personal finance management dashboard with expense analytics, budgeting tools, savings insights, cloud synchronization, interactive financial charts, and intelligent tracking systems.",
      tech: ["React", "Firebase", "Tailwind CSS", "Chart.js", "Node.js"],
      color: "from-red-400 to-rose-500",
      status: "Live SaaS Dashboard",
      performance: ["50K+ Monthly Users", "4.9★ User Rating"]
    },
    {
      num: "10",
      title: "Cyberpunk Gaming Landing Page",
      desc: "Immersive futuristic gaming landing page experience with cinematic GSAP animations, advanced WebGL effects, interactive 3D visuals, smooth transitions, and cyberpunk-inspired premium UI interactions.",
      tech: ["React", "GSAP", "Three.js", "WebGL", "Framer Motion"],
      color: "from-purple-500 to-cyan-500",
      status: "Creative Concept Project",
      performance: ["120FPS Smooth Animations", "98+ Lighthouse Performance"]
    }
  ];

  // Exactly 15 client partners
  const clientPartners = [
    "TechNova Solutions", "FutureX Labs", "CloudSync AI", "Nexora Digital", "QuantumByte Technologies",
    "Vertex Innovations", "NovaSphere Digital", "AlphaCore Systems", "ZenithX Labs", "PixelForge Studio",
    "Orion Tech Solutions", "BlueNova AI", "HyperLink Digital", "VisionCraft Agency", "Nexify Technologies"
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#fafafa] font-sans overflow-x-hidden">
      {loading && <SplitLoadingScreen onComplete={() => setLoading(false)} />}
      
      <PillNav 
        items={pillNavItems}
        activeHref={activeItem}
        baseColor="#ffffff"
        pillColor="#111111"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#555555"
      />

      <PremiumHero />

      {/* Dynamic Scroll Progress Bar */}
      <div 
        ref={scrollIndicatorRef}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-500 w-full z-[99] origin-left scale-x-0"
      />


      {/* 1. AI ENGINEER ABOUT ME SECTION */}
      <section id="about" className="relative py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto z-10 flex flex-col gap-10 overflow-hidden">
        
        {/* Background Ambient Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="scroll-reveal flex flex-col items-center lg:items-start justify-center lg:justify-start text-center lg:text-left gap-5 relative w-full mb-8">
          <div className="flex items-center gap-3 text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-blue-500/5 px-5 py-2 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span>01 / AI ENGINEER</span>
          </div>
          
          <div className="relative inline-block group cursor-default">
            <Shuffle
              text="Crafting AI-powered immersive experiences."
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black max-w-3xl leading-[1.1]"
              shuffleDirection="up"
              duration={0.6}
              stagger={0.05}
              animationMode="evenodd"
              shuffleTimes={3}
              textAlign="left"
            />
            {/* Cinematic sweeping underline */}
            <div className="absolute -bottom-8 left-0 w-24 h-[4px] bg-gradient-to-r from-blue-600 via-violet-500 to-transparent group-hover:w-[80%] transition-all duration-1000 ease-out rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mt-4">
          
          {/* LEFT COLUMN: Text, Badges, Timeline, Terminal */}
          <div className="lg:col-span-7 flex flex-col gap-10 scroll-reveal">
            
            {/* Paragraphs */}
            <div className="flex flex-col gap-6 text-neutral-700 font-light text-lg md:text-xl leading-relaxed">
              <p>
                I design and engineer intelligent digital systems that combine artificial intelligence, cinematic interfaces, and scalable full-stack architectures. My focus lies in building futuristic products powered by automation, computer vision, and seamless user experiences.
              </p>
              <p>
                From AI-driven platforms to immersive frontend systems, I create high-performance solutions using modern technologies — delivering products that feel both intelligent and visually refined.
              </p>
              <p className="text-neutral-500 text-base md:text-lg">
                My approach blends minimal design principles with advanced AI engineering, creating experiences that are intuitive, responsive, and emotionally engaging. Every project is crafted to balance aesthetics, performance, and intelligent functionality.
              </p>
            </div>

            {/* Floating Tech Badges */}
            <div className="flex flex-wrap gap-4 mt-4">
              {['AI Systems', 'Neural UI', 'Automation', 'Computer Vision', 'Intelligent Interfaces', 'Vision AI', 'Machine Learning', 'Smart Workflows'].map((badge) => (
                <div key={badge} className="px-6 py-3 bg-white/60 backdrop-blur-md border border-neutral-200/60 rounded-full text-sm md:text-base font-semibold text-neutral-700 shadow-sm hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all duration-300 cursor-default">
                  {badge}
                </div>
              ))}
            </div>

            {/* AI Terminal Simulation */}
            <div className="mt-8">
              <AITerminal />
            </div>

          </div>
          
          {/* RIGHT COLUMN: Glassmorphism AI Profile Card */}
          <div className="lg:col-span-5 w-full h-full min-h-[500px] scroll-reveal">
            <AIProfileCard />
          </div>
          
        </div>
      </section>

      {/* 2. EXPERIENCE SECTION */}
      <section id="experience" className="relative py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto z-10 flex flex-col gap-10 overflow-hidden border-t border-neutral-100/50">
        
        {/* Section Header */}
        <div className="scroll-reveal flex flex-col items-center text-center gap-5 relative w-full mb-8">
          <div className="flex items-center gap-3 text-violet-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-violet-500/5 px-5 py-2 rounded-full border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            <span>02 / EXPERIENCE</span>
          </div>
          
          <div className="flex flex-col items-center gap-6 max-w-4xl">
            <div className="relative inline-block group cursor-default">
              <Shuffle
                text="Building intelligent systems through immersive engineering."
                tag="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-black leading-tight"
                shuffleDirection="up"
                duration={0.6}
                stagger={0.05}
                animationMode="evenodd"
                shuffleTimes={3}
                textAlign="center"
              />
              {/* Cinematic sweeping underline (Centered) */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-[4px] bg-gradient-to-r from-transparent via-violet-500 to-transparent group-hover:w-[80%] transition-all duration-1000 ease-out rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)]" />
            </div>
            
            <p className="text-neutral-500 font-light text-base md:text-lg max-w-2xl mt-4">
              Crafting AI-powered platforms, automation systems, and futuristic digital experiences.
            </p>
          </div>
        </div>

        <AIFuturisticExperience />
      </section>

      {/* 2. PREMIUM SKILLS SECTION */}
      <TechStack />

      {/* 3. FEATURED PROJECTS: Horizontal scrolling pinned panels (exactly 10 projects!) */}
      <div id="projects" ref={triggerRef} className="relative bg-black overflow-hidden">
        <div 
          ref={horizontalRef}
          className="h-screen flex items-center gap-12 pl-12 sm:pl-24 pr-48"
          style={{ width: "max-content" }}
        >
          {/* Section Introduction */}
          <div className="flex flex-col gap-4 w-[320px] sm:w-[400px] flex-shrink-0">
            <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">03 / SHOWCASE</span>
            <h2 className="text-white text-3xl sm:text-5xl font-light tracking-tight leading-[1.1]">Selected<br />Featured<br />Projects.</h2>
            <p className="text-neutral-400 font-light text-xs sm:text-sm mt-2 max-w-xs leading-relaxed">
              Scroll downward to slide through Ashwin's 10 premium sample applications demonstrating the AI-development crossroad.
            </p>
          </div>

          {/* Render exactly 10 horizontal scrolling project cards */}
          {projectsData.map((project) => (
            <div 
              key={project.num}
              className="w-[380px] sm:w-[480px] h-[60vh] flex-shrink-0 bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md flex flex-col justify-between group hover:border-white/20 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono bg-gradient-to-r ${project.color} bg-clip-text text-transparent font-semibold tracking-wider`}>
                    PROJECT {project.num}
                  </span>
                  <span className="text-xs text-white/30 font-mono">02 / 05 / 2026</span>
                </div>
                
                <h3 className="text-white text-2xl sm:text-3xl font-light tracking-tight group-hover:text-blue-300 transition-colors mt-2">
                  {project.title}
                </h3>
                
                <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed mt-2">
                  {project.desc}
                </p>

                {/* Performance & Status Metrics */}
                <div className="flex flex-col gap-2 mt-4">
                  {project.performance && project.performance.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color}`} />
                      <span className="text-white/80 text-xs sm:text-sm font-mono">{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack badges */}
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {project.tech.map((badge) => (
                    <span key={badge} className="bg-white/5 border border-white/10 text-white/80 text-[10px] sm:text-xs px-3 py-1.5 rounded-full font-mono">
                      {badge}
                    </span>
                  ))}
                  {project.status && (
                    <span className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] sm:text-xs px-3 py-1.5 rounded-full font-mono font-semibold">
                      • {project.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Badges and links */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                  Live Demo
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Source Available</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CLIENTS SECTION: Infinite client marquee slider containing exactly 15 partners */}
      <section id="clients" className="relative py-24 bg-white border-b border-neutral-200/50 z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-10">
          <div className="scroll-reveal flex flex-col items-center justify-center text-center gap-5 relative w-full mb-10">
            <div className="flex items-center gap-3 text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/20">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>04 / PARTNERS</span>
            </div>
            
            <div className="relative inline-block group cursor-default">
              <Shuffle
                text="Futuristic alliances."
                tag="h2"
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black"
                shuffleDirection="up"
                duration={0.6}
                stagger={0.05}
                animationMode="evenodd"
                shuffleTimes={3}
                textAlign="center"
              />
              {/* Glowing animated HUD underline */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-[150%] transition-all duration-700 ease-in-out rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
          </div>
        </div>

        {/* Infinite Marquee Slider with 15 clients */}
        <div className="relative flex w-full overflow-x-hidden mt-10 pointer-events-auto py-5 bg-neutral-50/50 border-y border-neutral-100 group">
          <div className="animate-marquee group-hover:[animation-play-state:paused] flex gap-12 md:gap-16 items-center pr-12">
            {clientPartners.map((client, idx) => (
              <div key={`client-${idx}`} className="flex items-center gap-3 px-6 py-4 bg-white border border-neutral-200 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.12)] hover:border-blue-300 transition-all duration-300 cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-black font-bold tracking-wider text-lg md:text-xl uppercase whitespace-nowrap">{client}</span>
              </div>
            ))}
            
            {/* Duplicated List for seamless loops */}
            {clientPartners.map((client, idx) => (
              <div key={`client-dup-${idx}`} className="flex items-center gap-3 px-6 py-4 bg-white border border-neutral-200 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.12)] hover:border-blue-300 transition-all duration-300 cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-black font-bold tracking-wider text-lg md:text-xl uppercase whitespace-nowrap">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION: Premium Apple-inspired stacked or grid service cards */}
      <section id="services" className="relative py-28 px-6 sm:px-12 md:px-20 max-w-6xl mx-auto z-10 flex flex-col gap-16">
        <div className="scroll-reveal flex flex-col items-center justify-center text-center gap-8 relative w-full mb-6">
          
          {/* Centered HUD Header */}
          <div className="flex flex-col items-center justify-center gap-5 relative w-full">
            <div className="flex items-center gap-3 text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/20">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>05 / SERVICES</span>
            </div>
            
            <div className="relative inline-block group cursor-default">
              <Shuffle
                text="Interactive Creative Solutions."
                tag="h2"
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black"
                shuffleDirection="up"
                duration={0.6}
                stagger={0.05}
                animationMode="evenodd"
                shuffleTimes={3}
                textAlign="center"
              />
              {/* Glowing animated HUD underline */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-[150%] transition-all duration-700 ease-in-out rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
          </div>
          
          {/* Segmented Selector Pill Control */}
          <div className="flex bg-neutral-100/80 p-1 rounded-full border border-neutral-200/40 shadow-[0_2px_10px_rgba(0,0,0,0.01)] relative z-30 mt-4">
            <button 
              onClick={() => setServicesViewMode('stack')}
              className={`px-5 py-2 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${servicesViewMode === 'stack' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-500 hover:text-black'}`}
            >
              Stacked View
            </button>
            <button 
              onClick={() => setServicesViewMode('grid')}
              className={`px-5 py-2 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${servicesViewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-500 hover:text-black'}`}
            >
              Grid View
            </button>
          </div>
        </div>

        {servicesViewMode === 'stack' ? (
          <ScrollStack 
            useWindowScroll={true} 
            itemDistance={120} 
            itemScale={0.02} 
            itemStackDistance={35} 
            stackPosition="24%" 
            scaleEndPosition="12%" 
            baseScale={0.88} 
            blurAmount={3}
          >
            {servicesData.map((srv) => (
              <ScrollStackItem key={srv.id}>
                <ServiceCard srv={srv} isGrid={false} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div id="services-grid-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {servicesData.map((srv) => (
              <ServiceCard key={srv.id} srv={srv} isGrid={true} />
            ))}
          </div>
        )}
      </section>

      {/* 6. CLIENT REVIEWS SECTION: Silicon Valley Dark Showcase */}
      <section id="testimonials" className="relative py-20 bg-black border-y border-neutral-900 z-10">
        {/* Futuristic glowing backdrop gradients */}
        <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 flex flex-col gap-12 relative z-10">
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">TRUSTED BY FOUNDERS GLOBALLY</span>
              <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight leading-tight">Client Reviews</h2>
            </div>
            <p className="text-neutral-400 font-light text-xs sm:text-sm max-w-md leading-relaxed">
              Partnering with forward-thinking leaders globally to build high-performance creative interfaces, complex SaaS platforms, AI dashboards, and modern animated websites.
            </p>
          </div>

          {/* Interactive Folder for Client Reviews */}
          <div className="flex justify-center items-center pt-[350px] pb-[350px] h-[1200px]">
            <Folder
              color="#FFC107"
              size={1}
              className="mt-10"
              items={[
                  {
                    name: "Daniel Carter",
                    role: "Founder, NovaLabs AI",
                    text: "Ashwin's mastery of GSAP animations and Next.js is unparalleled. He transformed our complex landing page into a fluid, Awwwards-level interactive experience that loads instantly. Outstanding craftsmanship.",
                    initial: "D",
                    color: "from-blue-600 to-indigo-600"
                  },
                  {
                    name: "Sophia Reynolds",
                    role: "CEO, Visionary Studio",
                    text: "Exceptional visual design coupled with high-performance React code. The attention to detail in the micro-interactions, smooth scrolling, and custom page transitions completely redefined our digital brand.",
                    initial: "S",
                    color: "from-cyan-500 to-blue-600"
                  },
                  {
                    name: "Marcus Lee",
                    role: "Product Lead, HyperScale",
                    text: "We hired Ashwin to architect our advanced SaaS dashboard. He delivered a pixel-perfect, highly responsive interface with clean code, secure authentication, and seamless real-time AI dashboards.",
                    initial: "M",
                    color: "from-blue-500 to-teal-500"
                  },
                  {
                    name: "Emily Watson",
                    role: "Founder, PixelForge",
                    text: "The motion design and parallax scroll effects created by Ashwin are breathtaking. He has a rare ability to bridge the gap between creative visual artistry and fast, production-ready frontend code.",
                    initial: "E",
                    color: "from-indigo-500 to-purple-600"
                  },
                  {
                    name: "Ryan Mitchell",
                    role: "CTO, QuantumByte",
                    text: "Working with Ashwin was an absolute pleasure. His deep expertise in Tailwind CSS, GSAP, and full-stack performance optimization helped us achieve a perfect 100 PageSpeed score for our platform.",
                    initial: "R",
                    color: "from-cyan-600 to-indigo-500"
                  },
                  {
                    name: "Olivia Brown",
                    role: "Creative Director, ElevateX",
                    text: "Ashwin is a true creative technologist. He engineered an incredibly engaging AI computer vision dashboard for our team that surpassed all our UX and engineering requirements. Highly recommended.",
                    initial: "O",
                    color: "from-indigo-600 to-blue-500"
                  }
                ].map((client, index) => (
                  <div 
                    key={index} 
                    className="w-full h-full bg-[#0a0b0d]/70 backdrop-blur-xl hover:bg-[#0a0b0d] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500 p-8 flex flex-col justify-between gap-6 cursor-pointer"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Rating 5-stars with soft cyan neon glow */}
                      <div className="flex gap-1 text-cyan-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4.5 h-4.5 fill-current drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      <p className="text-neutral-300 font-light text-xs sm:text-sm leading-relaxed italic">
                        “{client.text}”
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-2">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${client.color} flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]`}>
                        {client.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-white">{client.name}</span>
                        <span className="text-[10px] font-mono text-neutral-500 tracking-wider mt-0.5">{client.role}</span>
                      </div>
                    </div>
                  </div>
                ))
              }
            />
          </div>

          {/* Animated Statistics Section - Edge to Edge Horizontal Line */}
          <div 
            className="scroll-reveal border-t border-neutral-900 pt-20 mt-12 relative z-10"
            style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
          >
            <div className="flex flex-row items-start justify-between gap-12 overflow-x-auto hide-scrollbar px-6 sm:px-12 md:px-24">
              {[
                { value: "120+", label: "PROJECTS COMPLETED", desc: "Modern web & creative solutions" },
                { value: "40+", label: "GLOBAL CLIENTS", desc: "Trusted by startups worldwide" },
                { value: "99%", label: "CLIENT SATISFACTION", desc: "Delivering quality & performance" },
                { value: "4+", label: "HACKATHONS WON", desc: "National-level innovation challenges" },
                { value: "15+", label: "AWARDS WON", desc: "National & international recognitions" },
                { value: "24/7", label: "SUPPORT AVAILABLE", desc: "Fast response & maintenance support" },
                { value: "2+", label: "YEARS LEARNING", desc: "UI/UX, frontend & animations" }
              ].map((stat, idx) => (
                <CountUpStat 
                  key={idx} 
                  valueStr={stat.value} 
                  label={stat.label} 
                  desc={stat.desc} 
                />
              ))}
            </div>
          </div>

          {/* 3D WebGL Creative Showcase Carousel — True Full-Bleed */}
          <div className="border-t border-neutral-950 pt-28 mt-12 w-full flex flex-col gap-10 relative z-10">
            <div className="scroll-reveal flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">06 / CREATIVE SHOWCASE</span>
                <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight leading-tight">3D WebGL Showcase</h2>
              </div>
              <p className="text-neutral-400 font-light text-xs sm:text-sm max-w-md leading-relaxed">
                Drag horizontally or scroll to rotate this high-performance WebGL cylindrical gallery. Engineered with OGL shaders for real-time wave deformations.
              </p>
            </div>

            {/* True 100vw full-bleed — breaks out of every parent container */}
            <div
              className="scroll-reveal h-[560px] overflow-hidden bg-neutral-950 relative"
              style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)'
              }}
            >
              <CircularGallery 
                items={galleryItems}
                bend={3} 
                textColor="#22d3ee" 
                borderRadius={0.05} 
                font="bold 28px JetBrains Mono, monospace" 
                scrollSpeed={2.5}
              />
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
      <ContactForm />


      {/* 8. FOOTER */}
      <PremiumFooter />
    </div>
  );
}
