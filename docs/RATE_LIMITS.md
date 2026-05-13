# API rate limits

Every public API route that touches a paid backend, sends a Slack notification,
or is otherwise expensive enforces a per-IP or per-user rate limit. The limiter
lives at `src/lib/rate-limit.ts` and is in-memory (single Vercel instance);
swap the underlying `Map` for Redis/Upstash when we scale out.

## Response headers

Every rate-limited route sets:

- `X-RateLimit-Limit` — max requests in the window
- `X-RateLimit-Remaining` — requests left in the current window
- `X-RateLimit-Reset` — UNIX seconds when the window resets
- `Retry-After` — seconds until the window resets (sent **only on 429**)

The body on `429` is `{ "error": "<human message>" }` so the frontend can
surface the reason directly.

## Per-route limits

| Route                              | Bucket scope        | Key                | Limit / window         |
| ---------------------------------- | ------------------- | ------------------ | ---------------------- |
| `/api/j0di3/*`                     | `j0di3`             | session user id    | **30 / minute**        |
| `/api/ai/chat`                     | `ai-chat`           | session user id    | **20 / minute**        |
| `/api/military-resume/translate`   | (default)           | IP                 | **10 / 15 minutes**    |
| `/api/military-resume/parse-pdf`   | (default)           | IP                 | _per-route, see file_  |
| `/api/military-resume/extract-fields` | (default)        | IP                 | _per-route, see file_  |
| `/api/military-resume/salary-lookup` | (default)         | IP                 | _per-route, see file_  |
| `/api/contact`                     | `contact`           | IP                 | **5 / 15 minutes**     |
| `/api/newsletter`                  | `newsletter`        | IP                 | **5 / 15 minutes**     |
| `/api/apply`                       | `apply`             | IP                 | **3 / hour**           |
| `/api/mentor`                      | `mentor`            | IP                 | **5 / hour**           |
| `/api/mentee`                      | `mentee`            | IP                 | **5 / hour**           |
| `/api/health`                      | `health`            | IP                 | **60 / minute**        |

Limits are intentionally conservative — they should never block normal use but
will catch a buggy client in a tight loop or a casual abuser. If a real user
hits one, raise the cap in code; do not paper over with a longer window.

## Frontend conventions

- Treat `429` as user-facing: show the response body's `error` string verbatim.
- If `Retry-After` is present, disable the affected control for that many
  seconds before letting the user retry.
- Do not implement client-side retries on `429` — the user should consciously
  retry, otherwise we just amplify the storm.

## Adding a new limit

```ts
import { applyRateLimit } from "@/lib/rate-limit";

const rl = applyRateLimit(req, res, {
    scope: "my-feature",      // unique per route family
    key: session.user.id,     // optional — defaults to client IP
    max: 10,
    windowMs: 60_000,
});
if (!rl.allowed) {
    return res.status(429).json({ error: "Slow down a little." });
}
```

`applyRateLimit` sets the headers above automatically — the caller only has to
short-circuit on `!rl.allowed`. Don't pull `checkRateLimit` directly unless you
need a result without writing headers (e.g. for tests).
