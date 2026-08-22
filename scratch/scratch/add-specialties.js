"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/lib/prisma");
const NEW_SPECIALTIES = [
    "IVF & Fertility",
    "Bariatric Surgery",
    "Ophthalmology",
    "Urology"
];
async function main() {
    console.log("Adding new specialties...");
    for (const name of NEW_SPECIALTIES) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        await prisma_1.prisma.specialty.upsert({
            where: { slug },
            update: {},
            create: { name, slug }
        });
        console.log(`Added: ${name}`);
    }
    console.log("Done!");
}
main().catch(console.error).finally(() => prisma_1.prisma.$disconnect());
