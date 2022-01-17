# pdf-image-qr-scanner

[![License][]](LICENSE)
[![Build Status]](https://github.com/openhealthnz-credentials/pdf-image-qr-scanner/actions/workflows/ci.yml)
[![NPM Package]](https://npmjs.org/package/@openhealthnz-credentials/pdf-image-qr-scanner)
[![semantic-release]](https://github.com/semantic-release/semantic-release)

[license]: https://img.shields.io/badge/MIT-blue.svg
[build status]: https://github.com/openhealthnz-credentials/pdf-image-qr-scanner/actions/workflows/ci.yml/badge.svg
[npm package]: https://img.shields.io/npm/v/@openhealthnz-credentials/pdf-image-qr-scanner.svg
[code coverage]: https://codecov.io/gh/openhealthnz-credentials/pdf-image-qr-scanner/branch/master/graph/badge.svg
[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

> Library to scan user-uploaded PDF's or images locally and reliably for QR codes using jsQR.

## Install

```bash
npm install @openhealthnz-credentials/pdf-image-qr-scanner # or
yarn add @openhealthnz-credentials/pdf-image-qr-scanner
```

## Use

```typescript
import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";
...
try {
    // selectedFile: File (https://developer.mozilla.org/en-US/docs/Web/API/File)
    const qrCode = await scanFile(selectedFile);
    // It returns null if no QR code is found
    console.log(qrCode || "No QR code found");
} catch (e) {
    // Example Error Handling
    if (e?.name === "InvalidPDFException") {
        console.log("Invalid PDF");
    } else if (e instanceof Event) {
        console.log("Invalid Image");
    } else {
        console.log("Unknown error:", e);
    }
}

```

Additional examples available in the the [examples](./examples/) folder.
 - [Svelte Web Demo](https://svelte-pdf-image-scanner.fallstop.workers.dev/): [source code](./examples/svelte)
 - [React Web Demo](https://react-pdf-image-qr-scanner.pages.dev/): [source code](./examples/react)

## TODO:
 - Implement AVA tests with browser polyfills.
