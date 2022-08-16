export default (url) => {
  const { hostname, pathname } = url;
  const re = /[^a-zA-Z0-9]/g;
  const normalizedPathName = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return (`${hostname}${normalizedPathName}`).replace(re, '-');
};
