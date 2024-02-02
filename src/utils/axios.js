import axios from "axios";

const instance = axios.create({
  baseURL: "http://65.1.134.45:4000",
  withCredentials: true,
  timeout: 10000,
  delayed: false,
});

instance.interceptors.request.use(
  (config) => {
    if (config.delayed) {
      return new Promise((resolve) => setTimeout(() => resolve(config), 1000));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
