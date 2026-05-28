import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CountUpStat({ valueStr, label, desc, delay = 0 }) {
  const numMatch = valueStr.match(/(\d+)/);
  const targetNum = numMatch ? parseInt(numMatch[1], 10) : 0;
  const prefix = numMatch ? valueStr.substring(0, numMatch.index) : '';
  const suffix = numMatch ? valueStr.substring(numMatch.index + numMatch[1].length) : valueStr;

  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const triggerRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    if (!triggerRef.current) return;
    
    let obj = { val: 0 };
    
    const tween = gsap.to(obj, {
      val: targetNum,
      duration: 2.2,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        setCount(Math.floor(obj.val));
      },
      onComplete: () => {
        setIsCompleted(true);
        // Play an ultra-premium scale-pop & neon-glow pulse animation on completion
        gsap.timeline()
          .to(numRef.current, { scale: 1.15, duration: 0.15, ease: 'power2.out' })
          .to(numRef.current, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.3)' });
      }
    });

    return () => {
      tween.kill();
    };
  }, [targetNum, delay]);

  const displayValue = numMatch ? `${prefix}${count}${suffix}` : valueStr;

  return (
    <div 
      ref={triggerRef} 
      className="flex flex-col gap-2.5 text-left group cursor-default w-full transition-all duration-300"
    >
      <span 
        ref={numRef}
        className={`text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-blue-500 group-hover:to-cyan-400 transition-all duration-500 select-none inline-block ${
          isCompleted ? 'drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]' : ''
        }`}
      >
        {displayValue}
      </span>
      <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.08em] text-blue-500 group-hover:text-cyan-400 transition-colors duration-300 uppercase mt-0.5 leading-normal">
        {label}
      </span>
      <span className="text-[10.5px] sm:text-[11px] text-neutral-400 font-light leading-relaxed mt-0.5 group-hover:text-neutral-300 transition-colors duration-300">
        {desc}
      </span>
    </div>
  );
}
