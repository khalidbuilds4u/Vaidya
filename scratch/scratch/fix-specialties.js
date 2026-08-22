"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/lib/prisma");
const MAIN_SPECIALTIES = [
    "Cardiology",
    "Oncology",
    "Orthopedics",
    "Neurology",
    "Gastroenterology",
    "Organ Transplant",
    "Cosmetic Surgery",
    "Dental"
];
function mapToMainSpecialty(oldName) {
    const lower = oldName.toLowerCase();
    if (lower.includes("cardio"))
        return "Cardiology";
    if (lower.includes("oncol"))
        return "Oncology";
    if (lower.includes("ortho") || lower.includes("bone"))
        return "Orthopedics";
    if (lower.includes("neuro") || lower.includes("brain"))
        return "Neurology";
    if (lower.includes("gastro") || lower.includes("stomach"))
        return "Gastroenterology";
    if (lower.includes("transplant") || lower.includes("liver") || lower.includes("kidney"))
        return "Organ Transplant";
    if (lower.includes("cosmetic") || lower.includes("plastic"))
        return "Cosmetic Surgery";
    if (lower.includes("dent") || lower.includes("teeth"))
        return "Dental";
    // Default to something, or let's say Cardiology
    return "Cardiology";
}
async function main() {
    console.log("Ensuring main specialties exist...");
    const specialtyMap = new Map();
    for (const name of MAIN_SPECIALTIES) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const spec = await prisma_1.prisma.specialty.upsert({
            where: { slug },
            update: {},
            create: { name, slug }
        });
        specialtyMap.set(name, spec.id);
    }
    console.log("Reassigning Doctors...");
    const doctors = await prisma_1.prisma.doctor.findMany({ include: { specialty: true } });
    for (const doc of doctors) {
        if (!doc.specialty)
            continue;
        const mappedName = mapToMainSpecialty(doc.specialty.name);
        const newId = specialtyMap.get(mappedName);
        if (doc.specialtyId !== newId) {
            await prisma_1.prisma.doctor.update({
                where: { id: doc.id },
                data: { specialtyId: newId }
            });
            console.log(`Moved Dr. ${doc.name} from ${doc.specialty.name} to ${mappedName}`);
        }
    }
    console.log("Reassigning Treatments...");
    const treatments = await prisma_1.prisma.treatment.findMany({ include: { specialty: true } });
    for (const t of treatments) {
        if (!t.specialty)
            continue;
        const mappedName = mapToMainSpecialty(t.specialty.name);
        const newId = specialtyMap.get(mappedName);
        if (t.specialtyId !== newId) {
            await prisma_1.prisma.treatment.update({
                where: { id: t.id },
                data: { specialtyId: newId }
            });
            console.log(`Moved Treatment ${t.name} from ${t.specialty.name} to ${mappedName}`);
        }
    }
    console.log("Reassigning Conditions...");
    const conditions = await prisma_1.prisma.condition.findMany({ include: { specialty: true } });
    for (const c of conditions) {
        if (!c.specialty)
            continue;
        const mappedName = mapToMainSpecialty(c.specialty.name);
        const newId = specialtyMap.get(mappedName);
        if (c.specialtyId !== newId) {
            await prisma_1.prisma.condition.update({
                where: { id: c.id },
                data: { specialtyId: newId }
            });
            console.log(`Moved Condition ${c.name} from ${c.specialty.name} to ${mappedName}`);
        }
    }
    console.log("Deleting old specialties...");
    const mainIds = Array.from(specialtyMap.values());
    const deleted = await prisma_1.prisma.specialty.deleteMany({
        where: {
            id: { notIn: mainIds }
        }
    });
    console.log(`Deleted ${deleted.count} old specialties.`);
    console.log("Done!");
}
main().catch(console.error).finally(() => prisma_1.prisma.$disconnect());
