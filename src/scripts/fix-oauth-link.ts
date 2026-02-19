/**
 * Fix OAuthAccountNotLinked error by linking existing user to GitHub
 * Run with: npx tsx src/scripts/fix-oauth-link.ts
 */

import prisma from "../lib/prisma";

async function fixOAuthLink() {
    const email = "jeromehardaway@users.noreply.github.com";

    console.log("🔍 Looking for existing user with email:", email);

    try {
        // Find the existing user
        const existingUser = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true }
        });

        if (!existingUser) {
            console.log("❌ No user found with that email");
            console.log("You can now login normally with GitHub!");
            return;
        }

        console.log(`✅ Found user: ${existingUser.name || existingUser.email}`);
        console.log(`   ID: ${existingUser.id}`);
        console.log(`   Accounts linked: ${existingUser.accounts.length}`);

        // Check if GitHub account already exists
        const githubAccount = existingUser.accounts.find(a => a.provider === "github");

        if (githubAccount) {
            console.log("✅ GitHub account already linked!");
            console.log("Try logging in again.");
        } else {
            console.log("⚠️  No GitHub account linked to this user");

            // Option 1: Delete the user and let OAuth recreate it
            console.log("\nOption 1: Delete user and recreate (recommended)");
            console.log("This will remove the existing user and let GitHub OAuth create a fresh one.");

            const answer = await askQuestion("\nDo you want to delete the existing user? (yes/no): ");

            if (answer.toLowerCase() === 'yes') {
                // Delete the user
                await prisma.user.delete({
                    where: { id: existingUser.id }
                });
                console.log("✅ User deleted successfully!");
                console.log("Now you can login with GitHub and it will create a new account.");
            } else {
                console.log("\nOption 2: Manually link GitHub account");
                console.log("You'll need your GitHub user ID from the OAuth callback.");
                console.log("This is more complex. Recommended to use Option 1.");
            }
        }

        // Also make sure the user is an admin
        if (existingUser && existingUser.role !== "ADMIN") {
            console.log("\n📝 Updating user role to ADMIN...");
            await prisma.user.update({
                where: { id: existingUser.id },
                data: { role: "ADMIN" }
            });
            console.log("✅ User is now an ADMIN!");
        }

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(question, (answer: string) => {
            readline.close();
            resolve(answer);
        });
    });
}

// Run the fix
fixOAuthLink();