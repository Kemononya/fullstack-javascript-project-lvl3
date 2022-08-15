export default (string) => {
  const { hostname } = new URL(string);
  const re = /[^a-zA-Z0-9]/g;
  return hostname.replace(re, '-').concat('.html');
};
