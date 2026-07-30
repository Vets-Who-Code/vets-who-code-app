# API Rate Limits

Public API endpoints are rate limited via the in-memory sliding-window limiter in
`src/lib/rate-limit.ts` (`enforceRateLimit`). Buckets are namespaced per endpoint, so
hitting one endpoint never consumes another endpoint's budget.

## Limits

| Endpoint        | Limit      | Window | Keyed by                                  |
| --------------- | ---------- | ------ | ----------------------------------------- |
| `/api/j0di3/*`  | 30 req/min | 60s    | troopId, falling back to user id, then IP |
| `/api/contact`  | 5 req/min  | 60s    | client IP                                 |
| `/api/health`   | 30 req/min | 60s    | client IP                                 |

The J0dI3 limit is enforced centrally in `src/lib/j0di3-proxy.ts`, so every
`/api/j0di3/*` route is covered in one place.

Other endpoints (e.g. `/api/military-resume/*`) apply their own limits directly with
`checkRateLimit` — see the individual handlers.

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
