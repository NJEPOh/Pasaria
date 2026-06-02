<script>
    import { cart } from "../stores/cart.js";
    import { cartOpen } from "../stores/ui.js";

    function formatPrice(price) {
        return new Intl.NumberFormat("id-ID").format(price);
    }

    $: total = $cart.reduce((sum, item) => sum + item.price, 0);
</script>

{#if $cartOpen}
    <div class="overlay" onclick={() => cartOpen.set(false)}>
        <div class="drawer" onclick={(e) => e.stopPropagation()}>
            <h2>Keranjang</h2>

            {#if $cart.length === 0}
                <p>Keranjang masih kosong</p>
            {:else}
                {#each $cart as item}
                    <div class="item">
                        <img src={item.image} alt={item.name} />

                        <div>
                            <h4>{item.name}</h4>

                            <p>
                                Rp {formatPrice(item.price)}
                            </p>
                        </div>
                    </div>
                {/each}

                <div class="total">
                    Total: Rp {formatPrice(total)}
                </div>

                <button class="checkout"> Checkout </button>
            {/if}
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        inset: 0;

        background: rgba(0, 0, 0, 0.4);

        z-index: 999;
    }

    .drawer {
        position: absolute;

        right: 0;
        top: 0;

        width: 400px;
        max-width: 90vw;

        height: 100%;

        background: white;

        padding: 24px;

        overflow: auto;
    }

    .item {
        display: flex;
        gap: 12px;

        margin-bottom: 16px;
    }

    .item img {
        width: 70px;
        height: 70px;

        object-fit: cover;
        border-radius: 10px;
    }

    .total {
        margin-top: 24px;

        font-size: 20px;
        font-weight: bold;
    }

    .checkout {
        width: 100%;

        margin-top: 20px;

        padding: 14px;

        border: none;

        border-radius: 12px;

        background: #019081;
        color: white;
    }
</style>
