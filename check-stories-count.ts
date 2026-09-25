import 'dotenv/config';
import { prisma } from './src/lib/prisma';
async function main() {
  const count = await prisma.patientStory.count();
  console.log('Total Patient Stories:', count);
}
main();
