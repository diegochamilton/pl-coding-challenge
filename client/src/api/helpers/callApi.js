import axios from "../axios";

export default async ({ url, method, params, data }) => {
  const response = await axios({ url, method, params, data });
  console.log(response);
  return response.data;
};
