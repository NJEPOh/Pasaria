<script>
    let banners = [
        {
            title: "Belanja Produk UMKM Indonesia",
            subtitle: "Dukung usaha lokal, temukan produk berkualitas.",
            image: "https://picsum.photos/1200/400?random=1",
        },
        {
            title: "Promo Spesial Pasaria",
            subtitle: "Diskon hingga 50% untuk produk pilihan.",
            image: "https://picsum.photos/1200/400?random=2",
        },
    ];

    let current = 0;

    function nextBanner() {
        current = (current + 1) % banners.length;
    }

    setInterval(nextBanner, 5000);
</script>

<section
    class="banner"
    style="background-image:url('{banners[current].image}')"
>
    <div class="overlay">
        <h1>{banners[current].title}</h1>
        <p>{banners[current].subtitle}</p>

        <button>Belanja Sekarang</button>
    </div>
</section>

<style>
    .banner {
        height: 400px;
        border-radius: 20px;

        background-size: cover;
        background-position: center;

        overflow: hidden;

        margin-top: 20px;
    }

    .overlay {
        width: 100%;
        height: 100%;

        background: linear-gradient(
            rgba(29, 2, 81, 0.75),
            rgba(29, 2, 81, 0.55)
        );

        color: white;

        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 50px;
    }

    h1 {
        font-size: 48px;
        margin-bottom: 10px;
    }

    p {
        font-size: 18px;
        margin-bottom: 20px;
    }

    button {
        width: max-content;

        background: #019081;
        color: white;

        border: none;
        border-radius: 12px;

        padding: 14px 24px;

        cursor: pointer;
        font-weight: 600;
    }

    button:hover {
        background: #01706f;
    }
</style>
