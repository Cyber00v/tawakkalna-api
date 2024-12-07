export default (str: string, targetLength: number, padString = " "): string => {
  if (str.length >= targetLength) return str;

  const padLength = targetLength - str.length;
  const paddedString = padString.repeat(padLength) + str;

  return paddedString;
};
