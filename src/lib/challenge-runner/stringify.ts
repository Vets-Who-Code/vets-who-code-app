/**
 * Serialize a JavaScript value to the canonical string form used by
 * J0dI3's generated challenge catalog.
 *
 * Convention observed in catalog expected_output strings:
 * - number/boolean:   6         true
 * - string:           'hello'   (single-quoted)
 * - array/object:     [1,2,3]   {"k":1}    (JSON.stringify)
 * - null/undefined:   null      undefined
 *
 * If the catalog disagrees on an edge case, flag the challenge so the
 * generator can regenerate the expected_output — don't paper over it here.
 */
export function stringifyForCatalog(value: unknown): string {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    const t = typeof value;
    if (t === "string") return `'${value as string}'`;
    if (t === "number" || t === "boolean" || t === "bigint") return String(value);
    // arrays, objects, anything else structured
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}
