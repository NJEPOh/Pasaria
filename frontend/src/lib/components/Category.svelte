<script>
    let categories = [
        "Makanan",
        "Minuman",
        "Fashion",
        "Kerajinan",
        "Elektronik",
        "Pertanian",
    ];
</script>

<section class="categories">
    <h2>Kategori</h2>

    <div class="grid">
        {#each categories as category}
            <div class="card">
                {category}
            </div>
        {/each}
    </div>
</section>

<style>
    .categories {
        margin-top: 40px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 16px;
    }

    .card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 16px;

        padding: 20px;
        text-align: center;

        cursor: pointer;
        transition: 0.2s;
    }

    .card:hover {
        transform: translateY(-3px);
        border-color: #019081;
    }
</style>
