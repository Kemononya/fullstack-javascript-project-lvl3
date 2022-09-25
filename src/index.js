import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import fileNameChanger from './fileNameChanger.js';
import linkNameChanger from './linkNameChanger.js';
import extractLinks from './extractImgLinks.js';
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
      const links = extractLinks(data).map((rawLink) => new URL(rawLink, href).toString());
      const renamedLinks = links.map((link) => linkNameChanger(link));
      const promises = links.map((link) => axios({
        method: 'get',
        url: link,
        responseType: 'stream',
      }).then((res) => res.data));
      Promise.all(promises)
        .then((contents) => contents
          .forEach((content, id) => fs.writeFile(`${absolutePath}_files/${renamedLinks[id]}`, content)));
      return htmlEditor(data, renamedLinks, fileName);
    })
    .then((data) => fs.writeFile(`${absolutePath}.html`, `${data}`))
    .then(() => `${absolutePath}.html`);
};

export default pageLoader;
