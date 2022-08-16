#!/usr/bin/env node
import { Command } from 'commander';
import pageLoader from '../src/index.js';

const program = new Command();

program
  .description('Page loader utility')
  .version('0.1.0')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .arguments('<url>')
  .action((url) => {
    pageLoader(url, `${program.opts().output}`)
      .then((message) => console.log(message));
  })
  .parse();
