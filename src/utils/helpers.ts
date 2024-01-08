const isNullOrEmpty = (value: any) =>
  value === null ||
  value === undefined ||
  value === "" ||
  Object.keys(value).length === 0 ||
  (Array.isArray(value) && value.length === 0);

const getCleanUrl = (path: string): string =>
  decodeURIComponent(path).replace(/%20/g, " ");

function generateCodeVerifier(length: number): string {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
export { isNullOrEmpty, getCleanUrl, generateCodeVerifier };
