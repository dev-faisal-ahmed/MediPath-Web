export const removeEmptyProperty = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((newObj: Record<string, any>, key) => {
    if (obj[key]) newObj[key] = obj[key];
    return newObj;
  }, {});
};
