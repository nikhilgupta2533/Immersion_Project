const btn= document.getElementById("btn");
const Input = document.getElementById("input");
const productList = document.getElementById("product-list");

const tempurl = "https://dummyjson.com/products/search?q=";
btn.addEventListener("click", () => {
    const query = Input.value.trim();
    productList.innerHTML = ""; // Clear previous results
    if (!query) {
        alert("Search field cannot be empty.");
        return;
    }
    const URL = tempurl + encodeURIComponent(query);
    fetch(URL)
    .then((res)=> res.json())
    .then((data) => {
        if (!data.products || data.products.length === 0) {
            productList.innerHTML = '<p>No products found.</p>';
            return;
        }
        data.products.forEach(product => {
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
            infoDiv.innerHTML = `<strong>${product.title}</strong><br>Price: $${product.price}`;

            productDiv.appendChild(img);
            productDiv.appendChild(infoDiv);
            productList.appendChild(productDiv);
        });
    })
    .catch(() => {
        productList.innerHTML = '<p>Error fetching products.</p>';
    });
});
