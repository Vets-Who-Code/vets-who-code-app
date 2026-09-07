import { PrismaClient } from "@prisma/client";
import { assertSafeToSeed } from "./seed-guard";

const prisma = new PrismaClient();

async function main() {
    // Never wipe a non-local database.
    assertSafeToSeed();

    await prisma.user.upsert({
        where: { email: "admin@vetswhocode.io" },
        update: {
            role: "ADMIN",
        },
        create: {
            email: "admin@vetswhocode.io",
            name: "Admin User",
            role: "ADMIN",
            bio: "VetsWhoCode platform administrator",
        },
    });

    await prisma.user.upsert({
        where: { email: "instructor@vetswhocode.io" },
        update: {
            role: "INSTRUCTOR",
        },
        create: {
            email: "instructor@vetswhocode.io",
            name: "Instructor User",
            role: "INSTRUCTOR",
            bio: "Senior instructor teaching web development",
        },
    });

    await prisma.user.upsert({
        where: { email: "student@vetswhocode.io" },
        update: {
            role: "STUDENT",
        },
        create: {
            email: "student@vetswhocode.io",
            name: "Student User",
            role: "STUDENT",
            bio: "Army veteran learning full-stack web development",
            branch: "Army",
            rank: "Sergeant",
            yearsServed: 6,
            skillLevel: "BEGINNER",
        },
    });
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
