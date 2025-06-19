const btn = document.getElementById("btn");
const Input = document.getElementById("input");
const productList = document.getElementById("product-list");
const sortPrice = document.getElementById("sort-price");
const sortRating = document.getElementById("sort-rating");

const tempurl = "https://dummyjson.com/products/search?q=";
let currentProducts = [];

function renderProducts(products) {
    productList.innerHTML = "";
    if (!products || products.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
        return;
    }
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.style.border = '1px solid #ccc';
        productDiv.style.margin = '10px';
        productDiv.style.padding = '10px';
        productDiv.style.display = 'flex';
        productDiv.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = product.thumbnail || '';
        img.alt = product.title;
        img.style.width = '80px';
        img.style.height = '80px';
        img.style.objectFit = 'cover';
        img.style.marginRight = '15px';

        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `<strong>${product.title}</strong><br>Price: $${product.price}<br>Rating: ${product.rating}`;

        productDiv.appendChild(img);
        productDiv.appendChild(infoDiv);
        productList.appendChild(productDiv);
    });
}

function sortAndRender() {
    let sorted = [...currentProducts];
    if (sortPrice.value) {
        sorted.sort((a, b) => sortPrice.value === 'asc' ? a.price - b.price : b.price - a.price);
    }
    if (sortRating.value) {
        sorted.sort((a, b) => sortRating.value === 'asc' ? a.rating - b.rating : b.rating - a.rating);
    }
    renderProducts(sorted);
}

btn.addEventListener("click", () => {
    const query = Input.value.trim();
    productList.innerHTML = "";
    if (!query) {
        alert("Search field cannot be empty.");
        return;
    }
    const URL = tempurl + encodeURIComponent(query);
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            currentProducts = data.products || [];
            sortAndRender();
        })
        .catch(() => {
            productList.innerHTML = '<p>Error fetching products.</p>';
        });
});

sortPrice.addEventListener('change', sortAndRender);
sortRating.addEventListener('change', sortAndRender); 