<script>
    import { selectedProduct } from "../stores/product.js";
    import { cart } from "../stores/cart.js";

    function closeModal() {
        selectedProduct.set(null);
    }

    function formatPrice(price) {
        return new Intl.NumberFormat("id-ID").format(price);
    }

    function addToCart() {
        cart.update((items) => {
            return [...items, $selectedProduct];
        });

        closeModal();
    }
</script>

{#if $selectedProduct}
    <div class="backdrop" onclick={closeModal}>
        <div class="modal" onclick={(e) => e.stopPropagation()}>
            <img src={$selectedProduct.image} alt={$selectedProduct.name} />

            <h2>{$selectedProduct.name}</h2>

            <div class="city">
                📍 {$selectedProduct.city}
            </div>

            <div class="price">
                Rp {formatPrice($selectedProduct.price)}
            </div>

            <div class="rating">
                ⭐ {$selectedProduct.rating}
            </div>

            <button class="buy-btn" onclick={addToCart}>
                Tambah Keranjang
            </button>
        </div>
    </div>
{/if}

<style>
    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;

        z-index: 999;
    }

    .modal {
        width: 500px;
        max-width: 90%;

        background: white;
        border-radius: 20px;

        padding: 24px;
    }

    .modal img {
        width: 100%;
        border-radius: 16px;
        margin-bottom: 20px;
    }

    .price {
        font-size: 28px;
        font-weight: bold;
        color: #1d0251;
        margin: 12px 0;
    }

    .city,
    .rating {
        color: #666;
    }

    .buy-btn {
        width: 100%;
        margin-top: 20px;

        padding: 14px;

        border: none;
        border-radius: 12px;

        background: #019081;
        color: white;

        cursor: pointer;
    }
</style>
