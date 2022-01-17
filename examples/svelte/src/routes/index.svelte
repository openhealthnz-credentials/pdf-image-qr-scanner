<script lang="ts">
  import { getContext } from 'svelte'
  import ResultModal from '$lib/ResultModal.svelte'
  import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";

  // Temporary, till AWS Lambda's are implemented


  async function scanFiles(uploadEvent: Event) {
    let inputElement = uploadEvent.target as HTMLInputElement;

    let uploadedFile: File = inputElement.files[0];
    if (uploadedFile) {
      // Reset it, so it can be re-run with the same file
      inputElement.value = '';

      showResultModal(scanFile(uploadedFile))
    }
  }

  // Modal to show PDF results
  const { open } = getContext('simple-modal')
  const showResultModal = (data: Promise<string | null>) => {
    open(ResultModal, { message: data })
  }
</script>

<div class="primary-container">
  <h1>PDF/Image QR Scanner</h1>
  <!-- File Input  -->
  <div class="form-group">
    <label for="file" class="file-uploader">
      Upload PDF
      <input
        type="file"
        id="file"
        name="file"
        accept=".pdf,.png,.jpg,.jpeg"
        on:change={(e) => {
          console.log(e)
          scanFiles(e)
        }}
        
      />
    </label>
  </div>
</div>

<style lang="scss">
  .primary-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    background: linear-gradient(167deg, rgba(255,250,227,1) 0%, rgba(234,252,211,1) 66%, rgba(212,255,201,1) 100%);

    h1 {
      font-size: 3.5rem;
      margin-bottom: 3rem;
    }

    input[type='file'] {
      display: none;
    }
    .file-uploader {
      font-size: 1.75rem;
      border: 1px solid #ccc;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      transition: all 100ms ease-in-out;
      border-radius: 2px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.041);
      }
      &:active {
        background-color: rgba(0, 0, 0, 0.24);
      }
    }
  }
</style>
