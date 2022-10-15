import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";

export const getExaminationAreaConfig = async (params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token})
        const response = await API({
            url: "/examination-director/examination-area-config",
            method: "GET",
            params: params,
            headers:{
                'Accept':'application/json'
            }
        })
        if (response?.data) {
            const data = response?.data;
            return data;
        }
    } catch (error) {

    }
}

export const storeExaminationAreaConfig = async (data,params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token})
        const response = await API({
            url: "/examination-director/examination-area-config",
            method: "POST",
            params: params,
            headers:{
                'Accept':'application/json'
            },
            data:data
        })
        if (response?.data) {
            const data = response?.data;
            return data;
        }
    } catch (error) {

    }
}

