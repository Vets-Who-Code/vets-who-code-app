import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { shadcnMerge } from "shadcn-ui"; // Pae5b

export function cn(...inputs: ClassValue[]) {
    return shadcnMerge(twMerge(clsx(inputs))); // Pae5b
}
