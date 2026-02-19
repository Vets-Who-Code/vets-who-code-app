/**
 * List all users in the database
 * Run with: npx tsx src/scripts/list-users.ts
 */

import prisma from "../lib/prisma";

async function listUsers() {
    try {
        const users = await prisma.user.findMany({
            include: {
                accounts: true
            }
        });

        console.log(`\n📊 Total users in database: ${users.length}\n`);

        if (users.length === 0) {
            console.log("No users found in the database.");
            console.log("\nYou should be able to login with GitHub now!");
            return;
        }

        users.forEach(user => {
            console.log(`👤 User: ${user.name || "No name"}`);
            console.log(`   ID: ${user.id}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Role: ${user.role}`);
            console.log(`   Accounts: ${user.accounts.length} linked`);

            if (user.accounts.length > 0) {
                user.accounts.forEach(account => {
                    console.log(`     - ${account.provider} (${account.providerAccountId})`);
                });
            }
            console.log("");
        });

        // Check for Jerome specifically
        const jeromeVariations = [
            "jeromehardaway@users.noreply.github.com",
            "jerome@vetswhocode.io",
            "jeromehardaway@gmail.com"
        ];

        console.log("🔍 Checking for Jerome's accounts:");
        for (const email of jeromeVariations) {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (user) {
                console.log(`✅ Found: ${email} (ID: ${user.id})`);
            }
        }

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script
listUsers();