const fs = require('fs');
let code = fs.readFileSync('src/components/PremiumFooter.jsx', 'utf8');

// 1. Overall padding
code = code.replace('pt-32 pb-12', 'pt-16 pb-8');
code = code.replace('mb-24', 'mb-12');
code = code.replace('mb-32', 'mb-16');
code = code.replace('min-h-[60vh]', 'min-h-[30vh]');

// 2. Text Sizes
code = code.replace('text-2xl md:text-4xl', 'text-xl md:text-2xl');
code = code.replace('mt-4', 'mt-2');
code = code.replace('gap-8 mb-24', 'gap-4 mb-12');

// 3. Icon Container Sizing
code = code.replace('w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28', 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16');

// 4. Icon SVG Sizing
code = code.replace('w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12', 'w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7');

// 5. Gap between icons
code = code.replace('gap-6 md:gap-10 lg:gap-14', 'gap-4 md:gap-6 lg:gap-8');

// 6. Padding inside link to keep magnetic hit area but not massive
code = code.replace("className=\"relative group p-4\"", "className=\"relative group p-2\"");

fs.writeFileSync('src/components/PremiumFooter.jsx', code);
console.log("Footer scaled down");
