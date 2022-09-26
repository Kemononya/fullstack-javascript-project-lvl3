export default (content, tag, href) => {
  let linkRx;
  switch (tag) {
    case 'img':
      linkRx = /img .*?src="(.+?)"/ig;
      break;
    case 'script':
      linkRx = /script .*?src="(.+?)"/ig;
      break;
    default:
      linkRx = /link .*?href="(.+?)"/ig;
  }
  const domain = new URL(href).host;
  const results = content.matchAll(linkRx);
  return Array.from(results).map((r) => r[1]).filter((link) => {
    if (!link.startsWith('http')) {
      return true;
    }
    return domain === new URL(link).host;
  });
};
