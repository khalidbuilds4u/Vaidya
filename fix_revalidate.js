const fs = require('fs');

const files = [
  'src/app/(patient)/treatments/page.tsx',
  'src/app/(patient)/hospitals/page.tsx',
  'src/app/(patient)/cities/page.tsx',
  'src/app/(patient)/doctors/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/export const revalidate = 60;\n/g, '');
  fs.writeFileSync(file, content, 'utf8');
});

console.log("Fixed multiple revalidate exports.");
