import 'dotenv/config';
import { prisma } from './src/lib/prisma';

async function main() {
  const models = [
    'doctor', 'hospital', 'treatment', 'medicalCondition', 'patientStory', 'blog', 'medicalProcedure'
  ];

  for (const modelName of models) {
    if (!prisma[modelName]) {
      console.log(`Model ${modelName} not found.`);
      continue;
    }
    const items = await prisma[modelName].findMany({ take: 20 });
    let totalChars = 0;
    
    for (const item of items) {
      // Stringify the translatable fields to get an idea of length.
      // Usually, title, description, content, about, biography, etc. are translated.
      let chars = 0;
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === 'string' && key !== 'id' && key !== 'slug' && !key.endsWith('Id') && key !== 'imageUrl' && key !== 'createdAt' && key !== 'updatedAt') {
          // exclude URLs and dates usually, focus on translatable text
          if (!value.startsWith('http') && !value.startsWith('/images/')) {
            chars += value.length;
          }
        }
      }
      totalChars += chars;
    }
    
    const avgChars = items.length > 0 ? Math.round(totalChars / items.length) : 0;
    console.log(`${modelName}: Avg ${avgChars} chars per item (Sample size: ${items.length})`);
  }
}

main().catch(console.error);
