<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { SearchIcon } from "lucide-svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  let form: HTMLFormElement;

  const params = new SvelteURLSearchParams();
  let search = $state(page.url.searchParams.get("name") ?? "");

  let searchProduct = (e: SubmitEvent) => {
    e.preventDefault();

    if (search.length > 0) {
      params.set("name", search);
    } else {
      params.delete("name");
    }

    goto(`/products?${params.toString()}`, { replaceState: true });
  };
</script>

<form
  bind:this={form}
  onsubmit={searchProduct}
  class="w-[280px] border h-10 border-input bg-background flex items-center justify-start gap-x-2 px-3 py-2 has-focus:outline-none rounded-md has-focus:ring-offset-background has-focus:ring-2 has-focus:ring-ring has-focus:ring-offset-1"
>
  <SearchIcon onclick={() => form.requestSubmit()} />
  <input
    bind:value={search}
    placeholder="Buscar..."
    class="flex w-full h-full bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
  />
</form>
