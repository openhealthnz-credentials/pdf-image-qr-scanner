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
import * as moduleExports from '../../dist/index.cjs';

test('scanFile Exported', (t) => {
	t.is(typeof moduleExports.scanFile, 'function');
});
