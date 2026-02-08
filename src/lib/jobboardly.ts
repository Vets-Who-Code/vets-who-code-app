import Parser from "rss-parser";

export interface Job {
    id: string;
    title: string;
    description: string;
    link: string;
    company?: string;
    location?: string;
    type?: string;
    category?: string;
    pubDate?: string;
    salary?: string;
}

const RSS_FEED_URL = "https://vets-who-code.jobboardly.com/jobs.rss";

/**
 * Fetch and parse jobs from Job Boardly RSS feed
 */
export async function getJobs(): Promise<Job[]> {
    try {
        const parser = new Parser({
            customFields: {
                item: [
                    ["company", "company"],
                    ["location", "location"],
                    ["type", "type"],
                    ["category", "category"],
                    ["salary", "salary"],
                ],
            },
        });

        const feed = await parser.parseURL(RSS_FEED_URL);

        if (!feed.items || feed.items.length === 0) {
            return [];
        }

        const jobs: Job[] = feed.items.map((item, index) => {
            const anyItem = item as any;
            return {
                id: item.guid || item.link || `job-${index}`,
                title: item.title || "Untitled Position",
                description: anyItem.contentSnippet || anyItem.content || anyItem.description || "",
                link: item.link || "#",
                company: anyItem.company,
                location: anyItem.location,
                type: anyItem.type,
                category: item.categories?.[0] || anyItem.category,
                pubDate: item.pubDate || item.isoDate,
                salary: anyItem.salary,
            };
        });

        return jobs;
    } catch (error) {
        console.error("Error fetching jobs from Job Boardly:", error);
        return [];
    }
}

/**
 * Get a single job by ID
 */
export async function getJobById(id: string): Promise<Job | null> {
    const jobs = await getJobs();
    return jobs.find((job) => job.id === id) || null;
}

/**
 * Search jobs by keyword
 */
export function searchJobs(jobs: Job[], keyword: string): Job[] {
    const lowerKeyword = keyword.toLowerCase();
    return jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(lowerKeyword) ||
            job.description.toLowerCase().includes(lowerKeyword) ||
            job.company?.toLowerCase().includes(lowerKeyword) ||
            job.location?.toLowerCase().includes(lowerKeyword)
    );
}

/**
 * Filter jobs by category
 */
export function filterJobsByCategory(jobs: Job[], category: string): Job[] {
    return jobs.filter((job) => job.category === category);
}

/**
 * Filter jobs by type (Full-time, Part-time, Contract, etc.)
 */
export function filterJobsByType(jobs: Job[], type: string): Job[] {
    return jobs.filter((job) => job.type === type);
}

/**
 * Get unique categories from jobs
 */
export function getCategories(jobs: Job[]): string[] {
    const categories = jobs
        .map((job) => job.category)
        .filter((category): category is string => !!category);
    return Array.from(new Set(categories));
}

/**
 * Get unique job types from jobs
 */
export function getJobTypes(jobs: Job[]): string[] {
    const types = jobs.map((job) => job.type).filter((type): type is string => !!type);
    return Array.from(new Set(types));
}
