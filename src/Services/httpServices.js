import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;

export function setCommonHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

//! here is all the function that relevant to to the api
const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  put: axios.put,
};

export default httpService;
