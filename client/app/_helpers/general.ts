export const removeEmptyProperty = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((newObj: Record<string, any>, key) => {
    if (obj[key]) newObj[key] = obj[key];
    return newObj;
  }, {});
};

export const makeUrl = (args: Record<string, any>) => {
  const obj = removeEmptyProperty(args);
  return Object.keys(obj).reduce((url: string, key, index) => {
    if (index === 0) url += `?${key}=${args[key]}`;
    else url += `&${key}=${args[key]}`;
    return url;
  }, '');
};
