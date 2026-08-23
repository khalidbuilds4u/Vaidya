const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updatePassword() {
  const adminEmail = "admin@vaidya.com";
  // Enter your NEW password below between the quotes:
  const newPassword = "MyNewSecurePassword2026!";

  console.log(`\n⏳ Updating password for ${adminEmail}...`);

  try {
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!user) {
      console.log('❌ Admin user not found in the database!');
      process.exit(1);
    }

    // Hash the new password securely
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the database
    await prisma.user.update({
      where: { email: adminEmail },
      data: { hashedPassword }
    });

    console.log(`✅ Success! The admin password has been updated in the live database.`);
    console.log(`You can now log in to the production site with your new password.\n`);
  } catch (error) {
    console.error('❌ Error updating password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword();
