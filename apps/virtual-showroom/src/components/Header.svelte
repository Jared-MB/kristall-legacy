<script lang="ts">
  import { cn } from "$lib";

  interface Props {
    className?: string;
    shopName: string;
    children?: () => any;
  }

  let { className, shopName, children }: Props = $props();
</script>

<header class={cn("h-20 p-6 flex items-center justify-between", className)}>
  <h1 class="text-4xl font-serif text-[var(--vs-custom-400)]">
    <a href="/">{shopName}</a>
  </h1>
  {@render children?.()}
</header>
