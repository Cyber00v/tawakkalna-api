export default <T extends object, K extends keyof T>(
  obj: T,
  prop: K
): obj is T & { [P in K]: T[K] } => prop in obj;
