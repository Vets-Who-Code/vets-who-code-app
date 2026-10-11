/**
 * POST a JSON body and reject on a non-2xx response, the way axios.post did.
 * fetch only rejects on network failure, so the status check lives here once.
 */
export async function postJson(url: string, data: unknown): Promise<Response> {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`Request failed with status code ${res.status}`);
    }
    return res;
}
