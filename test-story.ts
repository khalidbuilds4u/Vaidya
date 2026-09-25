import 'dotenv/config';
import { prisma } from './src/lib/prisma';
async function main() {
  const story = await prisma.patientStory.findFirst({
    where: { title: { contains: 'Knee Replacement' } }
  });
  console.log(JSON.stringify(story, null, 2));
}
main();
