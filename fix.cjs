const fs = require('fs');
let code = fs.readFileSync('src/components/ContactForm.jsx', 'utf8');

// 1. Container width & gaps
code = code.replace(
  'className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start"',
  'className="max-w-[90rem] mx-auto px-6 sm:px-12 md:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start"'
);

// 2. Col spans
code = code.replace('className="lg:col-span-5 flex flex-col gap-12"', 'className="lg:col-span-4 flex flex-col gap-12"');
code = code.replace('className="lg:col-span-7 w-full relative"', 'className="lg:col-span-8 w-full relative"');

// 3. Form inner padding
code = code.replace(
  'className="relative w-full bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"',
  'className="relative w-full bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"'
);

// 4. Form elements text sizes and paddings
code = code.replaceAll('text-[10px] uppercase', 'text-xs uppercase');
code = code.replaceAll('rounded-xl px-5 py-4 text-white text-sm', 'rounded-2xl px-6 py-5 text-white text-base');
code = code.replace('rows="5"', 'rows="6"');

// 5. Button size
code = code.replace(
  'className="relative w-full md:w-auto px-10 py-5 bg-gradient-to-r',
  'className="relative w-full md:w-auto px-14 py-6 bg-gradient-to-r'
);
code = code.replace('text-xs uppercase drop-shadow-md', 'text-sm uppercase drop-shadow-md');
code = code.replace('w-4 h-4 text-white group-hover:translate-x-1', 'w-5 h-5 text-white group-hover:translate-x-1');

fs.writeFileSync('src/components/ContactForm.jsx', code);
console.log("Done");
