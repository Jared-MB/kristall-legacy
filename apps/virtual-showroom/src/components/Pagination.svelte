<script lang="ts">
  import type { PublicProduct } from "@kristall/core/products/interfaces/products.interface.d";
  import type { Pagination } from "@kristall/http/interfaces";

  import { page as pg } from "$app/state";
  import { cn } from "$lib";

  import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
  } from "lucide-svelte";

  let {
    page,
    totalPages,
    hasMore,
  }: Omit<Pagination<PublicProduct>, "entities"> = $props();

  let paginate = (page: number) => {
    const params = new URLSearchParams(pg.url.searchParams);
    params.set("page", page.toString());
    return params.toString();
  };
</script>

<div class="flex justify-between items-center gap-4 p-4">
  <div class="flex gap-2 items-center">
    <a
      href={`/products?${paginate(1)}`}
      aria-disabled={page === 1}
      class={cn(page === 1 && "opacity-50 pointer-events-none")}
    >
      <ChevronsLeft />
    </a>
    <a
      href={`/products?${paginate(page > 1 ? page - 1 : 1)}`}
      class={cn(page === 1 && "opacity-50 pointer-events-none")}
      aria-disabled={page === 1}
    >
      <ChevronLeft />
    </a>
  </div>
  <div class="flex gap-2 items-center">
    <span>Página</span>
    <span>{page}</span>
    <span>de</span>
    <span>{totalPages}</span>
  </div>
  <div class="flex gap-2 items-center">
    <a
      href={`/products?${paginate(hasMore ? page + 1 : page)}`}
      class={cn(!hasMore && "opacity-50 pointer-events-none")}
      aria-disabled={!hasMore}
    >
      <ChevronRight />
    </a>
    <a
      href={`/products?${paginate(totalPages)}`}
      class={cn(!hasMore && "opacity-50 pointer-events-none")}
      aria-disabled={!hasMore}
    >
      <ChevronsRight />
    </a>
  </div>
</div>
