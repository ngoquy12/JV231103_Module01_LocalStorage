import { formatMoney } from "../../utils/formatData.js";
let $ = document.querySelector.bind(document);

let productLocal = JSON.parse(localStorage.getItem("products")) || [];
// Lấy thông tin của user đang đăng nhập
let userLogin = JSON.parse(localStorage.getItem("userLogin"));
console.log(userLogin);

// Lấy ra giỏ hàng của user đang đăng nhập
let cartUserLogin = userLogin?.cart;

function renderProductDetail() {
  // Lấy id từ url
  const idUrl = window.location.search.split("=")[1];
  // Tìm kiếm product theo id
  const findProduct = productLocal.find((pro) => pro.productId === idUrl);
  console.log(findProduct);

  // Render dữ liệu ra ngoài giao diện
  const productDetail = `
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
      (findProduct.price / 100) * (100 - findProduct.discount)
    )}</p>
  </div>
  <div class="handle-quantity">
    <p>Số lượng còn lại: ${findProduct.quantity}</p>
  </div>
  <div>
    <button data=${
      findProduct.productId
    } id="btnAddToCart" class="btn-add-cart add-cart">
      <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
    </button>
  </div>
  <h3 class="description-title">Thông tin chi tiết</h3>
  <div class="border-bottom"></div>
  <p class="description">${findProduct.description}</p>
</div>
  `;

  // Gắn vào trong phần tử cha
  $("#productDetail").innerHTML = productDetail;
}

renderProductDetail();

// Logic thêm vào giỏ hàng
// 1. Kiểm tra xem sản phẩm đó đã tồn tại trong giỏ hàng chưa. Nếu đã tồn tại thì tăng số lượng, nếu chưa tồn tai
// thì sẽ push vào trong mảng

$("#btnAddToCart").addEventListener("click", (e) => {
  if (!userLogin) {
    alert("Bạn cần phải đăng nhập");
    window.location.href = "../login.html";
  } else {
    // Lấy ra id của product khi click vào button thêm vào giỏ hàng
    const idProduct = e.target.getAttribute("data");

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const findIndex = cartUserLogin.findIndex(
      (pro) => pro.productId === idProduct
    );

    // Nếu như chưa có trong giỏ hàng thì tiến hành thêm mới vào giỏ hàng
    if (findIndex === -1) {
      // Tạo ra đối tượng newCart
      const newCart = {
        cartId: uuidv4(),
        quantity: 1,
        createdDate: new Date(),
        productId: idProduct,
      };

      // Push vào trong giỏ hàng của user
      cartUserLogin.push(newCart);

      // Lưu dữ liệu lên local
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      // Lấy ra giỏ hàng tại vị trí findIndex trong mảng giỏ hàng và tăng số lượng
      cartUserLogin[findIndex].quantity++;

      // Lưu lại thông tin lên local
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    }
  }
});
