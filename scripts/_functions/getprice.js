const getPrice = async (gameName) => {
  try {
    // Step 1: Search for the game on CheapShark
    const searchUrl = `https://www.cheapshark.com/api/1.0/games?title=${gameName}`;
    const searchResponse = await axios.get(searchUrl);

    // Check if the search was successful
    if (searchResponse.status !== 200) {
      console.error(`Error searching for the game: ${searchResponse.status}`);
      return null;
    }

    const gamesData = searchResponse.data;
    // console.log(gamesData);

    // Check if any game matches the search query
    if (!gamesData || gamesData.length === 0) {
      console.error(`No results found for the game: ${gameName}`);
      return {
        salePrice: 0,
        retailPrice: 0,
        calculatedDiscount: 0,
      };
    }

    // Get the deal ID of the first result
    const dealId = gamesData[0].cheapestDealID;
    // console.log(dealId);

    // Step 2: Get detailed deal information using the deal ID
    const dealUrl = `https://www.cheapshark.com/api/1.0/deals?id=${dealId}`;
    const dealResponse = await axios.get(dealUrl);

    // Check if the deal information retrieval was successful
    if (dealResponse.status !== 200) {
      console.error(`Error getting deal information: ${dealResponse.status}`);
      return {
        salePrice: 0,
        retailPrice: 0,
        calculatedDiscount: 0,
      };
    }

    const dealData = dealResponse.data.gameInfo;
    console.log(dealData);
    // Extract relevant information from the deal data
    const salePrice = Math.trunc(Math.round(dealData.salePrice * 83.34));
    const retailPrice = Math.trunc(Math.round(dealData.retailPrice * 83.34));
    const calculatedDiscount = Math.trunc(
      Math.round(((retailPrice - salePrice) / retailPrice) * 100)
    );

    // Return the information as an object
    return {
      salePrice: salePrice,
      retailPrice: retailPrice,
      calculatedDiscount: calculatedDiscount.toFixed(2),
    };
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    return {
      salePrice: 0,
      retailPrice: 0,
      calculatedDiscount: 0,
    };
  }
};

export default getPrice;
