<script>
    import { selectedProduct } from "../stores/product.js";

    export let product;

    function formatPrice(price) {
        return new Intl.NumberFormat("id-ID").format(price);
    }

    function showDetail() {
        selectedProduct.set(product);
    }
</script>

<div class="card">
    <img src={product.image} alt={product.name} />

    <div class="content">
        <h4>{product.name}</h4>

        <div class="city">
            📍 {product.city}
        </div>

        <div class="price">
            Rp {formatPrice(product.price)}
        </div>

        <div class="rating">
            ⭐ {product.rating}
        </div>

        <button class="detail-btn" on:click={showDetail}>
            Lihat Detail
        </button>
    </div>
</div>

<style>
    .card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 16px;

        overflow: hidden;

        transition: 0.2s;
        cursor: pointer;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }

    img {
        width: 100%;
        height: 220px;
        object-fit: cover;
    }

    .content {
        padding: 16px;
    }

    h4 {
        margin: 0;
        margin-bottom: 12px;

        font-size: 16px;
        line-height: 1.4;
    }

    .price {
        color: #1d0251;
        font-weight: 700;
        font-size: 18px;

        margin-bottom: 8px;
    }

    .rating {
        color: #666;
        font-size: 14px;
    }

    .city {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
    }

    .detail-btn {
        width: 100%;

        margin-top: 12px;
        padding: 10px;

        border: none;
        border-radius: 10px;

        background: #1d0251;
        color: white;

        font-weight: 600;
        cursor: pointer;

        transition: 0.2s;
    }

    .detail-btn:hover {
        background: #16013d;
    }
</style>
