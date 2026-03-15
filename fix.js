const fs = require('fs');
const path = require('path');
const srcDir = 'c:/Users/Asus/Documents/llama/namami-gaiya/frontend/src';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        if (fs.statSync(file).isDirectory()) results = results.concat(walkDir(file));
        else if (file.endsWith('.jsx') || file.endsWith('.js')) results.push(file);
    });
    return results;
}

let changedFiles = 0;
const badStr = "${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`}";
const goodStr = "${import.meta.env.VITE_API_URL || 'http://localhost:5000'}";

walkDir(srcDir).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(badStr)) {
        content = content.split(badStr).join(goodStr);
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log('Fixed', file);
    }
});
console.log('Total fixed:', changedFiles);
