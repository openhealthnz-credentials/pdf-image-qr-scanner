import React, { useRef, useState } from "react";

import "./App.css";

import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";
import ImageUploader from "./components/FileUploader";

function App() {
	const [resultText, setResultText] = useState("");

	async function processFile(selectedFile) {
		setResultText("");
		try {
			const qrCode = await scanFile(selectedFile);
			// It returns null if no QR code is found
			setResultText(qrCode || "No QR code found");
		} catch (e) {
			// Example Error Handling
			if (e?.name === "InvalidPDFException") {
				setResultText("Invalid PDF");
			} else if (e instanceof Event) {
				setResultText("Invalid Image");
			} else {
				console.log(e);
				setResultText("Unknown error");
			}
		}
	}

	return (
		<div className="App">
			<header className="App-header">React File QR Scanner</header>
			<ImageUploader
				onFileSelectError={(err) => {
					console.log(err);
					setResultText(err.error);
				}}
				onFileSelectSuccess={(file) => {
					processFile(file);
				}}
			/>
			<span
				style={{
					height: "40vh",
					width: "50vw",
					fontSize: "0.8rem",
					overflowWrap: "anywhere",
					overflow: "auto",
					border: "white solid 1px",
				}}
			>
				{resultText}
			</span>
		</div>
	);
}

export default App;
