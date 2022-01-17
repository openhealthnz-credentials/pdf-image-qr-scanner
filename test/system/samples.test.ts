// import { readFileSync } from 'fs';

import test from 'ava';

// import { scanFile } from '../../src/index';
// // eslint-disable-next-line import/no-unassigned-import
// import '../_setup-browser-env';

// console.log('asdasd');

// test('simple-qr-image', async (t) => {
// 	const fileBuffer = new Uint8Array(readFileSync('./test/resources/simple-qr-image.png')).buffer;
// 	const fileBlob = new Blob([fileBuffer], { type: 'image/png' });

// 	const file = new File([fileBlob], 'simple-qr-image.png', { type: 'image/png' });

// 	// expect(scanFile(file)).resolves.toBe("Hello");
// 	t.is(await scanFile(file), 'Hello');
// });

test('scanFile Exported', async (t) => {
	const module_exports = await import('../../dist/index.modern.js');
	t.is(typeof module_exports.scanFile, 'function');
});
