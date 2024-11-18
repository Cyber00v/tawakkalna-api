export default (header: Record<string, string>) => {
  const headers: { name: string; value: string }[] = [];
  Object.keys(header).forEach((k) =>
    headers.push({ name: k, value: header[k] })
  );
  return headers;
};
