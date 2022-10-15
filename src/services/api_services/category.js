import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';

export const getCategory = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios({
            url: PATH_PREFIX + "/category",
            method: "GET",
            params: {
                'token': token
            }
        })
        if (response?.data?.status === 1) {
            const data = response?.data?.data
            return data;
        }

     

    } catch (error) {

    }
}
