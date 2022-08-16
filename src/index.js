import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import fileNameChanger from './fileNameChanger.js';
// import extractLinks from './extractImgLinks.js';

const pageLoader = (url, dirpath) => {
  const href = new URL(url);
  const fileName = fileNameChanger(href);
  const absolutePath = path.resolve(dirpath, fileName);
  return axios.get(url)
    .then((response) => {
      fs.mkdir(`${absolutePath}_files`);
      return response.data;
    })
    .then((data) => {
      fs.writeFile(`${absolutePath}.html`, `${data}`);
    // const links = extractLinks(data, href);
    // const promises = links.map((link) => axios.get(link).then((res) => res.data));
    // Promise.all(promises)
    // .then((contents) => contents
    // .forEach((content) => fs.writeFile(`${absolutePath}_files/file1`, content)));
    // console.log(links);
    })
    .then(() => `${absolutePath}.html`);
};

export default pageLoader;
