export default <T>(value: T, ...expectedvalue: T[]): boolean =>
  expectedvalue.includes(value);
