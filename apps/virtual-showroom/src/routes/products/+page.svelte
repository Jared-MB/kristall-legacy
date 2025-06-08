<script lang="ts">
  import type { PublicProduct } from "@kristall/core/interfaces/products";

  import Categories from "../../components/Categories.svelte";
  import Header from "../../components/Header.svelte";
  import Pagination from "../../components/Pagination.svelte";
  import Product from "../../components/Product.svelte";
  import Search from "../../components/Search.svelte";

  let { data } = $props();

  let [columnOne, columnTwo, columnThree, columnFour] = $derived.by(() => {
    const columnOne: PublicProduct[] = [];
    const columnTwo: PublicProduct[] = [];
    const columnThree: PublicProduct[] = [];
    const columnFour: PublicProduct[] = [];

    data.products?.entities.forEach((product, index) => {
      if (index % 4 === 0) {
        columnOne.push(product);
      } else if (index % 4 === 1) {
        columnTwo.push(product);
      } else if (index % 4 === 2) {
        columnThree.push(product);
      } else if (index % 4 === 3) {
        columnFour.push(product);
      }
    });

    return [columnOne, columnTwo, columnThree, columnFour];
  });

  let pagination = $derived.by(() => {
    const {
      products: { entities, ...pagination },
    } = data;
    return pagination;
  });
</script>

<Header
  shopName={data.host}
  className="sticky top-0 bg-white/70 backdrop-blur-lg z-10"
>
  <div class="flex items-center justify-between gap-4 p-4">
    <Categories categories={data.categories} />
    <Search />
  </div>
</Header>
<div class="grid grid-cols-[20dvw_auto]">
  <aside class="h-[calc(100dvh-5rem)] sticky top-20">Filter</aside>
  <div>
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <div class="flex flex-col gap-4">
        {#each columnOne as product}
          <Product {product} />
        {/each}
      </div>
      <div class="flex flex-col gap-4">
        {#each columnTwo as product}
          <Product {product} />
        {/each}
      </div>
      <div class="flex flex-col gap-4">
        {#each columnThree as product}
          <Product {product} />
        {/each}
      </div>
      <div class="flex flex-col gap-4">
        {#each columnFour as product}
          <Product {product} />
        {/each}
      </div>
    </section>
    <footer class="p-4 grid place-items-center">
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        hasMore={pagination.hasMore}
        next={pagination.next}
        previous={pagination.previous}
      />
    </footer>
  </div>
</div>
