const fs = require('fs');

function replaceInFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [find, replace] of replacements) {
    content = content.replace(find, replace);
  }
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}

// 1. App.jsx
replaceInFile('src/App.jsx', [
  // Root wrapper
  ['<div className="relative w-full min-h-screen bg-black font-sans overflow-x-hidden">', '<div className="relative w-full min-h-screen bg-[#fafafa] font-sans overflow-x-hidden">'],
  
  // PillNav colors
  ['baseColor="#000000"', 'baseColor="#ffffff"'],
  ['pillColor="#ffffff"', 'pillColor="#111111"'],
  ['hoveredPillTextColor="#000000"', 'hoveredPillTextColor="#ffffff"'],
  ['pillTextColor="#a3a3a3"', 'pillTextColor="#555555"'],
  
  // About Me Section Text
  ['<span className="text-[10px] font-bold text-neutral-400 font-mono">', '<span className="text-[10px] font-bold text-neutral-500 font-mono">'],
  ['<span className="text-[10px] font-bold text-neutral-400 font-mono">', '<span className="text-[10px] font-bold text-neutral-500 font-mono">'],
  
  ['<h4 className="text-xs font-semibold text-white mt-0.5">Lead Creative Technologist', '<h4 className="text-xs font-semibold text-black mt-0.5">Lead Creative Technologist'],
  ['<h4 className="text-xs font-semibold text-white mt-0.5">Full Stack Engineer', '<h4 className="text-xs font-semibold text-black mt-0.5">Full Stack Engineer'],
  
  // About Me Card
  [
    'className="lg:col-span-5 flex flex-col gap-6 bg-black border border-neutral-800 p-8 rounded-3xl shadow-none hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-shadow duration-500 cursor-default group"',
    'className="lg:col-span-5 flex flex-col gap-6 bg-white border border-neutral-200 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500 cursor-default group"'
  ],
  [
    '<div className="border border-neutral-800 p-4 rounded-2xl bg-neutral-900/50 group-hover:border-neutral-700 transition-colors">',
    '<div className="border border-neutral-100 p-4 rounded-2xl bg-neutral-50/50 group-hover:border-neutral-200 transition-colors">'
  ],
  [
    '<div className="border border-neutral-800 p-4 rounded-2xl bg-neutral-900/50 group-hover:border-neutral-700 transition-colors">',
    '<div className="border border-neutral-100 p-4 rounded-2xl bg-neutral-50/50 group-hover:border-neutral-200 transition-colors">'
  ],
  
  ['text-white">5+</span>', 'text-black">5+</span>'],
  ['text-white">40+</span>', 'text-black">40+</span>'],
  ['text-white">AI Orchestration & Advanced UI/UX</span>', 'text-black">AI Orchestration & Advanced UI/UX</span>'],
  ['text-white">India / Worldwide Remote</span>', 'text-black">India / Worldwide Remote</span>'],
  
  [
    '<button className="bg-white hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] text-black text-[10px] tracking-wider uppercase py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center w-full mt-2">',
    '<button className="bg-black hover:bg-neutral-800 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] text-white text-[10px] tracking-wider uppercase py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center w-full mt-2">'
  ]
]);

