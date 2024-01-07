import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuDu8PAD0vryP84FEzO-_a-2Tx6_FJRCg",
  authDomain: "epic-games-clone-c0009.firebaseapp.com",
  projectId: "epic-games-clone-c0009",
  storageBucket: "epic-games-clone-c0009.appspot.com",
  messagingSenderId: "96371749246",
  appId: "1:96371749246:web:8de6e1806dea62dab5c32f",
  measurementId: "G-L9RY8WEZQ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const dbref = doc(database, "UsersData", "anlysolly@gmail.com");

//updating wishlist items in firebase
// const updateWishlistInFirebase = async (game) => {
//   tempWishlistArray.push(game);
//   await updateDoc(dbref, { Wishlist: tempWishlistArray });
// };
const updateWishlistInFirebase = async (game) => {
  let tempWishlistArray = [];
  //storing the wishlist to a temporary array
  getDoc(dbref).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempWishlistArray = userData.Wishlist;
      console.log(tempWishlistArray);
    }
  });
  const gameSlug = game.slug;
  const isGamePresent = tempWishlistArray.some(
    (item) => item.slug === gameSlug
  );

  if (!isGamePresent) {
    tempWishlistArray.push(game);
    await updateDoc(dbref, { Wishlist: tempWishlistArray });
  }
};

//removing wishlist item from firebase
const removeWishlistInFirebase = async (gameSlug) => {
  let tempWishlistArray = [];
  //storing the wishlist to a temporary array
  getDoc(dbref).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempWishlistArray = userData.Wishlist;
      console.log(tempWishlistArray);
    }
  });
  let updatedWishlistArray = tempWishlistArray.filter(
    (singlegame) => singlegame != gameSlug
  );
  await updateDoc(dbref, { Wishlist: updatedWishlistArray });
};

const addToWishlist = () => {};
