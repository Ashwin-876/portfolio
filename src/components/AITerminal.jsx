import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const AITerminal = () => {
  const [lines, setLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const terminalLines = [
    "> AI SYSTEMS ACTIVE",
    "> NEURAL ENGINE ONLINE",
    "> AUTOMATION PIPELINES READY"
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    
    const typeNextChar = () => {
      if (currentLine >= terminalLines.length) return;
      
      const text = terminalLines[currentLine];
      
      if (currentChar <= text.length) {
        setLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = text.slice(0, currentChar);
          return newLines;
        });
        currentChar++;
        setTimeout(typeNextChar, Math.random() * 50 + 20); // random typing speed
      } else {
        currentLine++;
        currentChar = 0;
        setTimeout(typeNextChar, 400); // pause between lines
      }
    };
    
    // Start typing after a short delay
    const startDelay = setTimeout(() => {
      typeNextChar();
    }, 1000);

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => {
      clearTimeout(startDelay);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-[0_10px_40px_rgba(0,0,0,0.2)] mt-8">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2 bg-neutral-950 border-b border-neutral-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto flex items-center gap-2 text-neutral-500 font-mono text-[10px]">
          <Terminal size={12} />
          <span>system_kernel.exe</span>
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-5 font-mono text-xs md:text-sm text-green-400 bg-neutral-900 h-[110px] relative">
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none"></div>
        <div className="flex flex-col gap-2">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span>{line}</span>
              {i === lines.length - 1 && (
                <span className={`inline-block w-2 h-4 bg-green-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              )}
            </div>
          ))}
          {/* Default cursor if no lines typed yet */}
          {lines.length === 0 && (
            <span className={`inline-block w-2 h-4 bg-green-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITerminal;
