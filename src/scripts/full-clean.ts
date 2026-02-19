/**
 * Full database cleanup - removes users and related data properly
 * Run with: npx tsx src/scripts/full-clean.ts
 */

import prisma from "../lib/prisma";

async function fullClean() {
    console.log("🧹 Full database cleanup...\n");

    try {
        // Delete in order to respect foreign keys
        console.log("Deleting related data...");

        // Delete posts first
        await prisma.post.deleteMany({});
        console.log("✅ Deleted all posts");

        // Delete threads
        await prisma.thread.deleteMany({});
        console.log("✅ Deleted all threads");

        // Delete all user-related data
        await prisma.progress.deleteMany({});
        await prisma.submission.deleteMany({});
        await prisma.enrollment.deleteMany({});
        await prisma.certificate.deleteMany({});
        await prisma.bookmark.deleteMany({});
        await prisma.note.deleteMany({});
        await prisma.learningAnalytics.deleteMany({});
        await prisma.mentorReview.deleteMany({});
        await prisma.mentorSession.deleteMany({});
        await prisma.mentorship.deleteMany({});
        await prisma.mentorProfile.deleteMany({});
        await prisma.repository.deleteMany({});
        await prisma.gitHubProfile.deleteMany({});
        await prisma.order.deleteMany({});
        console.log("✅ Deleted all user-related data");

        // Delete accounts and sessions
        await prisma.account.deleteMany({});
        await prisma.session.deleteMany({});
        await prisma.authenticator.deleteMany({});
        console.log("✅ Deleted all auth data");

        // Finally delete users
        const deletedUsers = await prisma.user.deleteMany({});
        console.log(`✅ Deleted ${deletedUsers.count} users`);

        // Forums stay intact
        const forumCount = await prisma.forum.count();
        console.log(`\n📚 Forums preserved: ${forumCount} forums`);

        console.log("\n✨ Database fully cleaned!");
        console.log("\n📝 Next steps:");
        console.log("1. Go to http://localhost:3000/login");
        console.log("2. Click 'Sign in with GitHub'");
        console.log("3. You'll be created as a fresh admin user");
        console.log("\n⚡ Your username 'jeromehardaway' is hardcoded as admin!");

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run immediately
console.log("⚠️  This will DELETE ALL USERS and their data!");
console.log("Forums will be preserved.\n");

fullClean();