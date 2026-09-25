const fs = require('fs');

const file = 'src/app/[locale]/(patient)/conditions/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace MOCK_CONDITIONS with db fetch
content = content.replace(
  /const MOCK_CONDITIONS = \[[\s\S]*?\];/,
  `import { prisma } from '@/lib/prisma';\nimport { getTranslation } from '@/lib/utils';\nimport { getTranslations } from 'next-intl/server';`
);

content = content.replace(
  /export default async function ConditionsDirectory\(\) \{/,
  `export default async function ConditionsDirectory({ params }: { params: Promise<{ locale: string }> }) {\n  const resolvedParams = await params;\n  const locale = resolvedParams.locale;\n  const dbConditions = await prisma.condition.findMany({ include: { specialty: true } });`
);

content = content.replace(
  /MOCK_CONDITIONS\.map\(\(condition\) => \(/,
  `dbConditions.map((condition) => (`
);

content = content.replace(
  /\{condition\.name\.toLowerCase\(\)\.replace\(\/ & \/g, '-'\)\.replace\(\/\\s\+\/g, '-'\)\}/g,
  `{condition.slug}`
);

content = content.replace(
  /\{condition\.specialty\}/,
  `{getTranslation(condition.specialty, 'name', locale) || condition.specialty.name}`
);

content = content.replace(
  /\{condition\.name\}/g,
  `{getTranslation(condition, 'name', locale) || condition.name}`
);

content = content.replace(
  /\{condition\.description\}/,
  `{getTranslation(condition, 'description', locale) || condition.description}`
);

// We need to fix the duplicate import for getTranslations if it was already imported, but let's just use AST or manual edits
