---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

pdf-image-qr-scanner
Library to scan user-uploaded PDF's or images locally and reliably for QR codes using jsQR.

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [scanFile](#scanfile)

---

# utils

## scanFile

Scan PDF file and return QR code data.

**Signature**

```ts
export async function scanFile(FileHandle: File): Promise<string | null>
```

Added in v0.0.0
