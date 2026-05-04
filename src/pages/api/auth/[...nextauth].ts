import NextAuth from "next-auth";
import { options } from "./options";

/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     summary: Get current session
 *     description: Returns the authenticated user's session data, or an empty object if not signed in.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Session object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                       nullable: true
 *                     email:
 *                       type: string
 *                       nullable: true
 *                     image:
 *                       type: string
 *                       nullable: true
 *                     role:
 *                       type: string
 *                       enum: [STUDENT, INSTRUCTOR, ADMIN]
 *                 expires:
 *                   type: string
 *                   format: date-time
 * /api/auth/signin:
 *   get:
 *     summary: Sign in
 *     description: Redirects to the GitHub OAuth sign-in flow. In production, the user must be a member of the Vets Who Code GitHub organization.
 *     tags:
 *       - Auth
 *     responses:
 *       302:
 *         description: Redirects to GitHub OAuth
 * /api/auth/signout:
 *   get:
 *     summary: Sign out confirmation page
 *     description: Returns the sign-out confirmation page.
 *     tags:
 *       - Auth
 *     security:
 *       - SessionCookie: []
 *     responses:
 *       200:
 *         description: Sign-out confirmation page (HTML)
 *   post:
 *     summary: Sign out
 *     description: Ends the current session and clears the session cookie. Requires a CSRF token.
 *     tags:
 *       - Auth
 *     security:
 *       - SessionCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - csrfToken
 *             properties:
 *               csrfToken:
 *                 type: string
 *                 description: CSRF token from /api/auth/csrf
 *     responses:
 *       302:
 *         description: Redirects after signing out
 */

export default NextAuth(options);

// Type augmentation for next-auth
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
        };
    }
}
