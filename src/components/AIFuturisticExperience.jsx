import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Activity, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    id: 1,
    role: "Project Lead AI Engineer",
    company: "ICONIC HUB",
    period: "2026 — PRESENT",
    location: "Coimbatore, India • Remote",
    specialization: "AI Automation • EduAI Systems • Intelligent Interfaces",
    impact: [
      "Led development of AI-powered smart learning systems",
      "Built intelligent workflow automation modules",
      "Managed frontend and backend architecture",
      "Designed scalable AI-integrated platforms"
    ],
    metrics: [
      { label: "AI Features", value: "15+" },
      { label: "Intelligent Modules", value: "5+" },
      { label: "System Performance", value: "98%" }
    ],
    color: "blue"
  },
  {
    id: 2,
    role: "AI Full Stack Developer",
    company: "Emedlogix Inc.",
    period: "2025",
    location: "Remote",
    specialization: "AI Applications • Full Stack Systems • Scalable Architectures",
    impact: [
      "Developed AI-powered web applications",
      "Engineered intelligent analytics dashboards",
      "Built responsive frontend systems",
      "Enhanced platform scalability and automation"
    ],
    metrics: [
      { label: "Systems Built", value: "10+" },
      { label: "Features Integrated", value: "40+" },
      { label: "Client Satisfaction", value: "95%" }
    ],
    color: "violet"
  },
  {
    id: 3,
    role: "Digital Marketing Specialist",
    company: "SKILLMAVEN",
    period: "2025",
    location: "Remote",
    specialization: "Digital Strategy • SEO • Brand Growth",
    impact: [
      "Managed digital marketing campaigns and audience engagement",
      "Developed SEO strategies to improve online visibility",
      "Created social media branding and content marketing systems",
      "Analyzed campaign performance using modern analytics tools"
    ],
    metrics: [
      { label: "Marketing Campaigns", value: "20+" },
      { label: "SEO Strategies", value: "10+" },
      { label: "Engagement Rate", value: "92%" }
    ],
    color: "violet"
  },
  {
    id: 4,
    role: "Web Development Engineer",
    company: "CODEALPHA",
    period: "2024",
    location: "Remote",
    specialization: "Frontend Development • Modern Web Systems",
    impact: [
      "Developed responsive modern websites using React, HTML, CSS, and JavaScript",
      "Built reusable UI component systems with scalable architecture",
      "Designed interactive frontend experiences with smooth animations",
      "Optimized performance and responsive layouts across devices"
    ],
    metrics: [
      { label: "Web Projects", value: "10+" },
      { label: "UI Components", value: "5+" },
      { label: "Performance Score", value: "95%" }
    ],
    color: "blue"
  }
];

const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power2.out'
    });
  };

  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col lg:flex-row w-full items-center justify-between gap-8 lg:gap-16 relative z-10 exp-row group ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      
      {/* Date & Company (Side Info) */}
      <div className={`w-full lg:w-5/12 flex flex-col ${isEven ? 'lg:text-right lg:items-end' : 'lg:text-left lg:items-start'} justify-center hidden lg:flex opacity-0 exp-side`}>
        <span className="text-xs font-mono font-bold tracking-widest text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full mb-3 border border-blue-500/20">{exp.period}</span>
        <h3 className="text-2xl font-bold text-black">{exp.company}</h3>
        <p className="text-sm font-medium text-neutral-500 mt-2">{exp.location}</p>
      </div>

      {/* Center Neural Node */}
      <div className="absolute left-4 lg:left-1/2 top-8 lg:top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-neutral-200 z-20 flex items-center justify-center shadow-lg group-hover:border-blue-400 group-hover:scale-110 transition-all duration-500 exp-node">
        <div className={`absolute inset-0 bg-${exp.color}-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className={`w-3 h-3 bg-${exp.color}-500 rounded-full animate-pulse`} />
      </div>

      {/* Main Glass Card */}
      <div className={`w-[85%] ml-[15%] lg:ml-0 lg:w-5/12 perspective-1000 opacity-0 exp-card ${isEven ? 'origin-left' : 'origin-right'}`}>
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="flex flex-col lg:hidden mb-4 pl-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-blue-500 mb-1">{exp.period}</span>
          <h3 className="text-xl font-bold text-black">{exp.company}</h3>
        </div>

        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-white/70 backdrop-blur-2xl border border-white/60 p-8 rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] group-hover:border-blue-200/50 transition-all duration-500 overflow-hidden"
        >
          {/* Ambient Glow Inside Card */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6">
            
            {/* Header */}
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-black leading-tight">{exp.role}</h4>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mt-2">{exp.specialization}</p>
            </div>

            {/* Impact List */}
            <div className="flex flex-col gap-3">
              {exp.impact.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-light text-neutral-600 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-neutral-100">
              {exp.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className={`text-xl font-bold text-${exp.color}-600`}>{metric.value}</span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold leading-tight">{metric.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

const AIFuturisticExperience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rows = containerRef.current.querySelectorAll('.exp-row');
    const centralLine = containerRef.current.querySelector('.neural-line-fill');

    // Initial setup
    gsap.set(centralLine, { height: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1 // Link line growth to scroll
      }
    });

    tl.to(centralLine, {
      height: "100%",
      ease: "none"
    });

    // Reveal animations for cards
    rows.forEach((row, i) => {
      const card = row.querySelector('.exp-card');
      const side = row.querySelector('.exp-side');
      const node = row.querySelector('.exp-node');

      gsap.set([card, side], { y: 50, opacity: 0 });
      gsap.set(node, { scale: 0, opacity: 0 });

      ScrollTrigger.create({
        trigger: row,
        start: "top 80%",
        animation: gsap.timeline()
          .to(node, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" })
          .to([card, side], { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.3")
      });
    });

  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-10">
      
      {/* Central Neural Line (Background) */}
      <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-100 -translate-x-1/2 rounded-full overflow-hidden">
        <div className="neural-line-fill w-full bg-gradient-to-b from-blue-500 via-violet-500 to-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
      </div>

      {/* Floating Ambient Particles */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500 rounded-full blur-[2px] animate-pulse" />
      <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-violet-500 rounded-full blur-[2px] animate-pulse" />

      <div className="flex flex-col gap-12 lg:gap-32 relative z-10">
        {experienceData.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
      
    </div>
  );
};

export default AIFuturisticExperience;
