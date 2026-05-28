import React, { useEffect, useRef } from 'react';
import { Cpu, Network, MonitorPlay } from 'lucide-react';
import gsap from 'gsap';

const timelineData = [
  {
    id: 1,
    date: "2025 — PRESENT",
    title: "Lead AI Engineer — NeuralX Labs",
    desc: "Building AI-powered automation systems, immersive interfaces, and advanced computer vision applications using scalable cloud architectures.",
    icon: Network,
    color: "blue"
  },
  {
    id: 2,
    date: "2023 — 2025",
    title: "AI Full Stack Developer — FutureStack Systems",
    desc: "Developed intelligent analytics dashboards, AI workflow tools, and high-performance frontend experiences integrated with modern backend infrastructures.",
    icon: Cpu,
    color: "violet"
  },
  {
    id: 3,
    date: "2022 — 2023",
    title: "Frontend & AI Developer — VisionCraft Studio",
    desc: "Created cinematic UI systems, motion-driven interfaces, and AI-integrated web applications focused on modern digital experiences.",
    icon: MonitorPlay,
    color: "indigo"
  }
];

const AITimeline = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const lines = containerRef.current.querySelectorAll('.timeline-line-fill');
    const nodes = containerRef.current.querySelectorAll('.timeline-node');
    const contents = containerRef.current.querySelectorAll('.timeline-content');

    // Initial state
    gsap.set(lines, { height: 0 });
    gsap.set(nodes, { scale: 0, opacity: 0 });
    gsap.set(contents, { x: 20, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    timelineData.forEach((_, i) => {
      tl.to(nodes[i], {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, i * 0.4)
      .to(contents[i], {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.1");

      if (i < timelineData.length - 1) {
        tl.to(lines[i], {
          height: "100%",
          duration: 0.4,
          ease: "none"
        }, "<0.2");
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col mt-6 pl-2 relative">
      {timelineData.map((item, index) => {
        const Icon = item.icon;
        
        return (
          <div key={item.id} className="relative flex gap-8 pb-10 last:pb-0 group">
            
            {/* Timeline Line Container */}
            {index !== timelineData.length - 1 && (
              <div className="absolute left-[15px] top-[30px] bottom-0 w-[2px] bg-neutral-100 rounded-full overflow-hidden">
                <div className="timeline-line-fill w-full bg-gradient-to-b from-blue-500 to-violet-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
            )}
            
            {/* Glowing Node */}
            <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-sm group-hover:border-blue-300 transition-colors duration-300 timeline-node">
              <div className={`absolute inset-0 bg-${item.color}-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`w-2.5 h-2.5 rounded-full bg-${item.color}-500 animate-pulse`} />
              <div className="absolute -left-12 opacity-0 group-hover:opacity-20 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                <Icon size={48} className={`text-${item.color}-500`} />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col pt-1 timeline-content">
              <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase font-mono mb-1">{item.date}</span>
              <h4 className="text-sm font-semibold text-black group-hover:text-blue-600 transition-colors duration-300">{item.title}</h4>
              <p className="text-neutral-500 font-light text-sm mt-2 leading-relaxed max-w-md">{item.desc}</p>
            </div>
            
          </div>
        );
      })}
    </div>
  );
};

export default AITimeline;
