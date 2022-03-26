export function checkParams(eventBody, params) {
  let hasError = false

  for (let k of params) {
    if (typeof eventBody[k] === 'undefined' || !eventBody[k]) {
      hasError = true
    }
  }

  return hasError
}
