import NextAuth from "next-auth";
import { options } from "./options";

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