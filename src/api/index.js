import axios from "axios";
import { PATH_PREFIX } from "../Utils/AppVariables";

const API = axios.create({
  baseURL: PATH_PREFIX,
  // withCredentials:true
});
export default API;
