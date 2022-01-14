import callApi from "./helpers/callApi";

export const getClaims = () => {
  const options = {
    method: "GET",
    url: "/claims",
  };

  return callApi(options);
};

export const sendClaim = (data) => {
  const options = {
    method: "POST",
    url: `/submitClaim`,
    data,
  };

  return callApi(options);
};
