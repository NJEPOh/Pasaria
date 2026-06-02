<script>
  import Navbar from "./lib/components/Navbar.svelte";
  import BannerCarousel from "./lib/components/BannerCarousel.svelte";
  import Category from "./lib/components/Category.svelte";
  import ProductCard from "./lib/components/ProductCard.svelte";
  import Footer from "./lib/components/Footer.svelte";

  import { products } from "./lib/data/products.js";
</script>

<Navbar />

<main>
  <BannerCarousel />

  <Category />

  <section class="products">
    <h2>Produk Terlaris</h2>

    <div class="product-grid">
      {#each products as product}
        <ProductCard {product} />
      {/each}
    </div>
  </section>
</main>

<Footer />

<style>
  main {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
  }

  .products {
    margin-top: 40px;
  }

  .products h2 {
    margin-bottom: 20px;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
</style>
