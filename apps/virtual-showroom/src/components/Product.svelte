<script lang="ts">
  import type { PublicProduct } from "@kristall/core/interfaces/products";

  interface Props {
    product: PublicProduct;
  }

  let { product }: Props = $props();
</script>

<article class="h-auto max-w-full rounded-lg flex flex-col gap-1">
  <div class="overflow-hidden rounded-lg">
    <img
      class="h-auto max-w-full hover:scale-105 duration-300"
      src={product?.image?.url ?? "/no-image.svg"}
      alt={product.name}
      loading="lazy"
      onerror={(e) =>
        ((e.currentTarget as HTMLImageElement).src = "/no-image.svg")}
    />
  </div>
  <div>
    <h3 class="font-bold text-lg truncate" title={product.name}>
      {product.name}
    </h3>
    <p class="">${product.price}</p>
  </div>
</article>
