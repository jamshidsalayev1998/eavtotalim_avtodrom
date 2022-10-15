import axios from "axios";
import { debounce } from "lodash";
import { useState } from "react";
import { PATH_PREFIX } from "Utils/AppVariables";




export default function useDebounce(value, delay){
    const [result, setResult] = useState([]);
    const token = localStorage.getItem('token');
    const formdata = new FormData();
    formdata.append("search", value)
   debounce(() => {
        axios({
            url: PATH_PREFIX+"/region",
            method: "GET",
            params: {
                'token': token
            }
        }).then((response) => {
            if(response.data.status === 1){
                setResult(response.data.data)
            }
        })
    }, delay)

    return result;
}