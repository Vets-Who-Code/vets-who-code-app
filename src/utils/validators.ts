// src/utils/validators.ts

/**
 * Validation result
 */

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns ValidationResult with isValid status and optional error message
 * @example
 * validateEmail('test@example.com') // { isValid: true }
 * validateEmail('invalid') // { isValid: false, error: 'Invalid email format' }
 */

export function validateEmail(email: string): ValidationResult {
    if (!email) {
        return { isValid: false, error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return { isValid: false, error: "Invalid email format" };
    }

    return { isValid: true };
}

/**
 * Validates password strength
 * Password must be at least 8 characters and contain:
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * @param password - Password to validate
 * @returns ValidationResult with isValid status and optional error message
 * @example
 * validatePassword('Password123') // { isValid: true }
 * validatePassword('weak') // { isValid: false, error: 'Password must be at least 8 characters' }
 */

export function validatePassword(password: string): ValidationResult {
    if (!password) {
        return { isValid: false, error: "Password is required" };
    }

    if (password.length < 8) {
        return { isValid: false, error: "Password must be at least 8 characters" };
    }

    if (!/[A-Z]/.test(password)) {
        return { isValid: false, error: "Password must contain an uppercase letter" };
    }

    if (!/[a-z]/.test(password)) {
        return { isValid: false, error: "Password must contain a lowercase letter" };
    }

    if (!/[0-9]/.test(password)) {
        return { isValid: false, error: "Password must contain a number" };
    }

    return { isValid: true };
}

/**
 * Validates US phone number format
 * Accepts formats like: (555) 555-5555, 555-555-5555, 5555555555, +1 555 555 5555
 * @param phone - Phone number to validate
 * @returns ValidationResult with isValid status and optional error message
 * @example
 * validatePhone('(555) 555-5555') // { isValid: true }
 * validatePhone('123') // { isValid: false, error: 'Invalid phone number format' }
 */
export function validatePhone(phone: string): ValidationResult {
    if (!phone) {
        return { isValid: false, error: "Phone number is required" };
    }

    const phoneRegex = /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (!phoneRegex.test(phone)) {
        return { isValid: false, error: "Invalid phone number format" };
    }

    return { isValid: true };
}

/**
 * Validates URL format
 * @param url - URL to validate
 * @returns ValidationResult with isValid status and optional error message
 * @example
 * validateUrl('https://example.com') // { isValid: true }
 * validateUrl('not-a-url') // { isValid: false, error: 'Invalid URL format' }
 */

export function validateUrl(url: string): ValidationResult {
    if (!url) {
        return { isValid: false, error: "URL is required" };
    }

    try {
        new URL(url); // eslint-disable-line no-new
        return { isValid: true };
    } catch {
        return { isValid: false, error: "Invalid URL format" };
    }
}

/**
 * Validates that a field is not empty
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns ValidationResult with isValid status and optional error message
 * @example
 * validateRequired('John', 'Name') // { isValid: true }
 * validateRequired('', 'Name') // { isValid: false, error: 'Name is required' }
 */

export function validateRequired(value: string, fieldName: string): ValidationResult {
    if (!value || value.trim() === "") {
        return { isValid: false, error: `${fieldName} is required` };
    }

    return { isValid: true };
}

/**
 * Validates minimum length of a string
 * @param value - Value to validate
 * @param minLength - Minimum required length
 * @param fieldName - Name of the field for error message
 * @returns ValidationResult with isValid status and optional error message
 * @example
 * validateMinLength('hello', 3, 'Username') // { isValid: true }
 * validateMinLength('hi', 5, 'Username') // { isValid: false, error: 'Username must be at least 5 characters' }
 */
export function validateMinLength(
    value: string,
    minLength: number,
    fieldName: string
): ValidationResult {
    if (value.length < minLength) {
        return {
            isValid: false,
            error: `${fieldName} must be at least ${minLength} characters`,
        };
    }

    return { isValid: true };
}

/**
 * Validates maximum length of a string
 * @param value - Value to validate
 * @param maxLength - Maximum allowed length
 * @param fieldName - Name of the field for error message
 * @returns ValidationResult with isValid status and optional error message
 * @example
 * validateMaxLength('hello', 10, 'Username') // { isValid: true }
 * validateMaxLength('very long username', 10, 'Username') // { isValid: false, error: 'Username must be no more than 10 characters' }
 */
export function validateMaxLength(
    value: string,
    maxLength: number,
    fieldName: string
): ValidationResult {
    if (value.length > maxLength) {
        return {
            isValid: false,
            error: `${fieldName} must be no more than ${maxLength} characters`,
        };
    }

    return { isValid: true };
}

/**
 * Composes multiple validators and returns the first error encountered
 * Useful for chaining multiple validation rules on a single field
 * @param validators - Array of validator functions
 * @returns ValidationResult with isValid status and optional error message
 * @example
 * const result = composeValidators(
 *   () => validateRequired(name, 'Name'),
 *   () => validateMinLength(name, 2, 'Name'),
 *   () => validateMaxLength(name, 50, 'Name')
 * );
 */
export function composeValidators(...validators: Array<() => ValidationResult>): ValidationResult {
    for (const validator of validators) {
        const result = validator();
        if (!result.isValid) {
            return result;
        }
    }

    return { isValid: true };
}
