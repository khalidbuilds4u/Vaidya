import { prisma } from './src/lib/prisma';

async function main() {
  const blogs = await prisma.blogPost.findMany({
    where: { published: true }
  });
  blogs.forEach(blog => {
    console.log(`Blog: ${blog.title}, Cover: ${blog.coverImage}`);
  });
}
main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
