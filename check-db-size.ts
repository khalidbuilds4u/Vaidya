import 'dotenv/config';
import { prisma } from './src/lib/prisma';

async function main() {
  try {
    const result: any = await prisma.$queryRaw`
      SELECT pg_size_pretty(pg_database_size(current_database())) as size;
    `;
    console.log('Database Size:', result[0]?.size);
  } catch (e: any) {
    console.error('Error:', e.message);
  }
}
main();
