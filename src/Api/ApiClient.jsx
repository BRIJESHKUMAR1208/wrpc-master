import axios from "axios";

const res = await fetch('/config.json');
const config = await res.json();
export const BASE_URL = config["API_URL"];
const instance = axios.create({
 // baseURL: "http://localhost:5141/",
  //baseURL: "http://localhost",
  //  // baseURL: "https://wrpcgov.com/",
    //  baseURL: "https://wrpc.gov.in/",
   // baseURL : 'https://mum.wrpc.gov.in/',
   baseURL: BASE_URL,
});
console.log(BASE_URL)


instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.reload('/'); // You might want to redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default instance;