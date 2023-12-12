//#region Lấy các phần tử từ DOM
const tbodyElement = document.querySelector("#tbody");
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
let currentPage = 1; // Trang hiện tại
const recordsPerPage = 5; // Số bản ghi trên mỗi trang

function renderListUser() {
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
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
              <i class="fa-solid fa-unlock-keyhole"></i>
            </button>
            <button class="btn-icon">
              <i class="fa-solid fa-user-pen"></i>
            </button>
            <button class="btn-icon">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
  const trHtml = trHtmls.join("");
  tbodyElement.innerHTML = trHtml;
}

function renderPagination() {
  const pageNumbers = Math.ceil(userLocal.length / recordsPerPage);

  const paginationGroup = document.querySelector(".pagination-group");
  paginationGroup.innerHTML = ""; // Xóa nội dung cũ của phân trang

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
}

//#endregion

//#region Gọi các hàm
renderListUser();
renderPagination();
//#endregion
