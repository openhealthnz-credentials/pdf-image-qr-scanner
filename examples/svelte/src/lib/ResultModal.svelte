<script lang="ts">
  import { BarLoader } from 'svelte-loading-spinners'

  export let message: Promise<Response>

  let api_result:
    | {
        details: ParsedApcCert | null
        status: string
      }
    | {
        error: string
      }
    | null = null
  message
    .then((response) => response.json())
    .then((json) => {
      api_result = json
    })

  interface ParsedApcCert {
    registrationNumber: string
    hpiCpnID: string
    fullName: string
    issueDate: Date
    expiryDate: Date
    practiceScope: string
    conditions: string | null
  }
</script>

<div class="container">
  {#if api_result !== null}
    {#if 'error' in api_result}
      <div class="error-message">
        {api_result.error}
      </div>
    {:else if api_result.details !== null}
      <table>
        <tr>
          <th> key </th>
          <th> value </th>
        </tr>
        {#each Object.keys(api_result.details) as key}
          <tr>
            <td>{key}</td>
            <td>{api_result.details[key]}</td>
          </tr>
        {/each}
      </table>
    {:else}
      <div class="error-message">
        Certificate did not match any known Physioboard APC certificates. Make sure you
        upload the original APC certificate that was sent to you electronically.
      </div>
    {/if}
  {:else}
    <!-- Still Loading -->
    <div class="loading-wrapper">
      <BarLoader color="#5dbb65" duration="1.1s" />
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    table {
      border-spacing: 0;
      $table-border-color: rgb(58, 58, 58);

      tr {
        th {
          text-align: left;
          background-color: #efefef;
        }
        th,
        td {
          padding: 5px;
          border-top: 1px solid $table-border-color;
        }
        &:nth-child(odd) {
          background-color: rgb(245, 245, 245);
        }

        td:nth-child(even) {
          text-transform: capitalize;
        }
      }
      border-bottom: 1px solid $table-border-color;
      border-left: 1px solid $table-border-color;
      border-right: 1px solid $table-border-color;
    }
    .error-message {
      padding: 1rem;
    }

    .loading-wrapper {
      margin: 2rem 1rem;
    }
  }
</style>
