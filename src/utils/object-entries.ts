export default (object: any) => {
  const entries = [];
  for (const key in object)
    if (Object.prototype.hasOwnProperty.call(object, key))
      entries.push([key, object[key]]);

  return entries;
};
