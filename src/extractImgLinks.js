export default (content) => {
  const linkRx = /img src="(.+?)"/ig;
  const results = content.matchAll(linkRx);
  return Array.from(results).map((r) => r[1]);
};
