// Handle Buy Button Click (send Telegram alert)

// Show a modal/card for customer info input instead of prompt
function handleBuy(productId) {
    // Check if products is defined and is an array
    if (!Array.isArray(products)) {
        alert('Products data not loaded!');
        return;
    }

    // Get product from global products array (from simpleData.js)
    const product = products.find(p => p.id == productId);
    if (!product) {
        alert('Product not found!');
        return;
    }

    // Create modal/card HTML
    let modal = document.getElementById('customerInfoModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'customerInfoModal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
            <div style="background:#fff; border-radius:16px; padding:32px; min-width:320px; box-shadow:0 8px 32px rgba(0,0,0,0.2);">
                <h4 style="margin-bottom:16px;">Customer Information</h4>
                <div style="margin-bottom:12px;">
                    <input type="text" id="customerNameInput" class="form-control" placeholder="Your Name" style="margin-bottom:8px;">
                    <input type="text" id="customerPhoneInput" class="form-control" placeholder="Phone Number" style="margin-bottom:8px;">
                    <input type="text" id="customerAddressInput" class="form-control" placeholder="Address" style="margin-bottom:8px;">
                </div>
                <div style="display:flex; gap:12px; justify-content:flex-end;">
                    <button id="cancelOrderBtn" class="btn btn-secondary">Cancel</button>
                    <button id="submitOrderBtn" class="btn btn-primary">Order</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.style.display = 'flex';
    }

    // Cancel button
    document.getElementById('cancelOrderBtn').onclick = function() {
        modal.style.display = 'none';
    };

    // Submit button
    document.getElementById('submitOrderBtn').onclick = function() {
        const customerName = document.getElementById('customerNameInput').value.trim();
        const customerPhone = document.getElementById('customerPhoneInput').value.trim();
        const customerAddress = document.getElementById('customerAddressInput').value.trim();

        if (!customerName || !customerPhone || !customerAddress) {
            alert('Please fill in all fields!');
            return;
        }

        // Phone number must be at least 8 digits
        if (customerPhone.length < 8 || !/^\d+$/.test(customerPhone)) {
            alert('Phone number must be at least 8 digits and contain only numbers!');
            return;
        }

        if (!confirm('Are you sure you want to order this product?')) {
            return;
        }

        // Use current language if available
        const name = typeof currentLanguage !== 'undefined' && currentLanguage === 'kh' ? product.nameKh : product.name;
        const price = product.price ? `$${product.price.toFixed(2)}` : '';

        // Create customer info card (HTML)
        const customerCard = `
            <div style="border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:12px; background:#f8fafc;">
                <h4 style="margin-bottom:8px;">Customer Information</h4>
                <div><strong>Name:</strong> ${customerName}</div>
                <div><strong>Phone:</strong> ${customerPhone}</div>
                <div><strong>Address:</strong> ${customerAddress}</div>
            </div>
        `;

        // Message for Telegram (text only)
        const message = `   🛒 Product Purchased:
📦Name: ${name}
💰Price: ${price}
👤Customer: ${customerName}
📞Phone: ${customerPhone}
🏠Address: ${customerAddress}
📋Category: ${product.category || 'N/A'}
📅Date: ${new Date().toLocaleDateString()}
⏰Time: ${new Date().toLocaleTimeString()}
🗺️Location: ${product.location || 'N/A'}
`;

        const botToken = '7520329190:AAEHj3CAAzXQOYCz4tXmsC8e3X0wtXppteg';
        const chatId = '1544079868';

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        })
        .then(res => res.json())
        .then(data => {
            // Show customer info card after order success
            const container = document.getElementById('productsContainer');
            if (container) {
                container.innerHTML = customerCard + container.innerHTML;
            }
            alert('Order success!');
            modal.style.display = 'none';
            console.log('Telegram alert sent:', data);
        })
        .catch(err => {
            alert('Order failed!');
            modal.style.display = 'none';
            console.error('Telegram error:', err);
        });
    };
}