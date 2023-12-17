import { formatMoney } from "../../utils/formatData.js";
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let productLocal = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  const productHtmls = productLocal.map((pro) => {
    return `
        <div class="product-cart">
        <div class="cart-image">
          <a href="#">
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

  // Ép kiểu từ mảng về chuỗi HTML
  const productHtml = productHtmls.join("");

  // Append vào DOM
  $("#listProduct").innerHTML = productHtml;

  // Lấy ra danh sách của các sản phẩm
  const productItems = $$(".product-cart");

  // Lặp qua các sản phẩm và bắt sự kiện click vào image
  productItems.forEach((item, index) => {
    // Lấy ra phần tử hình ảnh trong từng cart
    const productImage = item.querySelector(".cart-image img");

    // Bắt sự kiện click vào hình ảnh
    productImage.addEventListener("click", () => {
      // Lấy thông tin sản phẩm khi mình click vào
      const productSelected = productLocal[index];

      // Chuyển hướng sang trang chi tiết kèm theo thông tin của sản phẩm
      window.location.href = `product-detail.html?id=${productSelected.productId}`;
    });
  });
}

renderProducts();
