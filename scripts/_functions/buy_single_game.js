import fetchGameData from "./rawgFetchSingleGame.js";
import getPrice from "./getprice.js";
import { addtoTransactionInFirebase } from "./transaction_function.js";

let gameData = {
  date: "",
  name: "",
  background_image: "",
  salePrice: 1000,
  retailPrice: 800,
};

const sigleGameDOMUpdate = (gameData) => {
  document.querySelector("#cart-title").innerHTML = gameData.name;
  document
    .querySelector("#cart-game-image")
    .setAttribute("src", gameData.background_image);
  document.querySelector("#retail-price").innerHTML =
    "₹" + gameData.retailPrice;
  document.querySelector("#discount-price").innerHTML =
    "₹" + (gameData.retailPrice - gameData.salePrice);
  document.querySelector("#Total-price").innerHTML = "₹" + gameData.salePrice;
};

const buySingleGame = async () => {
  const gameSlug = localStorage.getItem("gameSlug-info");
  const data = await fetchGameData(gameSlug);
  let price = await getPrice(gameSlug);
  if (price == "null") {
    let price = {
      salePrice: 1000,
      retailPrice: 800,
      calculatedDiscount: 20,
    };
  }
  gameData = {
    id: data.id,
    slug: data.slug,
    name: data.name,
    background_image: data.background_image,
    retailPrice: price.retailPrice,
    salePrice: price.salePrice,
  };
  console.log(gameData);
  setTimeout(() => {
    sigleGameDOMUpdate(gameData);
  }, 0);
};

await buySingleGame();

export const placeOrder = async () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  gameData.date = formattedDate;
  try {
    await addtoTransactionInFirebase(gameData);
    return true;
  } catch (error) {
    return false;
  }
};
