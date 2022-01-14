import axios from "axios";
import config from "../../config";

const axiosApiInstance = axios.create();

axiosApiInstance.defaults.withCredentials = true;
axiosApiInstance.defaults.baseURL = config.apiURL;

export default axiosApiInstance;
