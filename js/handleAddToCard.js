// Add this script after your other JS code

let cart = [];

function handleAddToCart(productId) {
    // Find product by id
    const product = products.find(p => p.id == productId);
    if (!product) {
        alert('Product not found!');
        return;
    }

    // Check if already in cart
    const exists = cart.find(item => item.id == productId);
    if (exists) {
        alert('Product already in cart!');
        return;
    }

    cart.push(product);

    // Update cart count badge
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    //alert((currentLanguage === 'en' ? 'Added to cart!' : 'បានបន្ថែមទៅកន្ត្រក!'));
}