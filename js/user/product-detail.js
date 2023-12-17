import { formatMoney } from "../../utils/formatData.js";
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let productLocal = JSON.parse(localStorage.getItem("products")) || [];

function renderProductDetail() {
  // Lấy ra thông tin của sản phẩm theo id
  const productId = window.location.search.split("=")[1];
  // Tìm kiếm product theo id
  const findProduct = productLocal.find((pro) => pro.productId === productId);

  const productHtmls = `
  <div class="product-detail-left">
        <div class="product-detail-image">
          <img
            src=${findProduct.productImage}
            alt=""
          />
        </div>
      </div>
      <div class="product-detail-right">
        <h3 class="product-name">${findProduct.productName}</h3>
        <div class="comment">
          <p>Bình luận: 12</p>
          <div class="border-right"></div>
          <p>Đã bán: 200</p>
        </div>
        <div class="discount-area">
          <s>${formatMoney(findProduct.price)}</s>
          <p class="product-price">${formatMoney(
            findProduct.discount > 0
              ? findProduct.price -
                  findProduct.price * (findProduct.discount / 100)
              : findProduct.price
          )}</p>
        </div>
        <div class="handle-quantity">
          <p>Số lượng</p>
          <button class="btn-decrease">-</button>
          <span class="quantity">10</span>
          <button class="btn-increase">+</button>
          <p>Số lượng còn lại: 2</p>
        </div>
        <div>
          <button class="btn-add-cart add-cart">
            <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
          </button>
          <button class="btn-add-cart buy-now">Mua ngay</button>
        </div>
        <h3 class="description-title">Thông tin chi tiết</h3>
        <div class="border-bottom"></div>
        <p class="description"></p>
      </div>
  `;

  // Append
  $("#productDetail").innerHTML = productHtmls;
}

renderProductDetail();
