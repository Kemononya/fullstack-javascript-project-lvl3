import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import fileNameChanger from './fileNameChanger.js';

const pageLoader = (url, dirpath) => {
  const fileName = fileNameChanger(url);
  const absolutePath = path.resolve(dirpath, fileName);
  return axios.get(url)
    .then((response) => fs.writeFile(absolutePath, `${response.data}`))
    .then(() => absolutePath);
};

export default pageLoader;
