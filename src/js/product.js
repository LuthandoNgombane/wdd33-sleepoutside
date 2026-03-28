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

  const cleanPath = product.Image.replace("../", "/"); 
  document.getElementById("productImage").src = cleanPath;

  document.getElementById("productImage").src = product.Image; 
  document.getElementById("productImage").alt = product.Name;
  document.getElementById("productFinalPrice").innerText = `$${product.FinalPrice}`;
  document.getElementById("productColorName").innerText = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
}

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];
  if (!Array.isArray(cartItems)) cartItems = []; 
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

init();