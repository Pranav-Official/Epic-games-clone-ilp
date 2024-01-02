import axios from "axios";

async function fetchData(
  apiKey: string,
  parameterList: Array<[string, ...string[]]>
) {
  const baseUrl = "https://api.rawg.io/api/games";
  const queryParams: string[] = [`key=${apiKey}`];

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

export default fetchData;
