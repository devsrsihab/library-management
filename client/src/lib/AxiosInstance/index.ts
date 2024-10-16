import axios from "axios";
import envConfig from "../../config/envConfig";

const axiosInstance = axios.create({
  baseURL: envConfig.BASE_API,
  withCredentials: true,
});

export default axiosInstance;
