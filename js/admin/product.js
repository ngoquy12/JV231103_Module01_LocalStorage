import uploadFile from "../../utils/firebase.config.js";
import { formatMoney } from "../../utils/formatData.js";

let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let categoryValue = "";
let imageURL = "";

let productLocal = JSON.parse(localStorage.getItem("products")) || [];

// Mở form thêm mới product
$("#btnOpenForm").addEventListener("click", () => {
  $("#formAddProduct").style.display = "flex";
});

// Đóng form khi click vào icon close
$("#iconCloseForm").addEventListener("click", () => {
  $("#formAddProduct").style.display = "none";
});

// Đóng form khi click vào button Hủy
$("#btnCloseForm").addEventListener("click", () => {
  $("#formAddProduct").style.display = "none";
});

// Render danh sách danh mục sản phẩm
function renderCategories() {
  const optionHtmls = categories.map((cat) => {
    return `
        <option value=${cat.categoryId}>${cat.categoryName}</option>
        `;
  });

  // Ép kiểu từ mảng thành chuỗi HTML
  const optionHtml = optionHtmls.join("");

  // Append vào DOM
  $("#listCategory").innerHTML = optionHtml;
}

renderCategories();

// Lấy giá trị trong danh mục sản phẩm
$("#listCategory").addEventListener("change", (e) => {
  categoryValue = e.target.value;
});

// Lấy giá trị từ hình ảnh
$("#file").addEventListener("change", async (e) => {
  $("#loading").style.display = "flex";
  const imageUrl = await uploadFile(e.target.files[0]);
  $("#imageProduct").src = imageUrl;
  imageURL = imageUrl;
  $("#loading").style.display = "none";
});

// Reset các giá trị trong Form
function resetForm() {
  $("#productName").value = "";
  $("#quantity").value = "";
  imageURL = "";
  $("#price").value = "";
  $("#discount").value = "";
  categoryValue = "";
  $("#description").value = "";
  $("#imageProduct").src = "";
}

// Bắt sự kienj submit form
$("#formAddProduct").addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  // Tạo đối tượng newProduct
  const newProduct = {
    productId: uuidv4(),
    productName: $("#productName").value,
    quantity: +$("#quantity").value,
    productImage: imageURL,
    price: +$("#price").value,
    discount: +$("#discount").value,
    category: categoryValue,
    description: $("#description").value,
    createdDate: new Date().toISOString().split("T")[0],
  };

  // Thêm dữ liệu vào đầu mảng
  productLocal.unshift(newProduct);

  // Lưu dữ liệu lên local
  localStorage.setItem("products", JSON.stringify(productLocal));

  // Đóng form
  $("#formAddProduct").style.display = "none";

  // Reset form
  resetForm();

  // Render lại danh sách product
  renderProducts();
});

// Lấy ra tên của danh mục sản phẩm
function getCategoryName(categoryId) {
  const categoryLocal = JSON.parse(localStorage.getItem("categories")) || [];
  // Tìm kiếm catgory theo tên
  const findCategory = categoryLocal?.find(
    (cat) => cat.categoryId === categoryId
  );

  return findCategory?.categoryName;
}

// Render danh sách sản phẩm ra ngoài giao diện
function renderProducts() {
  const trHtmls = productLocal.map((product, index) => {
    return `
        <tr>
        <td>${index + 1}</td>
        <td>${product.productName}</td>
        <td>
          <div style="display: flex; justify-content: center">
            <img
              src=${product.productImage}
              alt=""
            />
          </div>
        </td>
        <td>${formatMoney(product.price)}</td>
        <td>${product.quantity}</td>
        <td>${getCategoryName(product.category)}</td>
        <td>${product.discount} %</td>
        <td>Trạng thái</td>
        <td>
          <div style="display: flex; gap: 12px">
            <button style="height: 30px" class="button">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button id="delete_${
              product.productId
            }" style="height: 30px" class="button">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
        `;
  });

  const trHtml = trHtmls.join("");

  $("#tbody").innerHTML = trHtml;
}

renderProducts();

function handleDelete(id) {
  // Lọc ra những sản phẩm có id khác với id cần xóa
  const filterProduct = productLocal.filter((pro) => pro.productId !== id);

  // Gán lại giá trị cho mảng productLocal
  productLocal = filterProduct;

  // Lưu dữ liệu lên local
  localStorage.setItem("products", JSON.stringify(filterProduct));

  // Render lại danh sách product
  renderProducts();
}

// Lắng nghe sự kiện click vào tbody và lấy ra được id của phần tử cần xóa
$("#tbody").addEventListener("click", (e) => {
  if (e.target && e.target.closest("button")) {
    const btnElement = e.target.closest("button"); // Lấy ra btn bấm vào
    const idDelete = btnElement.id.split("_")[1]; // Lấy ra id cần xóa
    $("#dialogDelete").style.display = "flex"; // Mở diloag xác nhận xóa
    // Khi click vào nut xóa thì xác nhận xóa
    $("#btnDelete").addEventListener("click", () => {
      handleDelete(idDelete);
      $("#dialogDelete").style.display = "none"; // Ẩn dialog
    });
  }
});

// Đóng dilog khi click vào icon close
$("#iconCloseDialog").addEventListener("click", () => {
  $("#dialogDelete").style.display = "none";
});

// Đóng dilog khi click vào button Hủy
$("#btnCloseDialog").addEventListener("click", () => {
  $("#dialogDelete").style.display = "none";
});
