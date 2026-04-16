import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/pages/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Vets Who Code API",
        version: "1.0.0",
        description: "API documentation for Vets Who Code application",
        contact: {
          name: "Vets Who Code",
          url: "https://vetswhocode.io",
          email: "support@vetswhocode.io",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
        {
          url: "https://vetswhocode.io",
          description: "Production server",
        },
      ],
      components: {
        securitySchemes: {
          SessionCookie: {
            type: "apiKey",
            in: "cookie",
            name: "next-auth.session-token",
            description: "NextAuth session cookie (GitHub OAuth). Sign in at /login.",
          },
        },
        schemas: {},
      },
    },
  });

  return spec;
};
