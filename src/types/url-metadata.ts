export interface URLMetadata {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    favicon?: string;
    type?: string;
}

export interface OGFetchResponse {
    success: boolean;
    data?: URLMetadata;
    error?: string;
}
