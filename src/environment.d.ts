type ENV = "test" | "development" | "production";

declare namespace NodeJS {
    export interface ProcessEnv extends Dict<string> {
        NODE_ENV: ENV;
        MAILCHIMP_SUBSCRIBE_URL: string;
        MAILCHIMP_API_KEY: string;
        MAILCHIMP_LIST_ID: string;
    }
}
