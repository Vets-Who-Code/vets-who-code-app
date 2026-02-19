/**
 * Clean up test users and prepare for fresh GitHub OAuth login
 * Run with: npx tsx src/scripts/clean-database.ts
 */

import prisma from "../lib/prisma";

async function cleanDatabase() {
    console.log("🧹 Cleaning up database for fresh start...\n");

    try {
        // Delete all test users (keeping forums intact)
        const deletedUsers = await prisma.user.deleteMany({});
        console.log(`✅ Deleted ${deletedUsers.count} users`);

        // The forums and their content should remain
        const forumCount = await prisma.forum.count();
        console.log(`📚 Forums intact: ${forumCount} forums`);

        console.log("\n✨ Database cleaned!");
        console.log("\n📝 Next steps:");
        console.log("1. Go to http://localhost:3000/login");
        console.log("2. Click 'Sign in with GitHub'");
        console.log("3. You'll be created as a fresh user");
        console.log("4. You'll automatically be admin (jeromehardaway)");

    } catch (error) {
        console.error("❌ Error cleaning database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Confirm before cleaning
console.log("⚠️  This will delete ALL users (but keep forums and other data)");
console.log("You'll need to login fresh with GitHub OAuth.\n");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Continue? (yes/no): ", (answer: string) => {
    readline.close();

    if (answer.toLowerCase() === 'yes') {
        cleanDatabase();
    } else {
        console.log("Cancelled.");
        process.exit(0);
    }
});