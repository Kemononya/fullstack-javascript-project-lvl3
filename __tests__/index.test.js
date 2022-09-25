import {
  test, expect, beforeAll, beforeEach,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import nock from 'nock';
import os from 'os';
import fs from 'fs/promises';
import path from 'path';
import pageLoader from '../src/index.js';

nock.disableNetConnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let expectedAbsolutePath;
let tmpPathToDir;
let response;
let image;
let expectedData;

beforeAll(async () => {
  response = await fs.readFile(getFixturePath('response.html'), 'utf-8');
  image = await fs.readFile(getFixturePath('nodejs.png'));
  expectedData = await fs.readFile(getFixturePath('result.html'), 'utf-8');
});

beforeEach(async () => {
  tmpPathToDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader'));
  expectedAbsolutePath = `${tmpPathToDir}/ru-hexlet-io-courses.html`;
});

test('mainflow', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, response);
  nock('https://ru.hexlet.io')
    .get('/assets/professions/nodejs.png')
    .reply(200, image);

  await pageLoader('https://ru.hexlet.io/courses', tmpPathToDir);
  const data = await fs.readFile(expectedAbsolutePath, 'utf-8');
  expect(data).toEqual(expectedData);
});

test('isCorrectPath', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, response);
  nock('https://ru.hexlet.io')
    .get('/assets/professions/nodejs.png')
    .reply(200, image);

  const actualPath = await pageLoader('https://ru.hexlet.io/courses', tmpPathToDir);
  expect(actualPath).toEqual(expectedAbsolutePath);
});
