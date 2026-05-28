import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CountUpStat({ valueStr, label, desc }) {
  const numMatch = valueStr.match(/(\d+)/);
  const targetNum = numMatch ? parseInt(numMatch[1], 10) : 0;
  const prefix = numMatch ? valueStr.substring(0, numMatch.index) : '';
  const suffix = numMatch ? valueStr.substring(numMatch.index + numMatch[1].length) : valueStr;

  const [count, setCount] = useState(0);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!triggerRef.current) return;
    
    let obj = { val: 0 };
    
    const tween = gsap.to(obj, {
      val: targetNum,
      duration: 1.2, // Fast and smooth counting
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none' // Play once to prevent getting stuck due to parent reveal translation
      },
      onUpdate: () => {
        setCount(Math.floor(obj.val));
      }
    });

    return () => {
      tween.kill();
    };
  }, [targetNum]);

  const displayValue = numMatch ? `${prefix}${count}${suffix}` : valueStr;

  return (
    <div ref={triggerRef} className="flex flex-col gap-2 text-center md:text-left group cursor-default flex-shrink-0 min-w-[160px]">
      <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-blue-500/80 group-hover:to-cyan-400 transition-all duration-500">
        {displayValue}
      </span>
      <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-blue-500 uppercase mt-1">
        {label}
      </span>
      <span className="text-[11px] text-neutral-500 font-light leading-relaxed mt-0.5">
        {desc}
      </span>
    </div>
  );
}
