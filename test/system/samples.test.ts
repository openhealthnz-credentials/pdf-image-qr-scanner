import * as fs from 'fs';

import test from 'ava';

import { scanFile } from '../../src/index';
import '../_setup-browser-env.ts';

console.log('asdasd');

test('simple-qr-image', async (t) => {
	const fileBuffer = new Uint8Array(fs.readFileSync('./test/resources/simple-qr-image.png')).buffer;
	const fileBlob = new Blob([fileBuffer], { type: 'image/png' });

	const file = new File([fileBlob], 'simple-qr-image.png', { type: 'image/png' });

	// expect(scanFile(file)).resolves.toBe("Hello");
	t.is(await scanFile(file), 'Hello');
});
