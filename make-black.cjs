const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Update the PillNav colors
code = code.replace('baseColor="#e5e5e5"', 'baseColor="#000000"');
code = code.replace('pillColor="#000000"', 'pillColor="#ffffff"');
code = code.replace('hoveredPillTextColor="#ffffff"', 'hoveredPillTextColor="#000000"');
code = code.replace('pillTextColor="#555555"', 'pillTextColor="#a3a3a3"');

// 2. Update the About Me White Card
code = code.replace(
  'className="lg:col-span-5 flex flex-col gap-6 bg-white border border-neutral-100 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)]"',
  'className="lg:col-span-5 flex flex-col gap-6 bg-black border border-neutral-800 p-8 rounded-3xl shadow-none hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-shadow duration-500 cursor-default group"'
);

// Inner boxes in the card
code = code.replace(
  '<div className="border border-neutral-50 p-4 rounded-2xl bg-neutral-50/30">',
  '<div className="border border-neutral-800 p-4 rounded-2xl bg-neutral-900/50 group-hover:border-neutral-700 transition-colors">'
);
code = code.replace(
  '<div className="border border-neutral-50 p-4 rounded-2xl bg-neutral-50/30">',
  '<div className="border border-neutral-800 p-4 rounded-2xl bg-neutral-900/50 group-hover:border-neutral-700 transition-colors">'
);

// Text colors in the card
// "5+" and "40+"
code = code.replace('<span className="block text-2xl font-semibold text-black">5+</span>', '<span className="block text-2xl font-semibold text-white">5+</span>');
code = code.replace('<span className="block text-2xl font-semibold text-black">40+</span>', '<span className="block text-2xl font-semibold text-white">40+</span>');

// "Core Focus" and "Location"
code = code.replace('<span className="text-xs font-semibold text-black">AI Orchestration & Advanced UI/UX</span>', '<span className="text-xs font-semibold text-white">AI Orchestration & Advanced UI/UX</span>');
code = code.replace('<span className="text-xs font-semibold text-black">India / Worldwide Remote</span>', '<span className="text-xs font-semibold text-white">India / Worldwide Remote</span>');

// Resume button
code = code.replace(
  '<button className="bg-black hover:bg-neutral-800 text-white text-[10px] tracking-wider uppercase py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center w-full mt-2">',
  '<button className="bg-white hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] text-black text-[10px] tracking-wider uppercase py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center w-full mt-2">'
);

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx updated!');
