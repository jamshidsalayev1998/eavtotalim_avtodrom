import { PATH_PREFIX } from "Utils/AppVariables";
import axios from "axios";

const API = axios.create({
  baseURL: PATH_PREFIX,
  // withCredentials:true
});
export default API;
