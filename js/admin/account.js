//#region Lấy các phần tử từ DOM
const tbodyElement = document.querySelector("#tbody");
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
let currentPage = 1; // Trang hiện tại
const recordsPerPage = 12; // Số bản ghi trên mỗi trang
let idDelete = "";
const btnClose = document.querySelector("#btnClose");
const iconCloseDialog = document.querySelector("#iconCloseDialog");
let userNameBlock = document.querySelector("#userNameBlock");
let btnOkDelete = document.querySelector("#btnOkDelete");

const dialogConfirmDelete = document.querySelector("#dialogConfirmDelete");

/**
 * Hiển thị danh sách user
 */
function renderListUser() {
  // Vị trí bắt đầu lấy
  const startIndex = (currentPage - 1) * recordsPerPage;
  // Vị trí kết thúc
  const endIndex = startIndex + recordsPerPage;
  // Vị trí hiện tại của user
  const currentUsers = userLocal.slice(startIndex, endIndex);
  const trHtmls = currentUsers.map((user, index) => {
    return `
        <tr>
        <td>${startIndex + index + 1}</td>
        <td>${user.fullName}</td>
        <td>${
          user.gender === 0 ? "Nam" : user.gender === 1 ? "Nữ" : "Khác"
        }</td>
        <td>${user.dateOfBirth}</td>
        <td>${user.address}</td>
        <td>${user.status === 0 ? "Ngừng hoạt động" : "Đang hoạt động"}</td>
        <td>
          <div class="btn-func-group">
            <button class="btn-icon">
              <i id="block_${
                user.userId
              }" class="fa-solid fa-unlock-keyhole"></i>
            </button>
            <button class="btn-icon">
            <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
  const trHtml = trHtmls.join("");
  tbodyElement.innerHTML = trHtml;
  addOpenDialogEvent();
}

// Phân trang user
function renderPagination() {
  // Tính tổng số trang = Số lượng user / Số lượng bản ghi trên 1 trang
  const pageNumbers = Math.ceil(userLocal.length / recordsPerPage);

  const paginationGroup = document.querySelector(".pagination-group");

  // Xóa nội dung cũ của phân trang
  paginationGroup.innerHTML = "";

  const prevButton = document.createElement("i");
  prevButton.classList.add("fa-solid", "fa-angles-left");
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderListUser();
      renderPagination();
    }
  });
  paginationGroup.appendChild(prevButton);

  for (let i = 1; i <= pageNumbers; i++) {
    const button = document.createElement("button");
    button.classList.add("page-number");
    button.innerText = i;
    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      renderListUser();
      renderPagination();
    });

    paginationGroup.appendChild(button);
  }

  const nextButton = document.createElement("i");
  nextButton.classList.add("fa-solid", "fa-angles-right");
  nextButton.addEventListener("click", () => {
    if (currentPage < pageNumbers) {
      currentPage++;
      renderListUser();
      renderPagination();
    }
  });
  paginationGroup.appendChild(nextButton);
  addOpenDialogEvent();
}
//#endregion

//#region Gọi các hàm
renderListUser();
renderPagination();
//#endregion

// Đóng dialog xác nhận xóa
const handleCloseDialog = () => {
  dialogConfirmDelete.style.display = "none";
};

// Khi click vào icon close thì đóng dialog
iconCloseDialog.addEventListener("click", () => {
  handleCloseDialog();
});

// Khi click vào button hủy thì đóng dialog
btnClose.addEventListener("click", () => {
  handleCloseDialog();
});

const btnBlock = document.querySelectorAll(".btn-func-group");
// Hàm để thêm sự kiện mở dialog xác nhận xóa cho các nút "mở khóa"
function addOpenDialogEvent() {
  const btnBlock = document.querySelectorAll(".btn-func-group");
  btnBlock.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.closest(".fa-unlock-keyhole")) {
        idDelete = e.target.id.split("_")[1];
        dialogConfirmDelete.style.display = "flex";
      }
    });
  });
}

function handleBlockUser(id) {
  const findIndexUser = userLocal.findIndex((user) => user.userId === id);
  if (findIndexUser !== -1) {
    // Đảo ngược trạng thái
    userLocal[findIndexUser].status =
      userLocal[findIndexUser].status === 0 ? 1 : 0;

    // Cập nhật dữ liệu mới trong localStorage
    localStorage.setItem("users", JSON.stringify(userLocal));
    // Rerender danh sách người dùng và phân trang
    renderListUser();
    renderPagination();

    // Đóng dialog xác nhận xóa
    handleCloseDialog();

    // reset Id xóa
    idDelete = "";
  }
}

btnOkDelete.addEventListener("click", () => {
  handleBlockUser(idDelete);
});

const searchInput = document.querySelector(".input");
searchInput.addEventListener("input", handleSearch);

function handleSearch(event) {
  const searchTerm = event.target.value.trim();

  if (searchTerm === "") {
    // Nếu ô input trống, hiển thị lại toàn bộ danh sách người dùng
    userLocal.length = 0;
    userLocal.push(...(JSON.parse(localStorage.getItem("users")) || []));
    currentPage = 1;
    renderListUser();
    renderPagination();
  } else {
    const filteredUsers = userLocal.filter((user) =>
      user.fullName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          searchTerm
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
    );

    currentPage = 1;
    userLocal.length = 0;
    userLocal.push(...filteredUsers);
    renderListUser();
    renderPagination();
  }
}
