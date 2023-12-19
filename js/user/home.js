import { formatMoney } from "../../utils/formatData.js";
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let productLocal = JSON.parse(localStorage.getItem("products")) || [];
let categoryLocal = JSON.parse(localStorage.getItem("categories")) || [];
let categoryId = "";

function renderProducts() {
  const productFilterCategory = productLocal.filter(
    (pro) => pro.category === categoryId
  );

  let productHtmls = [];

  if (categoryId === "") {
    productHtmls = productLocal.map((pro) => {
      return `
          <div class="product-cart">
          <div class="cart-image">
            <a href="product-detail.html?id=${pro.productId}">
              <img
                src=${pro.productImage}
                alt=""
              />
            </a>
          </div>
          <div class="cart-body">
            <h3 class="cart-name">${pro.productName}</h3>
            <p class="cart-price">${formatMoney(pro.price)}</p>
          </div>
          <div class="cart-footer">
            <span>SP còn lại: ${pro.quantity}</span>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
          `;
    });
  } else {
    productHtmls = productFilterCategory.map((pro) => {
      return `
          <div class="product-cart">
          <div class="cart-image">
            <a href="product-detail.html?id=${pro.productId}">
              <img
                src=${pro.productImage}
                alt=""
              />
            </a>
          </div>
          <div class="cart-body">
            <h3 class="cart-name">${pro.productName}</h3>
            <p class="cart-price">${formatMoney(pro.price)}</p>
          </div>
          <div class="cart-footer">
            <span>SP còn lại: ${pro.quantity}</span>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
          `;
    });
  }

  // Ép kiểu từ mảng về chuỗi HTML
  const productHtml = productHtmls.join("");

  // Append vào DOM
  $("#listProduct").innerHTML = productHtml;
}

renderProducts();

function renderCategoty() {
  const categoryHtmls = categoryLocal.map((cat, index) => {
    return `<li class="menu-item-category">${cat.categoryName}</li>`;
  });

  const categoryHtml = categoryHtmls.join("");

  $("#menuListCategory").innerHTML = categoryHtml;

  // Lấy ra danh sách của các sản phẩm
  const categoryItems = $$(".menu-item-category");

  // Lặp qua các sản phẩm và bắt sự kiện click vào image
  categoryItems.forEach((item, index) => {
    // Bắt sự kiện click vào hình ảnh
    item.addEventListener("click", () => {
      // Lấy thông tin sản phẩm khi mình click vào
      const categorySelected = categoryLocal[index];
      categoryId = categorySelected.categoryId;
      renderProducts();
    });
  });
}

renderCategoty();
