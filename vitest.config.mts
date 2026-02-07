import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@containers": path.resolve(__dirname, "./src/containers"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
            "@data": path.resolve(__dirname, "./src/data"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@layout": path.resolve(__dirname, "./src/layouts"),
            "@ui": path.resolve(__dirname, "./src/components/ui"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@widgets": path.resolve(__dirname, "./src/components/widgets"),
            "@fonts": path.resolve(__dirname, "./src/public/fonts"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        postcss: {},
    },
    test: {
        globals: true,
        environment: "happy-dom",
        clearMocks: true,
        setupFiles: ["./vitest.setup.ts"],
        include: [
            "__tests__/**/*.{test,tests}.{ts,tsx}",
            "src/**/__tests__/**/*.{test,tests}.{ts,tsx}",
        ],
    exclude: ["node_modules", "tests/**"],
        coverage: {
            provider: "v8",
            reportsDirectory: "coverage",
        },
    },
});
