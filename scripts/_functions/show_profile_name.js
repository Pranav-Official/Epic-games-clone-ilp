import { API_KEY, firebaseConfig } from "../../environment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const dbref = doc(db, "UsersData", "anlysolly@gmail.com");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
  fetchAndDisplayCartItems();
});

const fetchAndDisplayCartItems = async () => {
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const cartItems = userData && userData.Cart ? userData.Cart : [];
      document.querySelector(".epic-account-name__name").textContent =
        userData.Display_Name;
      await displayPriceInDOM(cartItems);
    }
  } catch (error) {
    console.error("Error fetching", error);
  }
};
