let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

import { formatMoney } from "../../utils/formatData.js";

// Lấy thông tin của user đang đăng nhập
let userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];

// Lấy ra danh sách các sản phẩm có trong giỏ hàng của user đang đăng nhập
let cartUserLogin = userLogin.cart;

// lấy danh sách sản phẩm có trên local
let productLocal = JSON.parse(localStorage.getItem("products")) || [];

// Render danh sách cart
function renderCart() {
  let cartHtmls = cartUserLogin.map((cart, index) => {
    // Tìm kiếm product theo id
    const findProduct = productLocal.find(
      (pro) => pro.productId === cart.productId
    );

    return `
        <tr>
        <td>${index + 1}</td>
        <td>
          <img src=${findProduct.productImage} alt="" />
        </td>
        <td>${findProduct.productName}</td>
        <td>
          <div class="handle-quantity-cart">
            <button id=${
              findProduct.productId
            } class="btnDecrease btn-change">-</button>
            <div>${cart.quantity}</div>
            <button id=${
              findProduct.productId
            } class="btnIncrease btn-change">+</button>
          </div>
        </td>
        <td>${formatMoney(findProduct.price)}</td>
        <td>${formatMoney(findProduct.price * cart.quantity)}</td>
        <td>
          <button id=${
            findProduct.productId
          } class="btn-delete button button-secondary">Xóa</button>
        </td>
      </tr>
        `;
  });

  // Ép kiểu từ mảng thành chuỗi HTML
  const cartHtml = cartHtmls.join("");

  // Append vào trong DOM
  $("#tbody").innerHTML = cartHtml;
}

renderCart();

// ỦY quyền sự kiện từ cha xuống con (tức là từ tbody xuống các phần tử bên trong td)
$("#tbody").addEventListener("click", (e) => {
  const productId = e.target.id;
  // Kiểm tra xem có đang click vào phạm vi của một button không
  if (e.target.closest("button")) {
    if (e.target.getAttribute("class") === "btnIncrease btn-change") {
      // Xử lý tăng
      handleIncrease(productId);
    } else if (e.target.getAttribute("class") === "btnDecrease btn-change") {
      // Xử lý giảm
      handleDecrease(productId);
    } else if (
      e.target.getAttribute("class") === "btn-delete button button-secondary"
    ) {
      handleDelete(productId);
      // Render lại cart
      renderCart();
    }
  }
});

// Hàm xử lý tăng số lượng
function handleIncrease(id) {
  // Lấy ra vị trí sản phẩm cần update
  const indexProduct = cartUserLogin.findIndex((cart) => cart.productId === id);

  // Từ vị trí, truy cập vào mảng và lấy ra phần tử cần cập nhật
  cartUserLogin[indexProduct].quantity++;

  // Lưu dữ liệu lên local
  localStorage.setItem("userLogin", JSON.stringify(userLogin));

  // Gọi hàm render lại danh sách cart
  renderCart();

  totalAmount();
}

// Hàm xử lý giảm số lượng
function handleDecrease(id) {
  // Lấy ra vị trí sản phẩm cần update
  const indexProduct = cartUserLogin.findIndex((cart) => cart.productId === id);

  if (cartUserLogin[indexProduct].quantity > 1) {
    // Từ vị trí, truy cập vào mảng và lấy ra phần tử cần cập nhật
    cartUserLogin[indexProduct].quantity--;

    // Lưu dữ liệu lên local
    localStorage.setItem("userLogin", JSON.stringify(userLogin));

    // Gọi hàm render lại danh sách cart
    renderCart();

    totalAmount();
  }
}

function handleDelete(id) {
  // Lọc ra những sản phảm có id khác với id cần xóa
  const filterProducts = cartUserLogin.filter((pro) => pro.productId !== id);

  // Lưu mới dữ liệu trong giỏ hàng
  userLogin.cart = filterProducts;

  // Lưu dữ liệu lên local
  localStorage.setItem("userLogin", JSON.stringify(userLogin));

  totalAmount();
}

// Tính tổng số tiền của các sản phẩm trong giỏ hàng
function totalAmount() {
  let total = cartUserLogin.reduce((prev, currentValue) => {
    // Lặp qua và tìm kiếm sản phẩm theo id
    let findProduct = productLocal.find(
      (pro) => pro.productId === currentValue.productId
    );
    return prev + currentValue.quantity * findProduct.price;
  }, 0);
  // Gắn giá trị vào trong DOM
  $("#totalAmount").innerHTML = formatMoney(total);
}

totalAmount();
