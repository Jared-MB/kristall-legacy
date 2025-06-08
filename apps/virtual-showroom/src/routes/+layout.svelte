<script lang="ts">
  import {
    generateTonesFromRGB,
    hexToRGB,
    rgbToHex,
  } from "@kristall/core/utils/colors";

  import "@fontsource-variable/quicksand";
  import "@fontsource/aboreto";
  import "../app.css";

  let { children, data } = $props();

  const { virtualShowroomConfig } = data;
  const tones = generateTonesFromRGB(
    hexToRGB(virtualShowroomConfig?.customColor ?? "#000000")
  );

  const customStyle = [
    `--vs-custom-500: ${rgbToHex(tones["500"])};`,
    `--vs-custom-400: ${rgbToHex(tones["400"])};`,
    `--vs-custom-300: ${rgbToHex(tones["300"])};`,
    `--vs-custom-200: ${rgbToHex(tones["200"])};`,
    `--vs-custom-100: ${rgbToHex(tones["100"])};`,
  ];
</script>

<svelte:head>
  <link rel="icon" type="image" href={data?.image ?? "/favicon.svg"} />
  <title>{data.host}</title>
</svelte:head>
<div style={customStyle.join(" ")}>
  <main class="min-h-dvh flex flex-col relative">
    {@render children()}
  </main>
  <footer class="p-6">
    <small class="text-sm"
      >Powered by <a
        class="text-purple-500"
        href="https://kristall.app"
        target="_blank"
        rel="noopener noreferrer">Kristall</a
      >
    </small>
  </footer>
</div>
