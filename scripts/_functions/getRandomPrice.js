// import { MOCK_IO_RANDOM_URL } from "../../environment";

let data = [];

const initialfetch = async () => {
  // Step 1: Search for the game on CheapShark
  const baseUrl =
    "https://659550d604335332df8275a6.mockapi.io/epic-carousal/randomgameprices";
  try {
    const response = await axios.get(baseUrl);
    data = response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const getRandomPrice = async () => {
  try {
    let randomInteger = Math.floor(Math.random() * 20);
    // Return the information as an object
    return data[randomInteger];
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    return null;
  }
};

initialfetch();

export default getRandomPrice;

// Example usage:
// const gameName = "YourGameName";
// getGameDealInfo(gameName)
//   .then((dealInfo) => {
//     if (dealInfo) {
//       console.log(`Sale Price: $${dealInfo.salePrice}`);
//       console.log(`Retail Price: $${dealInfo.retailPrice}`);
//       console.log(`Calculated Discount: ${dealInfo.calculatedDiscount}%`);
//     }
//   })
//   .catch((error) => console.error(`An error occurred: ${error.message}`));
