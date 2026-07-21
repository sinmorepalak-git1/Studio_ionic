const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\sinmo\\.gemini\\antigravity-ide\\brain\\1666c812-fbbe-4baa-8b6d-1d3ba92aa7a3';
const destDir = 'c:\\Projects\\Studio_iconic\\src\\assets';

const files = [
    { src: 'media__1784655551327.png', dest: 'new_proj_1.png' },
    { src: 'media__1784655559667.png', dest: 'new_proj_2.png' },
    { src: 'media__1784655575753.png', dest: 'new_proj_3.png' },
    { src: 'media__1784655581624.jpg', dest: 'new_proj_4.jpg' },
    { src: 'media__1784655588378.png', dest: 'new_proj_5.png' }
];

files.forEach(f => {
    try {
        const data = fs.readFileSync(path.join(srcDir, f.src));
        fs.writeFileSync(path.join(destDir, f.dest), data);
        console.log(`Copied ${f.src}`);
    } catch(e) {
        console.error(`Failed to copy ${f.src}: ${e.message}`);
    }
});
