// src/utils/__tests__/validators.test.ts

import {
    validateEmail,
    validatePassword,
    validatePhone,
    validateUrl,
    validateRequired,
    validateMinLength,
    validateMaxLength,
    composeValidators,
} from "../validators";

describe("validators", () => {
    describe("validateEmail", () => {
        it("should validate correct email formats", () => {
            expect(validateEmail("test@example.com").isValid).toBe(true);
            expect(validateEmail("user.name@domain.co.uk").isValid).toBe(true);
            expect(validateEmail("user+tag@example.com").isValid).toBe(true);
        });

        it("should reject invalid email formats", () => {
            const result1 = validateEmail("invalid");
            expect(result1.isValid).toBe(false);
            expect(result1.error).toBe("Invalid email format");

            const result2 = validateEmail("missing@domain");
            expect(result2.isValid).toBe(false);

            const result3 = validateEmail("@domain.com");
            expect(result3.isValid).toBe(false);

            const result4 = validateEmail("user@.com");
            expect(result4.isValid).toBe(false);
        });

        it("should reject empty email", () => {
            const result = validateEmail("");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Email is required");
        });
    });

    describe("validatePassword", () => {
        it("should validate strong passwords", () => {
            expect(validatePassword("Password123").isValid).toBe(true);
            expect(validatePassword("MyP@ssw0rd").isValid).toBe(true);
            expect(validatePassword("Abcdefg1").isValid).toBe(true);
        });

        it("should reject password without uppercase", () => {
            const result = validatePassword("password123");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Password must contain an uppercase letter");
        });

        it("should reject password without lowercase", () => {
            const result = validatePassword("PASSWORD123");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Password must contain a lowercase letter");
        });

        it("should reject password without number", () => {
            const result = validatePassword("PasswordOnly");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Password must contain a number");
        });

        it("should reject short password", () => {
            const result = validatePassword("Pass1");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Password must be at least 8 characters");
        });

        it("should reject empty password", () => {
            const result = validatePassword("");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Password is required");
        });
    });

    describe("validatePhone", () => {
        it("should validate correct US phone formats", () => {
            expect(validatePhone("(555) 555-5555").isValid).toBe(true);
            expect(validatePhone("555-555-5555").isValid).toBe(true);
            expect(validatePhone("5555555555").isValid).toBe(true);
            expect(validatePhone("+1 555 555 5555").isValid).toBe(true);
            expect(validatePhone("555.555.5555").isValid).toBe(true);
        });

        it("should reject invalid phone formats", () => {
            const result1 = validatePhone("123");
            expect(result1.isValid).toBe(false);
            expect(result1.error).toBe("Invalid phone number format");

            const result2 = validatePhone("555-55-5555");
            expect(result2.isValid).toBe(false);

            const result3 = validatePhone("abcd-efg-hijk");
            expect(result3.isValid).toBe(false);
        });

        it("should reject empty phone number", () => {
            const result = validatePhone("");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Phone number is required");
        });
    });

    describe("validateUrl", () => {
        it("should validate correct URL formats", () => {
            expect(validateUrl("https://example.com").isValid).toBe(true);
            expect(validateUrl("http://example.com").isValid).toBe(true);
            expect(validateUrl("https://example.com/path").isValid).toBe(true);
            expect(validateUrl("https://subdomain.example.com").isValid).toBe(true);
            expect(validateUrl("https://example.com:8080").isValid).toBe(true);
        });

        it("should reject invalid URL formats", () => {
            const result1 = validateUrl("not-a-url");
            expect(result1.isValid).toBe(false);
            expect(result1.error).toBe("Invalid URL format");

            const result2 = validateUrl("example.com");
            expect(result2.isValid).toBe(false);

            const result3 = validateUrl("ht!tp://invalid");
            expect(result3.isValid).toBe(false);
        });

        it("should reject empty URL", () => {
            const result = validateUrl("");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("URL is required");
        });
    });

    describe("validateRequired", () => {
        it("should validate non-empty values", () => {
            expect(validateRequired("value", "Field").isValid).toBe(true);
            expect(validateRequired("123", "Field").isValid).toBe(true);
        });

        it("should reject empty values", () => {
            const result1 = validateRequired("", "Username");
            expect(result1.isValid).toBe(false);
            expect(result1.error).toBe("Username is required");

            const result2 = validateRequired("   ", "Email");
            expect(result2.isValid).toBe(false);
            expect(result2.error).toBe("Email is required");
        });
    });

    describe("validateMinLength", () => {
        it("should validate values meeting minimum length", () => {
            expect(validateMinLength("hello", 3, "Username").isValid).toBe(true);
            expect(validateMinLength("12345", 5, "Code").isValid).toBe(true);
        });

        it("should reject values below minimum length", () => {
            const result = validateMinLength("hi", 5, "Username");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Username must be at least 5 characters");
        });

        it("should handle edge case of exact minimum length", () => {
            expect(validateMinLength("exact", 5, "Field").isValid).toBe(true);
        });
    });

    describe("validateMaxLength", () => {
        it("should validate values within maximum length", () => {
            expect(validateMaxLength("hello", 10, "Username").isValid).toBe(true);
            expect(validateMaxLength("short", 10, "Bio").isValid).toBe(true);
        });

        it("should reject values exceeding maximum length", () => {
            const result = validateMaxLength("very long username here", 10, "Username");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Username must be no more than 10 characters");
        });

        it("should handle edge case of exact maximum length", () => {
            expect(validateMaxLength("exact", 5, "Field").isValid).toBe(true);
        });
    });

    describe("composeValidators", () => {
        it("should return valid when all validators pass", () => {
            const name = "John";
            const result = composeValidators(
                () => validateRequired(name, "Name"),
                () => validateMinLength(name, 2, "Name"),
                () => validateMaxLength(name, 50, "Name")
            );

            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it("should return first error when validation fails", () => {
            const name = "";
            const result = composeValidators(
                () => validateRequired(name, "Name"),
                () => validateMinLength(name, 2, "Name"),
                () => validateMaxLength(name, 50, "Name")
            );

            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Name is required");
        });

        it("should stop at first error and not execute subsequent validators", () => {
            const name = "A";
            const result = composeValidators(
                () => validateRequired(name, "Name"),
                () => validateMinLength(name, 2, "Name"),
                () => validateMaxLength(name, 1, "Name")
            );

            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Name must be at least 2 characters");
        });

        it("should handle empty validator array", () => {
            const result = composeValidators();
            expect(result.isValid).toBe(true);
        });
    });
});
