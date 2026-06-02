import keripik from '../../assets/products/produk1.jpg'
import batik from '../../assets/products/produk2.jpg'
import kopi from '../../assets/products/produk3.jpg'
import madu from '../../assets/products/produk4.jpg'

export const products = [
    {
        id: 1,
        name: "Keripik Singkong Original",
        city: "Klaten",
        category: "Makanan",
        stock: 120,
        price: 15000,
        rating: 4.8,
        image: keripik
    },

    {
        id: 2,
        name: "Batik Klaten",
        city: "Klaten",
        category: "Fashion",
        stock: 80,
        price: 120000,
        rating: 4.9,
        image: batik
    },

    {
        id: 3,
        name: "Kopi Robusta",
        city: "Klaten",
        category: "Minuman",
        stock: 150,
        price: 45000,
        rating: 4.7,
        image: kopi
    },

    {
        id: 4,
        name: "Madu Hutan",
        city: "Klaten",
        category: "Makanan",
        stock: 60,
        price: 80000,
        rating: 4.9,
        image: madu
    }
];