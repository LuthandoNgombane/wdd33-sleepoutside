import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// These are the IDs we want to show on the landing page
const validProductIds = ["880RR", "985PR", "985RF", "989CG"];

async function init() {
  const list = await dataSource.getData();
  
  // FILTER: Only keep products that exist in our whitelist
  const filteredList = list.filter(item => validProductIds.includes(item.Id));
  
  renderProductList(filteredList);
}

function renderProductList(list) {
  const element = document.querySelector(".product-list");
  const htmlStrings = list.map(product => productCardTemplate(product));
  element.innerHTML = htmlStrings.join("");
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

init();