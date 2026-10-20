import products from './data/products.json';

const productsPerPage = 5;
let currentPage = 1;

const productGrid = document.querySelector('#product-grid');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');
const pageInfo = document.querySelector('#page-info');

const totalPages = Math.ceil(products.length / productsPerPage);

function renderProducts() {
  productGrid.innerHTML = '';

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  currentProducts.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';

    card.innerHTML = `
      <img
        class="product-image"
        src="${product.imageUrl}"
        alt="${product.name}"
      />

      <div class="product-info">
        <p class="product-category">${product.category}</p>

        <h3 class="product-name">${product.name}</h3>

        <p class="product-description">
          ${product.description}
        </p>

        <p class="product-price">
          ${product.price.toFixed(2)} Moonmarks
        </p>
      </div>
    `;

    productGrid.appendChild(card);
  });

  updatePagination();
}

function updatePagination() {
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderProducts();
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage += 1;
    renderProducts();
  }
});

renderProducts();
