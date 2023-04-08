document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]');
    const filterInput = document.querySelector('#filter-input');
    const searchResults = document.querySelector('#search-results');

    function filterProducts() {
        const checkedBrands = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        products.forEach(product => {
            const brand = product.getAttribute('data-brand');

            if (checkedBrands.length === 0 || checkedBrands.includes(brand)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    function displaySearchResults() {
        searchResults.innerHTML = '';

        if (filterInput.value.trim() !== '') {
            const searchTerm = filterInput.value.trim().toLowerCase();
            const matchedBrands = Array.from(checkboxes)
                .filter(checkbox => checkbox.value.toLowerCase().startsWith(searchTerm))
                .map(checkbox => {
                    const li = document.createElement('li');
                    li.textContent = checkbox.value;
                    li.addEventListener('click', () => {
                        filterInput.value = li.textContent;
                        searchResults.innerHTML = '';
                        filterProducts();
                    });
                    return li;
                });

            matchedBrands.forEach(li => searchResults.appendChild(li));
        }
    }

    checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
    filterInput.addEventListener('input', displaySearchResults);
});

function addToCart(event) {
    const product = event.target.closest('.product');
    const productTitle = product.querySelector('.product-title').textContent;
    const productPrice = parseFloat(product.querySelector('.price').textContent.slice(1));

    const cartItems = document.querySelector('#cart-items');
    const cartItem = cartItems.querySelector(`[data-title="${productTitle}"]`);

    if (cartItem) {
        const cartItemQuantity = cartItem.querySelector('.quantity');
        cartItemQuantity.textContent = parseInt(cartItemQuantity.textContent) + 1;
    } else {
        const newCartItem = document.createElement('div');
        newCartItem.classList.add('cart-item');
        newCartItem.setAttribute('data-title', productTitle);

        const newCartItemContent = `
            <p>${productTitle}</p>
            <p>Quantity: <span class="quantity">1</span></p>
            <p>Price: $<span class="item-price">${productPrice.toFixed(2)}</span></p>
        `;

        newCartItem.innerHTML = newCartItemContent;
        cartItems.appendChild(newCartItem);
    }

    const cartTotal = document.querySelector('#cart-total');
    cartTotal.textContent = `$${(parseFloat(cartTotal.textContent.slice(1)) + productPrice).toFixed(2)}`;
}

const addCartButtons = document.querySelectorAll('.add-cart');
addCartButtons.forEach(button => button.addEventListener('click', addToCart));
