import { PATH_PREFIX_V2 } from "Utils/AppVariables";
import axios from "axios";

const API_V2 = axios.create({
  baseURL: PATH_PREFIX_V2,
});

export default API_V2;
