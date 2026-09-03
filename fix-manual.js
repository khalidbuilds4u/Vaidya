const fs = require('fs');

const files = [
  'src/app/[locale]/(patient)/conditions/[slug]/page.tsx',
  'src/app/[locale]/(patient)/treatments/[slug]/page.tsx',
  'src/app/[locale]/(patient)/specialties/[slug]/page.tsx',
  'src/app/[locale]/(patient)/search/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace getTranslation(d, 'qualifications', locale) || d.qualifications || undefined
  // with getTranslation(d, 'qualifications', locale) || undefined
  content = content.replace(/qualifications:\s*getTranslation\(d,\s*'qualifications',\s*locale\)\s*\|\|\s*d\.qualifications\s*\|\|\s*undefined/g, "qualifications: getTranslation(d, 'qualifications', locale) || undefined");
  
  // Replace biography: getTranslation(d, 'biography', locale) || d.biography || undefined
  // with biography: getStrictTranslation(d, 'biography', locale) || undefined
  content = content.replace(/biography:\s*getTranslation\(d,\s*'biography',\s*locale\)\s*\|\|\s*d\.biography\s*\|\|\s*undefined/g, "biography: getStrictTranslation(d, 'biography', locale) || undefined");
  
  // For search/page.tsx which uses doctor instead of d in mapping?
  // Let's check search/page.tsx
  content = content.replace(/qualifications=\{doctor\.qualifications \|\| undefined\}/g, "qualifications={getTranslation(doctor, 'qualifications', locale) || undefined}");
  content = content.replace(/biography=\{getTranslation\(doctor,\s*'biography',\s*locale\)\s*\|\|\s*doctor\.biography\s*\|\|\s*undefined\}/g, "biography={getStrictTranslation(doctor, 'biography', locale) || undefined}");

  fs.writeFileSync(file, content);
}
