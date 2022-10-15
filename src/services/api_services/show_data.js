import {PATH_PREFIX} from 'Utils/AppVariables';
import axios from 'axios';
export const show_data = async (path, id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios({
            url: PATH_PREFIX+path,
            method: "GET",
            params: {
                token,
                id
            }
        })

        if (response?.data?.status === 1) {
            const data = response?.data
            return data;
        }


    } catch (error) {

    }
}

export const show_auth_data = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const formdata = new FormData();
        formdata.append("user_id", id);
        const response = await axios({
            url: PATH_PREFIX+"/password-show",
            method: "POST",
            params: {
                token
            },
            data:formdata
        })

        if (response?.status === 200) {
            const data = response?.data
            return data;
        }

    } catch (error) {
        console.log(error)
    }
}