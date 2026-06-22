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
// FUNGSI HOME: Menampilkan Kategori & 30 Produk
// ==========================================
async function loadLandingPageData() {
    try {
        const response = await fetch('data/db.json');
        const data = await response.json();

        // Render Kategori dan Produk
        renderCategories(data.categories);
        renderProducts(data.products, data.stores);
    } catch (error) {
        console.error("Gagal memuat Home:", error);
    }
}

function renderCategories(categories) {
    const container = document.getElementById('category-container');
    if (!container) return;

    // Icon dummy sederhana
    const icons = ['🛍️', '👕', '📱', '🎮', '🧸', '📚'];

    let html = '';
    categories.forEach((cat, index) => {
        html += `
            <div class="category-item">
                <div class="category-icon">${icons[index % icons.length]}</div>
                <div class="category-name">${cat.category_name}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderProducts(products, stores) {
    const container = document.getElementById('product-container');
    if (!container) return;

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
                <img src="https://placehold.co/400x400/E7E1F7/1D0251?text=Produk+${i + 1}" class="product-image" alt="${product.product_name}">
                <div class="product-info">
                    <div class="product-title">${product.product_name}</div>
                    <div class="product-price">${formatPrice}</div>
                    <div class="product-location">📍 ${store.city}</div>
                    <div class="product-stats" style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                        <span class="star" style="color: var(--status-warning);">★</span> ${product.rating_avg} | Terjual ${product.total_sales}
                    </div>
                </div>
            </a>
        `;
    }
    container.innerHTML = html;
}

// ==========================================
// FUNGSI DETAIL: Menampilkan 1 Produk & Rekomendasi
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
            // Panggil fungsi render produk terkait di sini
            renderRelatedProducts(data.products, data.stores);
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

    const formatPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(product.price || 0);

    const desc = product.description || "Deskripsi produk tidak tersedia.";

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
                    <button class="btn btn-primary" type="button" onclick="window.location.href='keranjang.html'">+ Keranjang</button>
                    <button class="btn btn-outline" type="button" onclick="window.location.href='checkout.html'">Beli Langsung</button>
                </div>
            </div>
        </div>
    `;
}

function renderRelatedProducts(products, stores) {
    const container = document.getElementById('related-product-container');
    if (!container) return;

    let html = '';

    // Tampilkan 10 produk saja untuk bagian rekomendasi
    for (let i = 0; i < 10; i++) {
        const product = products[i % products.length];
        const store = stores.find(s => s.id === product.store_id) || { city: 'Jakarta' };

        const formatPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(product.price);

        html += `
            <a href="detail.html?id=${product.id}" class="product-card">
                <img src="https://placehold.co/400x400/E7E1F7/1D0251?text=Rekomendasi+${i + 1}" class="product-image">
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