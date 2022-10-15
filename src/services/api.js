import axios from 'axios';

import { PATH_PREFIX } from 'Utils/AppVariables';

export const getCategory = async () => {
    try {

        const token = localStorage.getItem("token");
        const response = await axios({
            url:PATH_PREFIX+"/category",
            method:"GET",
            params: {
                'token':token
            }
        })

        const data = await response.data;

        if(data?.status === 1){
            return data;
        }


    } catch (error) {
        const err = await error.response;
        return err;
    }
}