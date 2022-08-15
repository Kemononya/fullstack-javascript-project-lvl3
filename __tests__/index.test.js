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

const url = 'https://page-loader.hexlet.repl.co';
const expectedFileName = 'page-loader-hexlet-repl-co.html';

let expectedAbsolutePath;
let tmpPathToDir;
let expectedData;

beforeAll(async () => {
  expectedData = await fs.readFile(getFixturePath('response.html'), 'utf-8');
});

beforeEach(async () => {
  tmpPathToDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader'));
  expectedAbsolutePath = tmpPathToDir.concat('/', expectedFileName);
});

test('isCorrectPath', async () => {
  nock(url)
    .get('/')
    .reply(200, expectedData);

  const actualPath = await pageLoader(url, tmpPathToDir);
  expect(actualPath).toEqual(expectedAbsolutePath);
});

test('mainflow', async () => {
  nock(url)
    .get('/')
    .reply(200, expectedData);

  await pageLoader(url, tmpPathToDir);
  const data = await fs.readFile(expectedAbsolutePath, 'utf-8');
  expect(data).toEqual(expectedData);
});
