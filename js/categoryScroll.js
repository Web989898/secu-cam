function renderCategories(categories, currentLanguage = 'en') {
  const menu = document.getElementById('categoryMenu');
  menu.innerHTML = '';

  categories.forEach(cat => {
    if (cat.id !== 'all') {
      const li = document.createElement('li');
      li.innerHTML = `
        <a class="dropdown-item category-item" href="#" data-id="${cat.id}">
          ${cat.name[currentLanguage]}
        </a>`;
      menu.appendChild(li);
    }
  });
}