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
  ['className="relative min-h-screen w-full bg-[#fafafa] flex items-center justify-center overflow-hidden py-32 z-10"', 'className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden py-32 z-10"'],
  
  // Background blends
  ['mix-blend-multiply', 'mix-blend-screen'],
  ['mix-blend-multiply', 'mix-blend-screen'],
  
  // Text colors
  ['<h2 className="reveal-up text-black', '<h2 className="reveal-up text-white'],
  ['<span className="text-black">', '<span className="text-white/95">'],
  ['text-neutral-500 font-light', 'text-neutral-400 font-light'],
  ['text-blue-600 font-bold', 'text-blue-400 font-bold'],
  
  // Badge
  ['bg-white backdrop-blur-md border border-neutral-200 shadow-sm', 'bg-white/5 backdrop-blur-md border border-white/10'],
  
  // Magnetic Button
  ['bg-white backdrop-blur-xl border border-neutral-200 rounded-full flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 group-hover:border-blue-400/30 group-hover:bg-blue-50/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]', 'bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-full flex items-center justify-center gap-3 overflow-hidden transition-colors duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-950/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.25)]'],
  
  ['<span className="relative z-10 text-black', '<span className="relative z-10 text-white'],
  
  // Button glow
  ['bg-blue-400/20', 'bg-cyan-400/30'],
  ['mix-blend-multiply', 'mix-blend-screen']
]);

// ContactForm.jsx
replaceInFile('src/components/ContactForm.jsx', [
  ['className="relative w-full bg-[#fafafa] py-24 z-10 overflow-hidden"', 'className="relative w-full bg-black py-24 z-10 overflow-hidden"'],
  
  ['mix-blend-multiply', 'mix-blend-screen'],
  ['mix-blend-multiply', 'mix-blend-screen'],

  // Grid and Cards
  ['bg-white backdrop-blur-md border border-neutral-200 shadow-sm px-4 py-2 rounded-full w-fit', 'bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full w-fit'],
  
  ['<h3 className="text-black text-4xl md:text-5xl font-light tracking-tight mt-2">\\n              Let\\'s start a <br/>\\n              <span className="font-semibold text-blue-600">conversation.</span>\\n            </h3>', '<h3 className="text-white text-4xl md:text-5xl font-light tracking-tight mt-2">\\n              Let\\'s start a <br/>\\n              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">conversation.</span>\\n            </h3>'],

  ['bg-white backdrop-blur-xl border border-neutral-200 hover:border-blue-400/30 hover:bg-neutral-50 hover:shadow-md transition-all duration-300', 'bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-colors duration-300'],
  
  ['bg-neutral-50 flex items-center justify-center border border-neutral-200 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300', 'bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300'],
  
  ['text-neutral-500 group-hover:text-black', 'text-neutral-500 group-hover:text-white'],
  ['text-neutral-400 group-hover:text-blue-600', 'text-neutral-400 group-hover:text-cyan-400'],
  
  // Form container
  ['bg-white backdrop-blur-2xl border border-neutral-200 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden', 'bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden'],
  
  // Input fields
  ['<label className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1 group-focus-within:text-blue-600 transition-colors">Full Name</label>\\n                  <input \\n                    type="text" \\n                    required \\n                    placeholder="John Doe"\\n                    className="w-full bg-white border border-neutral-200 shadow-sm rounded-2xl px-6 py-5 text-white text-base placeholder-neutral-600 outline-none focus:border-cyan-400/50 focus:bg-neutral-100 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300"\\n                  />', '<label className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Full Name</label>\\n                  <input \\n                    type="text" \\n                    required \\n                    placeholder="John Doe"\\n                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base placeholder-neutral-500 outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300"\\n                  />'],
  
  ['<label className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1 group-focus-within:text-blue-600 transition-colors">Email Address</label>\\n                  <input \\n                    type="email" \\n                    required \\n                    placeholder="john@example.com"\\n                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-5 text-black text-base placeholder-neutral-400 outline-none focus:border-blue-400 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"\\n                  />', '<label className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Email Address</label>\\n                  <input \\n                    type="email" \\n                    required \\n                    placeholder="john@example.com"\\n                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base placeholder-neutral-500 outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300"\\n                  />'],
  
  ['<label className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1 group-focus-within:text-blue-600 transition-colors">Project Type</label>\\n                <select \\n                  required\\n                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-5 text-black text-base outline-none focus:border-blue-400 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 appearance-none cursor-pointer"\\n                >\\n                  <option value="" className="bg-white">Select type...</option>\\n                  <option value="Web Development" className="bg-white">Web Development</option>\\n                  <option value="AI Integration" className="bg-white">AI Integration / Dashboard</option>\\n                  <option value="UI/UX Design" className="bg-white">UI/UX Design</option>\\n                  <option value="Other" className="bg-white">Other</option>\\n                </select>', '<label className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Project Type</label>\\n                <select \\n                  required\\n                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 appearance-none cursor-pointer"\\n                >\\n                  <option value="" className="bg-neutral-900">Select type...</option>\\n                  <option value="Web Development" className="bg-neutral-900">Web Development</option>\\n                  <option value="AI Integration" className="bg-neutral-900">AI Integration / Dashboard</option>\\n                  <option value="UI/UX Design" className="bg-neutral-900">UI/UX Design</option>\\n                  <option value="Other" className="bg-neutral-900">Other</option>\\n                </select>'],
  
  ['<label className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1 group-focus-within:text-blue-600 transition-colors">Message</label>\\n                <textarea \\n                  rows="6"\\n                  required \\n                  placeholder="Tell me about your vision, timeline, and goals..."\\n                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-5 text-black text-base placeholder-neutral-400 outline-none focus:border-blue-400 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 resize-none"\\n                />', '<label className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Message</label>\\n                <textarea \\n                  rows="6"\\n                  required \\n                  placeholder="Tell me about your vision, timeline, and goals..."\\n                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base placeholder-neutral-500 outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 resize-none"\\n                />']
]);
