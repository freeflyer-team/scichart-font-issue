<script lang="ts">
  import { getFontUrl } from "./getFontUrl.ts";

  function handleClick(): void {
    console.log(getFontUrl("fonts/Roboto-Regular.ttf"));
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  button {
    width: fit-content;
  }
</style>

<main>
  <button onclick={handleClick}>Get Font URL</button>
</main>
