import { formatDate, formatMoney } from "../utils/formatData.js";

// Kiểu dữ liệu JSON : Là một kiểu định dạng dữ liệu đặc biệt
// Kiểu object: const object = {
//  key : value
//}

//  File JS không thể thao tác trực tiếp được với kiểu JSON mà chúng ta cần phải ép kiểu
// Cú pháp ép kiểu từ JS sang JSON: JSON.stringify(value type js)

const obj = [
  {
    id: 2,
    name: "Nguyễn Văn B",
  },
  {
    id: 3,
    name: "Nguyễn Văn D",
  },
];

// JSON.stringify(obj);

// // Cú pháp ép kiểu từ JSON sang JS: JSON.parse(value type JSON)
// JSON.parse(obj);

// Cách lưu trữ dữ liệu lên local
localStorage.setItem("obj", JSON.stringify(obj));

// Cách lấy dữ liệu từ local
const objLocal = JSON.parse(localStorage.getItem("obj"));
console.log(objLocal);

// Cách xóa dữ liệu khỏi local
localStorage.removeItem("obj");

const users = [
  {
    userName: "Nguyễn Văn A",
    email: "nva@gmail.com",
    password: "123456789",
    createdDate: new Date(),
  },
  {
    userName: "Nguyễn Văn B",
    email: "nvb@gmail.com",
    password: "123456789",
    createdDate: new Date(),
  },
  {
    userName: "Nguyễn Văn C",
    email: "nvc@gmail.com",
    password: "123456789",
    createdDate: new Date(),
  },
];

const tbodyElement = document.querySelector("#tbody");

const trHtmls = users.map((user, index) => {
  return `
        <tr>
            <td>${index + 1}</td>
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${formatDate(user.createdDate)}</td>
        </tr>
    `;
});

const trHtml = trHtmls.join("");

tbodyElement.innerHTML = trHtml;
