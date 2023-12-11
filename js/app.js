import uploadFile from "./firebase.config.js";

const inputFile = document.querySelector("#file");
const btnUpload = document.querySelector("#btnUpload");
const image = document.querySelector("#image");

btnUpload.addEventListener("click", async () => {
  const inputFileValue = inputFile.files[0];
  const result = await uploadFile(inputFileValue);
  console.log(result);
});
