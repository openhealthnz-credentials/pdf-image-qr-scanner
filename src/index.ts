/**
 * pdf-image-qr-scanner
 * Library to scan user-uploaded PDF's or images locally and reliably for QR codes using jsQR.
 */

import jsQR from 'jsqr';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf.js';
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

/**
 * Scan PDF file and return QR code data.
 *
 * @param {File} FileHandle - File handle of the PDF/Image file to scan.
 * @returns {Promise<string?>} QR Code Data.
 */

export async function scanFile(FileHandle: File): Promise<string | null> {
	// async read of selected PDF file
	const uploadedFile = new Response(FileHandle);

	if (FileHandle.type === 'application/pdf') {
		// PDF.js is used to parse the PDF file from the typed array.
		const pdfTypedArray = new Uint8Array(await uploadedFile.arrayBuffer());
		const loadedPDF = await getDocument(pdfTypedArray).promise;

		return await renderPDF(loadedPDF);
	} else {
		// It's an image, so we use the canvas to render the image.
		const imageBlob = await uploadedFile.blob();
		return await renderImage(imageBlob);
	}
}

/**
 * Render PDF to canvas, and scans the QR code using the Canvas data.
 * @param {Uint8Array} pdfData PDF data to be scanned.
 * @return {string?} QR code data.
 */

async function renderPDF(pdfTypedArray) {
	let qrResult = null;
	for (let pageToRender = 1; pageToRender <= pdfTypedArray.numPages; pageToRender++) {
		const page = await pdfTypedArray.getPage(pageToRender);

		const canvas = document.createElement('canvas');
		// Simulation of A4 at 300dpi resolution
		canvas.height = 3508;
		canvas.width = 2480;

		const unscaledViewport = page.getViewport({ scale: 1 });

		const scale = Math.min(canvas.height / unscaledViewport.height, canvas.width / unscaledViewport.width);

		const viewport = page.getViewport({ scale });

		const renderContext = {
			canvasContext: canvas.getContext('2d'),
			viewport: viewport,
		};

		await page.render(renderContext).promise;

		// PDF Page is now fully rendered to canvas, so we can now extract the QR code.
		qrResult = extractQRCode(canvas);
		if (qrResult !== null) {
			return qrResult;
		}
	}
	return null;
}

/**
 * Wrapper for new Image() to load image from blob.
 * Needed to make it compatible with Async/Await.
 * @param {Blob} imageBlob
 * @returns {Promise<Image>}
 */

async function generateImageObject(imageBlob: Blob): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = reject;
		image.src = URL.createObjectURL(imageBlob);
	});
}

/**
 * Takes image file, creates Image, then renders it on a canvas, and finally extracts the QRCode data
 * @param {Blob} imageBlob
 * @return {string?} QR code data.
 */
async function renderImage(imageBlob: Blob): Promise<string | null> {
	const image = await generateImageObject(imageBlob);

	const canvas: HTMLCanvasElement = document.createElement('canvas');

	// Try scanning for multiple scales, helps jsQR to find the QR code.
	for (const scale of [0.5, 1, 0.25]) {
		canvas.height = image.height * scale;
		canvas.width = image.width * scale;

		const context = canvas.getContext('2d');
		context.drawImage(image, 0, 0, canvas.width, canvas.height);

		const result = extractQRCode(canvas);
		if (result) {
			return result;
		}
	}
	return null;
}

/**
 * Extracts QR code from canvas.
 * @param {HTMLCanvasElement} canvas Canvas element to extract QR code from.
 * @return {string?} QR code data.
 */

function extractQRCode(canvas): string | null {
	const ctx = canvas.getContext('2d');
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const qrData = jsQR(imageData.data, canvas.width, canvas.height, {
		inversionAttempts: 'attemptBoth',
	});
	return qrData?.data || null;
}
