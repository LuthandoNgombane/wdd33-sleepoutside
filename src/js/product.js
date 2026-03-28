import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

async function init() {
  if (productId) {
    const product = await dataSource.findProductById(productId);
    if (product) {
      renderProductDetails(product);
      document.getElementById("addToCart").addEventListener("click", () => {
        addProductToCart(product);
      });
    }
  }
}

function renderProductDetails(product) {
  document.getElementById("productBrandName").innerText = product.Brand.Name;
  document.getElementById("productName").innerText = product.NameWithoutBrand;
  document.getElementById("productImage").src = product.Image; 
  document.getElementById("productImage").alt = product.Name;
  document.getElementById("productFinalPrice").innerText = `$${product.FinalPrice}`;
  document.getElementById("productColorName").innerText = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
}

function addProductToCart(product) {

  let cartItems = getLocalStorage("so-cart") || [];


  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  const existingItem = cartItems.find((item) => item.Id === product.Id);

  if (existingItem) {

    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  }
  else 
{

    product.Quantity = 1;
    cartItems.push(product);
  }


  setLocalStorage("so-cart", cartItems);
}
init();