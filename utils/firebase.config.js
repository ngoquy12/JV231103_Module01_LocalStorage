import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const uploadFile = async (value) => {
  let imageUrl = "";
  // Các config của firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC_QM1IswVgbn9mkvNLe3L85Xgp122k_gA",
    authDomain: "upload-firebase-85c7d.firebaseapp.com",
    projectId: "upload-firebase-85c7d",
    storageBucket: "upload-firebase-85c7d.appspot.com",
    messagingSenderId: "627885555500",
    appId: "1:627885555500:web:0817ce4484440b7d56b689",
  };

  // Tạo biến app cho phép sử dụng firebase ở phạm vi toàn cục
  const app = initializeApp(firebaseConfig);

  // Lấy và cho phép lưu dữ liệu trên firebase
  const store = getStorage(app);

  // Kiểm tra giá trị truyền vào từ form
  if (value) {
    // Tạo tham chiếu đến thư mục gốc tren firebase
    const storeRef = ref(store, `uploads/${value.name}`);

    try {
      // Tiến hành upload ảnh lên firebase
      const snapshot = await uploadBytes(storeRef, value);

      // Lấy url của hình về sau khi upload thành công
      const downloadURL = await getDownloadURL(snapshot.ref);

      imageUrl = downloadURL; // Gán lại đường dẫn lấy về
    } catch (error) {
      imageUrl = `Lỗi tải lên.`;
    }
  } else {
    imageUrl = "Hình ảnh không được để trống.";
  }

  return imageUrl;
};

export default uploadFile;
