import extractLinks from './extractImgLinks.js';

export default (html, newLinks, fileName) => {
  const oldLinks = extractLinks(html);
  let newHtml;
  oldLinks.forEach((oldLink, id) => {
    newHtml = html.replace(oldLink, `${fileName}_files/${newLinks[id]}`);
  });
  return newHtml;
};
