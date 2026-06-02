<script>
    export let product;

    function formatPrice(price) {
        return new Intl.NumberFormat("id-ID").format(price);
    }
</script>

<div class="card">
    <img src={product.image} alt={product.name} />

    <div class="content">
        <h4>{product.name}</h4>

        <div class="price">
            Rp {formatPrice(product.price)}
        </div>

        <div class="rating">
            ⭐ {product.rating}
        </div>
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
</style>
