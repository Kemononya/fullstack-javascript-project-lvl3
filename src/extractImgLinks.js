export default (content, href) => {
  const linkRx = /img src="(.+?)"/ig;
  const results = content.matchAll(linkRx);
  return Array.from(results).map((r) => r[1])
    .map((rawLink) => new URL(rawLink, href).toString());
};
