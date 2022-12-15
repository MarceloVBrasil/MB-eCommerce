import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,//"https://mbecommerce.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
