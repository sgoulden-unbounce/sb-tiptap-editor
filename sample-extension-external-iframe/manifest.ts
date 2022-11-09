import type { Manifest } from 'smart-builder-sdk';

const manifest: Manifest = {
  appId: '@external/helloAgainWorld',
  version: '0.1',
  type: 'enhancement',
  name: 'Hello World',
  isBeta: true,
  isSwappable: true,
  description: 'Hello World example',
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HelloWorld.svg',
  moreInfoUrl: 'https://en.wikipedia.org/wiki/%22Hello,_World!%22_program',
  categories: [],
  externalScripts: ['http://localhost:8081/index.js'],
};

export default manifest;
