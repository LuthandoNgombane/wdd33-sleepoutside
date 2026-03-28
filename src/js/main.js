import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

const validProductIds = ["880RR", "985PR", "985RF", "989CG"];

async function init() {
  const list = await dataSource.getData();
  
  const filteredList = list.filter(item => validProductIds.includes(item.Id));
  
  renderProductList(filteredList);
}

function renderProductList(list) {
  const element = document.querySelector(".product-list");
  const htmlStrings = list.map(product => productCardTemplate(product));
  element.innerHTML = htmlStrings.join("");
}

// main.js

function productCardTemplate(product) {

  let discountBadge = "";
  let priceDisplay = `<p class="product-card__price">$${product.FinalPrice}</p>`;

  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const savings = Math.round(product.SuggestedRetailPrice - product.FinalPrice);
    discountBadge = `<span class="discount-flag">Save $${savings}</span>`;
    
    priceDisplay = `
      <p class="product-card__price">
        <span class="original-price">$${product.SuggestedRetailPrice}</span>
        $${product.FinalPrice}
        ${discountBadge}
      </p>`;
  }

  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      ${priceDisplay}
    </a>
  </li>`;
}

init();