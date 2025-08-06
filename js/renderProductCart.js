// Render Products (cards products)
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();

    // No results case
    if (filteredProducts.length === 0) {
        container.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <div>${translations[currentLanguage].noResults}</div>
        </div>
        `;
        renderPagination(filteredProducts); // Pass filteredProducts for correct page count
        return;
    }
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Pagination logic
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = filteredProducts.slice(start, end);

    // Render product cards
    container.innerHTML = `
        <div class="product-grid">
        ${pageProducts.map(p => `
            <div class="product-card">
            <img src="${p.image}" alt="${currentLanguage === 'en' ? p.name : p.nameKh}" class="product-image">
            <div class="product-info">
                <div class="product-title">${currentLanguage === 'en' ? p.name : p.nameKh}</div>
                <div class="product-description">${currentLanguage === 'en' ? p.description : p.descriptionKh}</div>
                <div class="product-price">$${p.price.toFixed(2)}</div>
                <div class="product-features">
                ${(currentLanguage === 'en' ? p.features : p.featuresKh)
                    .map(f => `<span class="feature-tag">${f}</span>`).join('')}
                </div>
                <button class="btn btn-primary" onclick="handleBuy('${p.id}')">
                ${currentLanguage === 'en' ? 'Order' : 'កម្មង់'}​
                </button>
                <button class="btn btn-secondary" onclick="handleAddToCart('${p.id}')">
                ${currentLanguage === 'en' ? 'Add to Cart' : 'បន្ថែមទៅកន្ត្រក'}
                </button>
                ${p.isNew ? `<span class="badge bg-success ms-2">${currentLanguage === 'en' ? 'New' : 'ថ្មី'}</span>` : ''}
            </div>
            </div>
        `).join('')}
        </div>
    `;

    renderPagination(filteredProducts); // Pass filteredProducts for correct page count
}

// Render Pagination
function renderPagination(filteredProducts) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === currentPage ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i});return false;">${i}</a>`;
        pagination.appendChild(li);
    }
}

// Go To Page
function goToPage(page) {
    currentPage = page;
    renderProducts();
}

// Responsive Items Per Page
window.addEventListener('resize', () => {
    itemsPerPage = window.innerWidth <= 768 ? 6 : 20;
    renderProducts();
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    translatePage();
    renderCategories();
    renderCategoryFilters();
    renderProducts();
    document.documentElement.setAttribute('data-theme', currentTheme);
});