const fs = require('fs');

function replaceInFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [find, replace] of replacements) {
    content = content.replace(find, replace);
  }
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}

// ContactCTA.jsx
replaceInFile('src/components/ContactCTA.jsx', [
  ['className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden py-32 z-10"', 'className="relative min-h-screen w-full bg-[#fafafa] flex items-center justify-center overflow-hidden py-32 z-10"'],
  
  // Background blends
  ['mix-blend-screen', 'mix-blend-multiply'],
  ['mix-blend-screen', 'mix-blend-multiply'],
  
  // Text colors
  ['<h2 className="reveal-up text-white', '<h2 className="reveal-up text-black'],
  ['<span className="text-white/95">', '<span className="text-black">'],
  ['text-neutral-400 font-light', 'text-neutral-500 font-light'],
  ['text-blue-400 font-bold', 'text-blue-600 font-bold'],
  
  // Badge
  ['bg-white/5 backdrop-blur-md border border-white/10', 'bg-white backdrop-blur-md border border-neutral-200 shadow-sm'],
  
  // Magnetic Button
  ['bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-full flex items-center justify-center gap-3 overflow-hidden transition-colors duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-950/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.25)]', 'bg-white backdrop-blur-xl border border-neutral-200 rounded-full flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 group-hover:border-blue-400/30 group-hover:bg-blue-50/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]'],
  
  ['<span className="relative z-10 text-white', '<span className="relative z-10 text-black'],
  
  // Button glow
  ['bg-cyan-400/30', 'bg-blue-400/20'],
  ['mix-blend-screen', 'mix-blend-multiply']
]);

// ContactForm.jsx
replaceInFile('src/components/ContactForm.jsx', [
  ['className="relative w-full bg-black py-32 z-20"', 'className="relative w-full bg-[#fafafa] py-32 z-20"'],
  
  // Grid and Cards
  ['bg-white/5 border border-white/10', 'bg-white border border-neutral-200 shadow-sm'],
  ['group-hover:border-cyan-400/50 group-hover:bg-cyan-950/20', 'group-hover:border-blue-400/50 group-hover:bg-blue-50/50 group-hover:shadow-md'],
  ['group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]', ''],
  
  ['text-neutral-400 group-hover:text-white', 'text-neutral-500 group-hover:text-black'],
  ['bg-white/10', 'bg-neutral-100'],
  ['text-cyan-400', 'text-blue-600'],
  
  // Form container
  ['bg-white/5 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]', 'bg-white border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)]'],
  ['text-white text-3xl', 'text-black text-3xl'],
  ['text-neutral-400 font-light', 'text-neutral-500 font-light'],
  
  // Input fields
  ['bg-black/50 border-white/10 text-white placeholder-neutral-500 focus:border-cyan-400/50 focus:bg-white/5', 'bg-neutral-50 border-neutral-200 text-black placeholder-neutral-400 focus:border-blue-400 focus:bg-white'],
  
  // Submit Button
  ['bg-cyan-500 hover:bg-cyan-400 text-black', 'bg-black hover:bg-neutral-800 text-white'],
  ['shadow-[0_0_20px_rgba(34,211,238,0.3)]', 'shadow-[0_8px_20px_rgba(0,0,0,0.15)]'],
  ['group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]', 'group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)]']
]);
