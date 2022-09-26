import extractLinks from './extractLinks.js';

export default (html, newLinks, fileName, href) => {
  const imgLinks = extractLinks(html, 'img', href);
  const scriptLinks = extractLinks(html, 'script', href);
  const linkLinks = extractLinks(html, 'link', href);
  const oldLinks = [...imgLinks, ...scriptLinks, ...linkLinks];
  let newHtml = html;
  oldLinks.forEach((oldLink, id) => {
    newHtml = newHtml.replace(oldLink, `${fileName}_files/${newLinks[id]}`);
  });
  return newHtml;
};
