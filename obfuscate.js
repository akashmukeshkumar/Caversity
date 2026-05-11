const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const CleanCSS = require('clean-css');
const HTMLMinifier = require('html-minifier').minify;

// 1. JS Folders
const jsFolders = [
    path.join(__dirname, 'js'),
    path.join(__dirname, 'subjects/caf8_audit/js')
];

// 2. CSS Folders
const cssFolders = [
    path.join(__dirname, 'css'),
    path.join(__dirname, 'subjects/caf8_audit/css')
];

// 3. HTML Folders (Root aur subjects folders)
const htmlFolders = [
    __dirname,
    path.join(__dirname, 'subjects/caf8_audit')
];

// JS OBFUSCATION
jsFolders.forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            if (file.endsWith('.js')) {
                const filePath = path.join(dir, file);
                const code = fs.readFileSync(filePath, 'utf8');
                
                const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    compact: true,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 0.7,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0.4,
                    disableConsoleOutput: true,
                    identifierNamesGenerator: 'hexadecimal',
                    stringArray: true,
                    stringArrayEncoding: ['base64'],
                    splitStrings: true,
                }).getObfuscatedCode();
                
                fs.writeFileSync(filePath, obfuscatedCode);
                console.log(`🔒 JS Obfuscated: ${file}`);
            }
        });
    }
});

// CSS MINIFICATION
cssFolders.forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            if (file.endsWith('.css')) {
                const filePath = path.join(dir, file);
                const code = fs.readFileSync(filePath, 'utf8');
                const minifiedCss = new CleanCSS({}).minify(code).styles;
                fs.writeFileSync(filePath, minifiedCss);
                console.log(`🎨 CSS Minified: ${file}`);
            }
        });
    }
});

// HTML MINIFICATION
htmlFolders.forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            if (file.endsWith('.html')) {
                const filePath = path.join(dir, file);
                const code = fs.readFileSync(filePath, 'utf8');
                const minifiedHtml = HTMLMinifier(code, { collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true });
                fs.writeFileSync(filePath, minifiedHtml);
                console.log(`📄 HTML Minified: ${file}`);
            }
        });
    }
});