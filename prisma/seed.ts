import { PrismaClient } from "@prisma/client";
import { assertSafeToSeed } from "./seed-guard";

const prisma = new PrismaClient();

async function main() {
    // Never wipe a non-local database.
    assertSafeToSeed();

    const cohort = await prisma.cohort.create({
        data: {
            name: "Class #13",
            description: "Elite cohort for advanced veterans transitioning to tech careers",
            startDate: new Date("2025-01-15"),
            endDate: new Date("2025-07-15"),
            isElite: true,
        },
    });

    await prisma.user.upsert({
        where: { email: "admin@vetswhocode.io" },
        update: {
            role: "ADMIN",
            cohortId: cohort.id,
        },
        create: {
            email: "admin@vetswhocode.io",
            name: "Admin User",
            role: "ADMIN",
            cohortId: cohort.id,
            bio: "VetsWhoCode platform administrator",
        },
    });

    await prisma.user.upsert({
        where: { email: "instructor@vetswhocode.io" },
        update: {
            role: "INSTRUCTOR",
            cohortId: cohort.id,
        },
        create: {
            email: "instructor@vetswhocode.io",
            name: "Instructor User",
            role: "INSTRUCTOR",
            cohortId: cohort.id,
            bio: "Senior instructor teaching web development",
        },
    });

    await prisma.user.upsert({
        where: { email: "student@vetswhocode.io" },
        update: {
            role: "STUDENT",
            cohortId: cohort.id,
        },
        create: {
            email: "student@vetswhocode.io",
            name: "Student User",
            role: "STUDENT",
            cohortId: cohort.id,
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
