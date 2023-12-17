import upload from "../../utils/firebase.config.js";
import { formatDate } from "../../utils/formatData.js";

const btnOpenForm = document.querySelector("#btnOpenForm");
const formAddCategory = document.querySelector("#formAddCategory");
const iconCloseForm = document.querySelector("#iconCloseForm");
const btnCloseForm = document.querySelector("#btnCloseForm");
const btnAddCategory = document.querySelector("#btnAddCategory");
const categoryNameInput = document.querySelector("#categoryName");
const fileInput = document.querySelector("#file");
const imageCategory = document.querySelector("#imageCategory");
let imageUrl = "";
let status = document.querySelectorAll("input[name=status]");
let statusChecked = 1;
const categoryLocal = JSON.parse(localStorage.getItem("categories")) || [];
const tbody = document.querySelector("#tbody");
const loading = document.querySelector("#loading");

// Mở form thêm mới danh mục
function handleOpenForm() {
  formAddCategory.style.display = "flex";
}

// Đóng form thêm mới danh mục
function handleCloseForm() {
  formAddCategory.style.display = "none";
}

btnOpenForm.addEventListener("click", () => {
  handleOpenForm();
});

iconCloseForm.addEventListener("click", () => {
  handleCloseForm();
});

btnCloseForm.addEventListener("click", () => {
  handleCloseForm();
});

fileInput.addEventListener("change", async (e) => {
  loading.style.display = "flex";
  const imgUrl = await upload(e.target.files[0]);
  imageCategory.src = imgUrl;
  loading.style.display = "none";
  imageUrl = imgUrl;
});

status.forEach((st) => {
  st.addEventListener("change", () => {
    if (st.checked) {
      statusChecked = +st.value;
    }
  });
});

btnAddCategory.addEventListener("click", (e) => {
  e.preventDefault();
  const newCategory = {
    categoryId: uuidv4(),
    categoryName: categoryNameInput.value,
    categoryImage: imageUrl,
    status: statusChecked,
    createdDate: formatDate(new Date()),
  };

  categoryLocal.push(newCategory);
  localStorage.setItem("categories", JSON.stringify(categoryLocal));
  categoryNameInput.value = "";
  imageUrl = "";
  imageCategory.src = "";
  handleCloseForm();
  renderCategory();
});

function renderCategory() {
  const trHtmls = categoryLocal.map((cat, index) => {
    return `
    <tr>
        <td>${index + 1}</td>
        <td>${cat.categoryName}</td>
        <td>
           <div class="img-td">
           <img src=${cat.categoryImage}>
           </div>
        </td>
        <td>${cat.createdDate}</td>
        <td>${cat.status === 1 ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
        <td>
            <button class="button button-primary">Sửa</button>
            <button class="button button-primary">Xóa</button>
        </td>
    </tr>
        `;
  });

  const trHtml = trHtmls.join("");
  tbody.innerHTML = trHtml;
}

renderCategory();
