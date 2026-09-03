const fs = require('fs');

const file = 'src/app/[locale]/(patient)/search/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add getStrictTranslation to imports if needed
if (content.includes('getTranslation') && !content.includes('getStrictTranslation')) {
  content = content.replace(/import {([^}]*)getTranslation([^}]*)} from '@\/lib\/utils';/, "import { $1getTranslation, getStrictTranslation$2 } from '@/lib/utils';");
}

content = content.replace(
/doctors = rawDoctors.map\(d => \(\{[\s\S]*?\}\)\);/m,
`doctors = rawDoctors.map(d => ({
      slug: d.slug,
      name: getTranslation(d, 'name', locale) || d.name,
      specialty: getTranslation(d.specialty, 'name', locale) || d.specialty.name,
      qualifications: getTranslation(d, 'qualifications', locale) || undefined,
      experience: d.experienceYears ? \`\${d.experienceYears}+ Years\` : '',
      hospital: getTranslation(d.hospital, 'name', locale) || d.hospital.name,
      city: d.city ? (getTranslation(d.city, 'name', locale) || d.city.name) : (getTranslation(d.hospital.city, 'name', locale) || d.hospital.city.name),
      image: d.imageUrl || '',
      biography: getStrictTranslation(d, 'biography', locale) || undefined
    }));`
);

fs.writeFileSync(file, content);
