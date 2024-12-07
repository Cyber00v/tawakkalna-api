export default <T extends any>(k: any, obj: T): k is keyof T => {
  return obj[k as keyof T] !== undefined;
};
