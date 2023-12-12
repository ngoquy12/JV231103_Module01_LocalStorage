const emailElement = document.querySelector("#email");
const passwordElement = document.querySelector("#password");
const formElement = document.querySelector("#form");
const btnSubmit = document.querySelector("#btnSubmit");
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!emailElement.value || !passwordElement.value) {
    alert("Email hoac mat khau khong duoc de trong.");
  } else {
    const findUserByEmail = userLocal.find(
      (user) =>
        user.email === emailElement.value &&
        user.password === passwordElement.value
    );

    if (!findUserByEmail) {
      alert("Email hoac mat khau khong dung");
    } else {
      localStorage.setItem("userLogin", JSON.stringify(findUserByEmail.email));
      alert("Dang nhap thanh cong");
    }
  }
});
