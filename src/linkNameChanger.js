import path from 'path';
import fileNameChanger from './fileNameChanger.js';

export default (link) => {
  const fullPath = path.parse(link);
  const fileName = `${fullPath.dir}/${fullPath.name}`;
  const ext = (fullPath.ext === '') ? '.html' : fullPath.ext;
  return `${fileNameChanger(new URL(fileName))}${ext}`;
};
