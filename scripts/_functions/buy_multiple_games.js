





















// import { API_KEY } from "../../environment.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   updateDoc,
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// // Uncomment the line below if using npm to install axios
// // import axios from 'axios';

// // Firebase configuration

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getFirestore(app);
// const dbref = doc(database, "UsersData", "anlysolly@gmail.com");
// let tempMultipleGameArray = [];

// const multipleGameTemplate = (cartItem) =>{
//     return ` <div class="payment-offer-summary" slug="${cartItem.slug}">
//                     <div class="payment-offer-summary__thumbnail-image">
//                       <img
//                         alt="Selected Game Thumbnail"
//                         src=""${cartItem.background_image}"
//                         class="payment-offer-summary__thumbnail"
//                       />
//                     </div>
//                     <div class="payment-offer-summary__content">
//                       <h2 class="payment-offer-summary__title" id="">
//                         ${cartItem.title}
//                       </h2>
//                     </div>
//                   </div>
//                   `;
// };

// const displayMultipleGameInDOM = (cartItems) =>{
// const multipleGameContainer = document.querySelector(".payment-offer-summary");

// let multipleGameHtml = ``;
// cartItems.forEach((cartItems)=>{
// multipleGameHtml+=multipleGameTemplate(cartItems);
// });

// const calculateTotalPrice = (cartItems)=>{
//     let totalPrice = 0;

//     cartItems.forEach((game)=>{
//         totalPrice+=game.retailPrice;
//     });
//     return totalPrice;
// };

// const totalPrice = calculatedTotalPrice(cartItems);

// const totalGamePrice = `
// <div class="payment-order-summary payment-summaries__order">
//                     <div class="payment-order-summary__prices">
//                       <div class="payment-price">
//                         <p class="payment-price__label">Price</p>
//                         <p class="payment-price__value">
//                           <span>$69.99</span>
//                         </p>
//                       </div>
//                       <div class="payment-price">
//                         <p class="payment-price__label">Discount Price</p>
//                         <p class="payment-price__value">
//                           -
//                           <span>$10.99</span>
//                         </p>
//                       </div>
//                       <div class="payment-order-summary__discounts">
//                         <div class="payment-price">
//                           <p class="payment-price__label">Sale Discount</p>
//                           <p class="payment-price__value">
//                             -
//                             <span>$7.99</span>
//                           </p>
//                         </div>
//                         <div class="payment-price">
//                           <p class="payment-price__label">Coupon Discount</p>
//                           <p class="payment-price__value">
//                             -
//                             <span>$3.00</span>
//                           </p>
//                         </div>
//                       </div>
//                       <span class="payment-price__label"
//                         >VAT included if applicable</span
//                       >
//                       <hr class="payment-order-summary__divider" />
//                       <div class="payment-price">
//                         <p
//                           class="payment-price__label payment-price__label--UPAY"
//                         >
//                           <span>Total</span>
//                         </p>
//                         <p
//                           class="payment-price__value payment-price__value--UPAY"
//                         >
//                           <span>${totalPrice}</span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>`;
                  
//                 multipleGameHtml+=totalGamePrice;
//                 multipleGameContainer.innerHTML = multipleGameHtml;
//                 multipleGameContainer = document.querySelector(".payment-summaries__order");

// };

// const fetchFirestoreData = async () =>{
//     try{
//         const docSnapShot = await getDoc(dbref);
//         if(docSnapShot.exists()){
//             userData = docSnapShot.data();
            
//         }

//     }
// }










