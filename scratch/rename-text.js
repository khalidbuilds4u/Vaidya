const fs = require('fs');
const path = require('path');

function replaceWordsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Replace "Specialties" -> "Departments"
  content = content.replace(/Specialties/g, 'Departments');
  // Replace "SPECIALTIES" -> "DEPARTMENTS"
  content = content.replace(/SPECIALTIES/g, 'DEPARTMENTS');
  // Replace "Specialty" -> "Department"
  content = content.replace(/Specialty/g, 'Department');
  // Replace "specialties" -> "departments" only in en.json keys if they exist (but better keep keys as they are, let's only replace the values if they are exact).
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

// Let's only target the specific UI files to avoid breaking code logic (like prisma schemas).
const targetFiles = [
  'messages/en.json',
  'src/components/patient/home/HeroSearchBar.tsx',
  'src/components/patient/home/MobileSearch.tsx',
  'src/components/patient/home/PopularSpecialties.tsx',
  'src/components/patient/Header.tsx',
  'src/components/admin/AdminSidebar.tsx',
  'src/app/[locale]/(admin)/admin/departments/page.tsx',
  'src/app/[locale]/(patient)/departments/page.tsx'
];

for (const file of targetFiles) {
  const fullPath = path.join(__dirname, '../', file);
  if (fs.existsSync(fullPath)) {
    replaceWordsInFile(fullPath);
  }
}
