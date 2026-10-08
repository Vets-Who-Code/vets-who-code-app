import { createSwaggerSpec } from "next-swagger-doc";
import { version } from "../package.json";

let cachedSpec: object | null = null;

export const getApiDocs = () => {
    if (process.env.NODE_ENV === "production" && cachedSpec) {
        return cachedSpec;
    }

    const spec = createSwaggerSpec({
        apiFolder: "src/pages/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Vets Who Code API",
                version,
                description: "API documentation for Vets Who Code application",
                contact: {
                    name: "Vets Who Code",
                    url: "https://vetswhocode.io",
                    email: "support@vetswhocode.io",
                },
            },
            servers: [
                {
                    url: "/",
                    description: "Current server",
                },
            ],
            components: {
                schemas: {},
            },
        },
    });

    if (process.env.NODE_ENV === "production") {
        cachedSpec = spec;
    }

    return spec;
};
