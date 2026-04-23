/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { Dispatch, SetStateAction } from "react";
import { getStartOfDay } from "@/utils/date";
import { ICourse, IEvent, SectionType } from "./types";

/**
 * Normalizes an array of objects keyed off an identifier,
 * removing properties with `null` value
 *
 * @template T - Type of the objects in the input array
 * @param data - The array of objects to normalize
 * @param identifier - Property used as the lookup key for each record
 * @returns Normalized data object
 * @example
 * normalizedData([
 *     { id: 1, title: "Intro", summary: null },
 *     { id: 2, name: "John", title: null },
 * ], "id");
 * // returns { "1": { id: 1, title: "Intro" }, "2": { id: 2, name: "John" } }
 */
export const normalizedData = <T extends Record<string, unknown>>(
    data: T[],
    identifier: keyof T
): { [key: string]: SectionType } => {
    return data.reduce(
        (allContent, item) => {
            // Remove null properties and create a new object
            const cleanedObj = Object.entries(item).reduce(
                (acc, [key, value]) => {
                    if (value !== null) {
                        acc[key] = value;
                    }
                    return acc;
                },
                {} as Record<string, unknown>
            );

            // Get the identifier value and ensure it's a string
            const key = String(item[identifier]);

            // Return the accumulated object with the new entry
            return {
                ...allContent,
                [key]: {
                    ...cleanedObj,
                },
            };
        },
        {} as { [key: string]: SectionType }
    );
};

/**
 * Converts a string into a URL-friendly slug
 *
 * @param text - The text to be slugified
 * @returns The slugified text
 */
export const slugify = (text: string): string => {
    if (!text) return "";
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};

/**
 * Converts a slug back into a human-readable string.
 * @param text The text to unslugify
 * @returns The unslugified text
 */
export const unslugify = (text: string): string => {
    if (!text) return "";
    return text
        .replace(/-/g, " ") // Replace spaces with -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};

/**
 * Checks if an object is empty (i.e., has no own properties)
 *
 * @param object - The object to check
 * @returns True if object is empty, otherwise False
 */
export const isObjectEmpty = (object: { [key: string]: unknown }): boolean => {
    return Object.keys(object).length === 0;
};

/**
 * Checks if a value is a non-empty string.
 *
 * @param value - The string to check
 * @returns True if value is a non-empty string, otherwise False
 */
export const isNonEmptyString = (value: unknown): boolean => {
    return typeof value === "string" && value.trim() !== "";
};

/**
 * Capitalizes only the first letter of a string and leaves the rest in lowercase
 *
 * @param text - The string to capitalize
 * @returns The capitalized string
 */
export const toCapitalize = (text: string): string => {
    return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Normalizes a path by removing the leading slash in a string, if present.
 *
 * @param path - The string to normalize
 * @returns The normalized string
 */
export const normalizePath = (path: string): string => {
    return path.startsWith("/") ? path.slice(1) : path;
};

/**
 * Sorts courses based on the provided sort value and updates the state
 *      A sort value of "latest" sorts the courses by their published date in descending order
 *      Any other sort value resets the courses to the default order
 *
 * @param sortValue The string to sort by
 * @param courses The collection of courses
 * @param defaultCourses A collection of default courses
 * @param setSort The function to update the state with the sorted courses
 */
export const courseSorting = (
    sortValue: string,
    courses: ICourse[],
    defaultCourses: ICourse[],
    setSort: Dispatch<SetStateAction<ICourse[]>>
): void => {
    const coursesCopy = [...courses];

    switch (sortValue) {
        case "latest": {
            const sorted = coursesCopy.sort((a, b) =>
                new Date(a.published_at).getTime() > new Date(b.published_at).getTime() ? -1 : 1
            );
            setSort(sorted);
            break;
        }
        default: {
            setSort(defaultCourses);
        }
    }
};

/**
 * Filters events based on provided filter value and updates the state
 *      Possible filter values: all, happening, upcoming, and expired
 *      Any other filter value returns an empty list
 * @param filterValue The value to filter by
 * @param events The collection of events
 * @param setFilteredEvents The function to update the state with the filtered events
 */
export const eventFilter = (
    filterValue: string,
    events: IEvent[],
    setFilteredEvents: Dispatch<SetStateAction<IEvent[]>>
): void => {
    const todayStart = getStartOfDay().getTime();

    switch (filterValue) {
        case "all": {
            setFilteredEvents(events);
            break;
        }
        case "happening": {
            const filterEvents = events.filter((event) => {
                return getStartOfDay(event.start_date).getTime() === todayStart;
            });
            setFilteredEvents(filterEvents);
            break;
        }
        case "upcoming": {
            const filterEvents = events.filter((event) => {
                return getStartOfDay(event.start_date).getTime() > todayStart;
            });
            setFilteredEvents(filterEvents);
            break;
        }
        case "expired": {
            const filterEvents = events.filter((event) => {
                return getStartOfDay(event.start_date).getTime() < todayStart;
            });
            setFilteredEvents(filterEvents);
            break;
        }
        default:
            setFilteredEvents([]);
            break;
    }
};

/**
 * Converts minutes to hours
 * @param minutes The number of minutes to convert
 * @return The string in '5h : 32m' format, invalid formats are empty
 */
export const minutesToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;

    const hoursString = hours > 0 ? `${hours}h ` : "";
    const minutesString = minutesLeft > 0 ? `${minutesLeft}m` : "";

    return `${hoursString}${minutesString}`;
};

/**
 * Recursively flattens an inputted array nested arrays up to a specified depth
 *
 * @tparam T The type of the array elements
 * @param arr The array to flatten
 * @param d The number of levels deep to flatten
 * @returns The flattened array
 */,
export const flatDeep = <T>(arr: unknown[], d = 1): T[] => {
    return d > 0
        ? arr.reduce((acc: T[], val) => {
              return acc.concat(Array.isArray(val) ? flatDeep<T>(val, d - 1) : (val as T));
          }, [])
        : (arr.slice() as T[]);
};

/**
 * Checks if a provided object has a specified key
 *
 * @param obj The object to search in
 * @param key The key to look for
 * @returns True if the object has the provided key, otherwise False
 */
export const hasKey = <K extends string>(obj: unknown, key: K): obj is Record<K, unknown> => {
    return typeof obj === "object" && obj !== null && Object.hasOwn(obj, key);
};

/**
 * Returns all focusable elements from a specified parent root element
 *
 * Focusable elements include any element with attributes that are not
 * disabled, aria-hidden, or unreachable via keyboard navigation
 *
 * @param parent The parent HTML element hierarchy to traverse through
 * @returns The collection of found focusable elements, otherwise an empty array
 */
export const getFocusableElements = (parent?: HTMLElement | null): HTMLElement[] => {
    if (!parent) return [];

    return (
        Array.from(
            parent.querySelectorAll("a[href], button, input, textarea, select, details,[tabindex]")
        )
            .filter(
                (el) =>
                    el.getAttribute("tabindex") !== "-1" &&
                    !el.hasAttribute("disabled") &&
                    !el.getAttribute("aria-hidden")
            )
            // sort tabindexes as follows: 1, 2, 3, 4, ..., 0, 0, 0
            .sort((a, b) => {
                const aIndex = Number(a.getAttribute("tabindex")) || 0;
                const bIndex = Number(b.getAttribute("tabindex")) || 0;
                if (aIndex === bIndex) return 0;
                if (aIndex === 0) return 1;
                if (bIndex === 0) return -1;
                return aIndex < bIndex ? -1 : 1;
            }) as HTMLElement[]
    );
};

/**
 * Finds the next focusable element in a specified direction and focuses on it
 *
 * @param elements The collection of focusable elements to navigate through
 * @param forward The direction to navigate in, true for forward and false for backward
 */
export const nextFocus = (elements: HTMLElement[], forward = true): void => {
    const currentIndex = elements.findIndex((e) => e === document.activeElement);
    let nextIndex = 0;

    if (currentIndex > -1) {
        if (forward) {
            nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        }
    }

    elements[nextIndex]?.focus();
};
