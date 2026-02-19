/**
 * Script to make a user an admin
 * Run with: npx tsx src/scripts/make-admin.ts <email>
 * Example: npx tsx src/scripts/make-admin.ts jeromehardaway@users.noreply.github.com
 */

import prisma from "../lib/prisma";

async function makeAdmin(email: string) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: "ADMIN" },
        });

        console.log(`✅ Successfully updated user to ADMIN:`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
    } catch (error) {
        console.error("❌ Error updating user:", error);
        console.log("\nMake sure the user exists. You can check with:");
        console.log("npx prisma studio");
    } finally {
        await prisma.$disconnect();
    }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
    console.log("Usage: npx tsx src/scripts/make-admin.ts <email>");
    console.log("Example: npx tsx src/scripts/make-admin.ts jeromehardaway@users.noreply.github.com");
    process.exit(1);
}

makeAdmin(email);