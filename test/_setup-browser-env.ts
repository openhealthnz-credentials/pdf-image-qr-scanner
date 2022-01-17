import browserEnv from 'browser-env';
import Blob from 'cross-blob';
import { Response } from 'node-fetch';

console.log('asdasd');

browserEnv();

//@ts-ignore
global.Response = Response;

console.log('asdasd');
