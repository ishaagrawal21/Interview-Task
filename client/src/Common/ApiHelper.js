import axios from "axios";

class ApiHelper {
  constructor() {
    axios.interceptors.request.use(
      function (config) {
        config.headers["Authorization"] = localStorage.getItem("token");
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (config) {
        return config;
      },
      function (error) {
        if (
          error?.response?.status === 400 &&
          error.response.data.message === "Unauthrized"
        ) {
          if (window.location.pathname !== "/") {
            window.location.pathname = "/";
          }
        }

        return Promise.reject(error);
      }
    );
    this.baseUrl = "http://localhost:5000";
  }

  getProduct() {
    return axios.get(`${this.baseUrl}/api/products`);
  }
  addProduct(Productdetails) {
    return axios.post(`${this.baseUrl}/api/products`, Productdetails);
  }

  deleteProduct(id) {
    return axios.delete(`${this.baseUrl}/api/products/${id}`);
  }

  updateProduct(productDetails, id) {
    return axios.put(`${this.baseUrl}/api/products/${id}`, productDetails);
  }

  Login(userDetails) {
    return axios.post(`${this.baseUrl}/api/users/login`, userDetails);
  }
  signup(userDetails) {
    return axios.post(`${this.baseUrl}/api/users/register`, userDetails);
  }
}

const apiHelper = new ApiHelper();
export default apiHelper;
