const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\sinmo\\.gemini\\antigravity-ide\\brain\\1666c812-fbbe-4baa-8b6d-1d3ba92aa7a3';
const destDir = 'c:\\Projects\\Studio_iconic\\src\\assets';

const files = [
    { src: 'media__1784653907813.png', dest: 'new_portfolio_1.png' },
    { src: 'media__1784653914396.png', dest: 'new_portfolio_2.png' },
    { src: 'media__1784653920827.png', dest: 'new_portfolio_3.png' },
    { src: 'media__1784653941666.jpg', dest: 'new_portfolio_4.jpg' }
];

files.forEach(f => {
    try {
        fs.copyFileSync(path.join(srcDir, f.src), path.join(destDir, f.dest));
        console.log(`Copied ${f.src}`);
    } catch(e) {
        console.error(`Failed to copy ${f.src}: ${e.message}`);
    }
});
