// Show Cart Modal/Card with Checkout

function showCart() {
    let modal = document.getElementById('cartModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cartModal';
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
        document.body.appendChild(modal);
    }

    // Calculate total
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    // Cart items HTML
    let cartHtml = `
        <div style="background:#fff; border-radius:16px; padding:32px; min-width:320px; max-width:90vw; box-shadow:0 8px 32px rgba(0,0,0,0.2); position:relative;">
            <button id="closeCartBtn" class="btn btn-link" style="position:absolute; top:12px; right:12px; font-size:20px; color:#888; border:none; background:none; padding:0; cursor:pointer;">&times;</button>
            <h4 style="margin-bottom:16px;">${currentLanguage === 'en' ? 'Your Cart' : 'កន្ត្រករបស់អ្នក'}</h4>
            <div style="max-height:400px; overflow-y:auto;">
                ${cart.length === 0 ? 
                    `<div style="color:#888;">${currentLanguage === 'en' ? 'No products in cart.' : 'មិនមានទំនិញក្នុងកន្ត្រកទេ។'}</div>` :
                    cart.map(item => `
                        <div style="border-bottom:1px solid #eee; padding:8px 0;">
                            <strong>${currentLanguage === 'en' ? item.name : item.nameKh}</strong>
                            <span style="float:right;">$${item.price.toFixed(2)}</span>
                        </div>
                    `).join('')
                }
            </div>
            <div style="margin-top:16px;">
                <strong>${currentLanguage === 'en' ? 'Total:' : 'សរុប:'}</strong> $${total.toFixed(2)}
            </div>
            <div style="margin-top:16px; text-align:right;">
                <button id="clearCartBtn" class="btn btn-danger" ${cart.length === 0 ? 'disabled' : ''}>${currentLanguage === 'en' ? 'Clear Cart' : 'សម្អាតកន្ត្រក'}</button>
                <button id="checkoutBtn" class="btn btn-success" ${cart.length === 0 ? 'disabled' : ''}>${currentLanguage === 'en' ? 'Checkout' : 'បង់ប្រាក់'}</button>
            </div>
        </div>
    `;
    modal.innerHTML = cartHtml;
    modal.style.display = 'flex';

    document.getElementById('closeCartBtn').onclick = function() {
        modal.style.display = 'none';
    };
    document.getElementById('clearCartBtn').onclick = function() {
        cart = [];
        document.getElementById('cartCount').textContent = '0';
        modal.style.display = 'none';
    };
    document.getElementById('checkoutBtn').onclick = function() {
        // Simple checkout: ask for customer info and send order to Telegram
        modal.style.display = 'none';
        showCheckoutForm();
    };
}

// Checkout form modal
function showCheckoutForm() {
    let modal = document.getElementById('checkoutModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'checkoutModal';
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
                <h4 style="margin-bottom:16px;">${currentLanguage === 'en' ? 'Checkout' : 'បង់ប្រាក់'}</h4>
                <div style="margin-bottom:12px;">
                    <input type="text" id="checkoutName" class="form-control" placeholder="${currentLanguage === 'en' ? 'Your Name' : 'ឈ្មោះ'}" style="margin-bottom:8px;">
                    <input type="text" id="checkoutPhone" class="form-control" placeholder="${currentLanguage === 'en' ? 'Phone Number' : 'លេខទូរស័ព្ទ'}" style="margin-bottom:8px;">
                    <input type="text" id="checkoutAddress" class="form-control" placeholder="${currentLanguage === 'en' ? 'Address' : 'អាសយដ្ឋាន'}" style="margin-bottom:8px;">
                </div>
                <div style="margin-bottom:16px; text-align:center;">
                    
                    <div>${currentLanguage === 'en' ? 'Scan to pay' : 'ស្កេនដើម្បីបង់ប្រាក់'}</div>
                </div>
                <div style="display:flex; gap:12px; justify-content:flex-end;">
                    <button id="cancelCheckoutBtn" class="btn btn-secondary">${currentLanguage === 'en' ? 'Cancel' : 'បោះបង់'}</button>
                    <button id="submitCheckoutBtn" class="btn btn-success">${currentLanguage === 'en' ? 'Confirm Order' : 'បញ្ជាក់ការបញ្ជាទិញ'}</button>
                    
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.style.display = 'flex';
    }

    document.getElementById('cancelCheckoutBtn').onclick = function() {
        modal.style.display = 'none';
    };

    document.getElementById('submitCheckoutBtn').onclick = function() {
        const name = document.getElementById('checkoutName').value.trim();
        const phone = document.getElementById('checkoutPhone').value.trim();
        const address = document.getElementById('checkoutAddress').value.trim();

        if (!name || !phone || !address) {
            alert(currentLanguage === 'en' ? 'Please fill in all fields!' : 'សូមបំពេញព័ត៌មានទាំងអស់!');
            return;
        }
        if (phone.length < 8 || !/^\d+$/.test(phone)) {
            alert(currentLanguage === 'en' ? 'Phone number must be at least 8 digits and contain only numbers!' : 'លេខទូរស័ព្ទត្រូវមានចំនួនយ៉ាងតិច 8 ខ្ទង់ និងមានតែលេខប៉ុណ្ណោះ!');
            return;
        }

        // Show QR modal after confirm order
        showQRModal(name, phone, address);
        modal.style.display = 'none';
    };

    // Show QR Modal and handle scan success with dynamic PayWay link
    function showQRModal(name, phone, address) {
        let qrModal = document.getElementById('qrModal');
        // Calculate total
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        // Dynamic PayWay link
        const paywayLink = `https://link.payway.com.kh/aba?id=310D84962CF1&code=374390&acc=004325397&amount=${encodeURIComponent(total.toFixed(2))}&dynamic=true`;
        const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(paywayLink)}`;

        if (!qrModal) {
            qrModal = document.createElement('div');
            qrModal.id = 'qrModal';
            qrModal.style.position = 'fixed';
            qrModal.style.top = '0';
            qrModal.style.left = '0';
            qrModal.style.width = '100vw';
            qrModal.style.height = '100vh';
            qrModal.style.background = 'rgba(0,0,0,0.5)';
            qrModal.style.display = 'flex';
            qrModal.style.alignItems = 'center';
            qrModal.style.justifyContent = 'center';
            qrModal.style.zIndex = '9999';
            qrModal.innerHTML = `
                <div style="background:#fff; border-radius:16px; padding:32px; min-width:320px; box-shadow:0 8px 32px rgba(0,0,0,0.2); text-align:center;">
                    <h4 style="margin-bottom:16px;">${currentLanguage === 'en' ? 'Scan to Pay' : 'ស្កេនដើម្បីបង់ប្រាក់'}</h4>
                    <img src="${qrImgUrl}" alt="QR Code" style="margin-bottom:8px;">
                    <div style="margin-bottom:16px;">
                        <a href="${paywayLink}" target="_blank" style="color:#007bff; text-decoration:underline;">
                            ${currentLanguage === 'en' ? 'Or click here to pay with ABA' : 'ឬចុចទីនេះដើម្បីបង់ប្រាក់ជាមួយ ABA'}
                        </a>
                    </div>
                    <div style="margin-bottom:16px;">${currentLanguage === 'en' ? 'Please scan the QR code to complete payment.' : 'សូមស្កេន QR ដើម្បីបង់ប្រាក់។'}</div>
                    <button id="scanDoneBtn" class="btn btn-success" style="margin-top:12px;">${currentLanguage === 'en' ? 'I have scanned' : 'ខ្ញុំបានស្កេនរួច'}</button>
                </div>
            `;
            document.body.appendChild(qrModal);
        } else {
            // Update QR and link if modal already exists
            qrModal.querySelector('img').src = qrImgUrl;
            qrModal.querySelector('a').href = paywayLink;
            qrModal.style.display = 'flex';
        }

        // Only show success if user clicks "I have scanned"
        document.getElementById('scanDoneBtn').onclick = function() {
            qrModal.style.display = 'none';
            sendOrderToTelegram(name, phone, address);
            showAutoAlert(currentLanguage === 'en' ? 'Scan success!' : 'ស្កេនជោគជ័យ!');
        };
    }
}

// Send order to Telegram
function sendOrderToTelegram(name, phone, address) {
    if (cart.length === 0) return;

    const botToken = '7520329190:AAEHj3CAAzXQOYCz4tXmsC8e3X0wtXppteg';
    const chatId = '1544079868';

    let productsList = cart.map(item => 
        `${currentLanguage === 'en' ? item.name : item.nameKh} - $${item.price.toFixed(2)}`
    ).join('\n');

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const message = `🛒 New Order
    👤 Name: ${name}
    📞 Phone: ${phone}
    🏠 Address: ${address}
    ------------------------
    ${productsList}
    ------------------------
    ${currentLanguage === 'en' ? 'Total' : 'សរុប'}: $${total.toFixed(2)}
    📅 Date: ${new Date().toLocaleDateString()}
    ⏰ Time: ${new Date().toLocaleTimeString()}
    `;

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
        alert(currentLanguage === 'en' ? 'Order success!' : 'ការបញ្ជាទិញបានជោគជ័យ!');
        cart = [];
        document.getElementById('cartCount').textContent = '0';
    })
    .catch(err => {
        alert(currentLanguage === 'en' ? 'Order failed!' : 'ការបញ្ជាទិញបរាជ័យ!');
        console.error('Telegram error:', err);
    });
}

// Helper function to show auto alert
function showAutoAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '30px';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)';
    alertDiv.style.background = '#28a745';
    alertDiv.style.color = '#fff';
    alertDiv.style.padding = '12px 32px';
    alertDiv.style.borderRadius = '8px';
    alertDiv.style.fontSize = '18px';
    alertDiv.style.zIndex = '10000';
    alertDiv.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 2000);
}