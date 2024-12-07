export default (parameters: unknown): parameters is XMLHttpRequestBodyInit =>
  typeof parameters === "string" ||
  parameters instanceof FormData ||
  parameters instanceof URLSearchParams;
