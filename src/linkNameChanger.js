import path from 'path';
import fileNameChanger from './fileNameChanger.js';

export default (link) => {
  const fullPath = path.parse(link);
  const fileName = `${fullPath.dir}/${fullPath.name}`;
  return `${fileNameChanger(new URL(fileName))}${fullPath.ext}`;
};
