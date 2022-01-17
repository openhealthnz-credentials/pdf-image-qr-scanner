import browserEnv from 'browser-env';
import { Response } from 'node-fetch';

console.log('asdasd');

browserEnv();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.Response = Response;

console.log('asdasd');
