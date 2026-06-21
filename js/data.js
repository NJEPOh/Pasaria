document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Beranda
    const productContainer = document.getElementById('product-container');
    if (productContainer) {
        loadLandingPageData();
    }

    // 2. Inisialisasi Detail
    const detailContainer = document.getElementById('product-detail-container');
    if (detailContainer) {
        loadDetailPageData();
    }
});

// ==========================================
// FUNGSI HOME: Menampilkan 30 Produk
// ==========================================
async function loadLandingPageData() {
    try {
        const response = await fetch('data/db.json');
        const data = await response.json();

        // Render Kategori
        renderCategories(data.categories);

        // Render Katalog (30 Produk)
        renderProducts(data.products, data.stores);
    } catch (error) {
        console.error("Gagal memuat Home:", error);
    }
}

function renderProducts(products, stores) {
    const container = document.getElementById('product-container');
    let html = '';

    // Perulangan untuk 30 item
    for (let i = 0; i < 30; i++) {
        const product = products[i % products.length];
        const store = stores.find(s => s.id === product.store_id) || { city: 'Jakarta' };

        const formatPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(product.price);

        html += `
            <a href="detail.html?id=${product.id}" class="product-card">
                <img src="https://placehold.co/400x400/E7E1F7/1D0251?text=Produk" class="product-image">
                <div class="product-info">
                    <div class="product-title">${product.product_name}</div>
                    <div class="product-price">${formatPrice}</div>
                    <div class="product-location">📍 ${store.city}</div>
                </div>
            </a>
        `;
    }
    container.innerHTML = html;
}

// ==========================================
// FUNGSI DETAIL: Menampilkan 1 Produk
// ==========================================
async function loadDetailPageData() {
    try {
        const response = await fetch('data/db.json');
        const data = await response.json();

        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = data.products.find(p => p.id === productId);

        if (product) {
            renderProductDetail(product);
        } else {
            document.getElementById('product-detail-container').innerHTML = "<h3>Produk tidak ditemukan</h3>";
        }
    } catch (error) {
        console.error("Gagal memuat Detail:", error);
    }
}

function renderProductDetail(product) {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    // 1. Format harga dengan aman
    const formatPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(product.price || 0);

    // 2. Gunakan fallback jika deskripsi tidak ada
    const desc = product.description || "Deskripsi produk tidak tersedia.";

    // 3. Render utuh dengan template literal yang bersih
    container.innerHTML = `
        <div class="detail-image-wrapper">
            <img src="https://placehold.co/600x600/E7E1F7/1D0251?text=Produk" alt="${product.product_name}">
        </div>

        <div class="detail-info">
            <h1 class="detail-title">${product.product_name || 'Tanpa Nama'}</h1>
            <div class="detail-stats">
                <span class="star">★</span> ${product.rating_avg || 0} | ${product.total_sales || 0}+ terjual
            </div>
            
            <div class="detail-price">${formatPrice}</div>

            <div style="margin-top: 16px;">
                <p style="font-weight: 600; margin-bottom: 8px;">Pilih varian:</p>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);">PROMO</button>
                    <button class="btn btn-outline" style="border-color: var(--border-default); color: var(--text-primary);">GAK PROMO</button>
                </div>
            </div>

            <div class="detail-tabs">
                <div class="detail-tab active">Detail</div>
                <div class="detail-tab">Spesifikasi</div>
            </div>
            
            <div class="detail-description">
                <p><strong>Berat:</strong> ${product.weight || 0} gram</p>
                <p>${desc}</p>
            </div>
        </div>

        <div>
            <div class="card-flat action-panel">
                <h3>Atur jumlah dan catatan</h3>
                <div class="quantity-selector">
                    <div class="qty-controls">
                        <button class="qty-btn" type="button">-</button>
                        <input type="text" value="1" class="qty-input" readonly>
                        <button class="qty-btn" type="button">+</button>
                    </div>
                    <div class="stock-info">Stok: <strong>${product.stock || 0}</strong></div>
                </div>
                <div class="subtotal">
                    <span class="subtotal-label">Subtotal</span>
                    <span class="subtotal-value">${formatPrice}</span>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary">+ Keranjang</button>
                    <button class="btn btn-outline">Beli Langsung</button>
                </div>
            </div>
        </div>
    `;
}

function renderCategories(categories) {
    const container = document.getElementById('category-container');
    if (!container) return;
    container.innerHTML = categories.map(cat => `<div class="category-item">${cat.category_name}</div>`).join('');
}