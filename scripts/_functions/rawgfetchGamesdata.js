//Make sure to install Axios before using

async function fetchData(apiKey, parameterList) {
  const baseUrl = "https://api.rawg.io/api/games";
  const queryParams = [`key=${apiKey}`];

  // Process the parameter list
  parameterList.forEach(([param, ...values]) => {
    const paramValue = values.join(",");
    queryParams.push(`${param}=${paramValue}`);
  });

  const apiUrl = `${baseUrl}?${queryParams.join("&")}`;
  console.log(apiUrl);
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export default fetchData; // Export the fetchData;

// Example usage
// const apiKey = "c743276cb3944c4ead359796d7c95793";
// const parameterList = [
//   ["platforms", "4"],
//   ["metacritic", "90", "100"],
//   ["ordering", "-released"],
// ];

// fetchData(apiKey, parameterList)
//   .then((data) => {
//     console.log("Fetched data:", data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
