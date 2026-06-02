<nav class="navbar">
    <div class="brand">
        <div class="logo">P</div>
        <span class="name">Pasaria</span>
    </div>

    <input placeholder="Cari produk UMKM Indonesia..." class="search" />

    <div class="actions">
        <button>🛒</button>
        <button>🔔</button>
        <button>💬</button>
        <button>🏪</button>
        <button>👤</button>
    </div>
</nav>

<style>
    .navbar {
        position: sticky;
        top: 0;
        z-index: 100;

        height: 72px;
        display: flex;
        align-items: center;
        gap: 20px;

        padding: 0 24px;

        background: white;
        border-bottom: 1px solid #e5e7eb;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .logo {
        width: 44px;
        height: 44px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 12px;

        background: #1d0251;
        color: white;
        font-weight: bold;
        font-size: 20px;
    }

    .name {
        font-size: 20px;
        font-weight: 700;
        color: #1d0251;
    }

    .search {
        flex: 1;

        height: 48px;

        border: 1px solid #e5e7eb;
        border-radius: 999px;

        padding: 0 20px;

        outline: none;
    }

    .search:focus {
        border-color: #019081;
    }

    .actions {
        display: flex;
        gap: 10px;
    }

    .actions button {
        width: 42px;
        height: 42px;

        border: none;
        border-radius: 10px;

        background: #f3f4f6;

        cursor: pointer;
    }

    .actions button:hover {
        background: #e5e7eb;
    }
</style>
