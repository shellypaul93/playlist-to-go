const isNullOrEmpty = (value: any) =>
  value === null ||
  value === undefined ||
  value === '' ||
  Object.keys(value).length === 0;
const getCleanUrl = (path: string): string =>
  decodeURIComponent(path).replace(/%20/g, ' ');
export { isNullOrEmpty, getCleanUrl };
