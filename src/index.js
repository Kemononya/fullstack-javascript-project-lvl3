import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import fileNameChanger from './fileNameChanger.js';
import linkNameChanger from './linkNameChanger.js';
import extractLinks from './extractLinks.js';
import htmlEditor from './htmlEditor.js';

const pageLoader = (href, dirpath) => {
  const url = new URL(href);
  const fileName = fileNameChanger(url);
  const absolutePath = path.resolve(dirpath, fileName);
  return axios.get(href)
    .then((response) => {
      fs.mkdir(`${absolutePath}_files`);
      return response.data;
    })
    .then((data) => {
      const imgLinks = extractLinks(data, 'img', href).map((rawLink) => new URL(rawLink, href).toString());
      const scriptLinks = extractLinks(data, 'script', href).map((rawLink) => new URL(rawLink, href).toString());
      const linkLinks = extractLinks(data, 'link', href).map((rawLink) => new URL(rawLink, href).toString());
      const links = [...imgLinks, ...scriptLinks, ...linkLinks];
      const renamedLinks = links.map((link) => linkNameChanger(link));
      const imgPromises = imgLinks.map((link) => axios({
        method: 'get',
        url: link,
        responseType: 'stream',
      }).then((res) => res.data));
      const scriptPromises = scriptLinks.map((link) => axios.get(link).then((res) => res.data));
      const linkPromises = linkLinks.map((link) => axios.get(link).then((res) => res.data));
      const promises = [...imgPromises, ...scriptPromises, ...linkPromises];
      Promise.all(promises)
        .then((contents) => contents
          .forEach((content, id) => fs.writeFile(`${absolutePath}_files/${renamedLinks[id]}`, content)));
      return htmlEditor(data, renamedLinks, fileName, href);
    })
    .then((data) => fs.writeFile(`${absolutePath}.html`, `${data}`))
    .then(() => `${absolutePath}.html`);
};

export default pageLoader;
