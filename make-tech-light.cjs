const fs = require('fs');

function replaceInFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [find, replace] of replacements) {
    content = content.replace(find, replace);
  }
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}

replaceInFile('src/components/TechStack.jsx', [
  ['<section className="relative py-32 bg-black overflow-hidden z-10">', '<section className="relative py-32 bg-[#fafafa] overflow-hidden z-10">'],
  
  // Background blends
  ['mix-blend-screen', 'mix-blend-multiply'],
  ['mix-blend-screen', 'mix-blend-multiply'],
  
  // Card base styles
  ['bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_16px_64px_rgba(0,0,0,0.5)]', 'bg-white border border-neutral-200 shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]'],
  
  // Icon block
  ['p-3 rounded-2xl bg-white/5 border border-white/10', 'p-3 rounded-2xl bg-neutral-50 border border-neutral-200'],
  ['<Icon className="w-6 h-6 text-white" />', '<Icon className="w-6 h-6 text-black" />'],
  
  // Text colors
  ['<h3 className="text-white font-bold', '<h3 className="text-black font-bold'],
  ['<span className="text-white/90">', '<span className="text-neutral-800">'],
  ['<span className="text-white/50">', '<span className="text-neutral-500">'],
  
  // Progress bars
  ['bg-black/40 rounded-full overflow-hidden border border-white/5', 'bg-neutral-100 rounded-full overflow-hidden border border-neutral-200/50'],
  ['bg-gradient-to-r from-white/40 to-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]', 'bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]'],
  
  // Headers in the file further down
  ['text-white text-3xl', 'text-black text-3xl'],
  ['text-white/70', 'text-neutral-500']
]);
