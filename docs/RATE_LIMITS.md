# API Rate Limits

Public API endpoints are rate limited via the in-memory sliding-window limiter in
`src/lib/rate-limit.ts` (`enforceRateLimit`). Buckets are namespaced per endpoint, so
hitting one endpoint never consumes another endpoint's budget.

## Limits

| Endpoint                      | Limit    | Window | Keyed by  |
| ----------------------------- | -------- | ------ | --------- |
| `/api/apply`                  | 3 req    | 10 min | client IP |
| `/api/contact`                | 5 req    | 60s    | client IP |
| `/api/health`                 | 30 req   | 60s    | client IP |
| `/api/mentor`, `/api/mentee`  | 3 req    | 10 min | client IP |
| `/api/newsletter`             | 5 req    | 60s    | client IP |
| `/api/og/fetch`               | 10 req   | 15 min | client IP |

`/api/mentor` and `/api/mentee` share one bucket because both post to the same
Slack webhook.

## Response on limit

When a limit is exceeded the endpoint responds:

- Status: `429`
- Headers: `Retry-After` (seconds until the window resets), plus
  `X-RateLimit-Remaining` and `X-RateLimit-Reset` on every response
- Body: `{ "error": "Too many requests. Please try again later." }`

## Scaling note

The limiter keeps its counters in process memory, which is only correct on a
single instance. If the app scales to multiple instances (or heavy serverless
fan-out makes per-instance counters too leaky), swap the `Map` in
`src/lib/rate-limit.ts` for a shared store such as Upstash Redis — the
`enforceRateLimit` call sites stay the same.
