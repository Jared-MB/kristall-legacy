<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import * as Select from "$lib/components/ui/select";
  import type { Category } from "@kristall/core/interfaces/categories";

  let { categories }: { categories: Category[] } = $props();

  let value = $state("");

  const DEFAULT_CATEGORY_NAME = "Categoría";

  const triggerContent = $derived(
    categories.find((c) => c._id === value)?.name ?? DEFAULT_CATEGORY_NAME
  );

  $effect(() => {
    const params = new URLSearchParams(page.url.searchParams);
    if (triggerContent && triggerContent !== DEFAULT_CATEGORY_NAME) {
      params.set("category", triggerContent);
    } else {
      params.delete("category");
    }

    goto(`/products?${params.toString()}`, { replaceState: true });
  });
</script>

<Select.Root type="single" bind:value>
  <Select.Trigger class="w-[180px]" placeholder="Categoría"
    >{triggerContent}</Select.Trigger
  >
  <Select.Content>
    {#each categories as category}
      <Select.Item value={category._id}>{category.name}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
