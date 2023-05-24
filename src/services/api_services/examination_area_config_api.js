import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";
import API_V2 from "../../api/index_v2";

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
export const storeExaminationAreaComissions = async (data,params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token})
        const response = await API_V2({
            url: "/comission",
            method: "POST",
            params: params,
            headers:{
                'Accept':'application/json'
            },
            data:{
                "subscribers":data
            }
        })
        if (response?.data) {
            const data = response?.data;
            return data;
        }
    } catch (error) {

    }
}

export const getExaminationAreaComissions = async (params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token})
        const response = await API_V2({
            url: "/comission",
            method: "GET",
            params: params,
            headers:{
                'Accept':'application/json'
            }
        })
        if (response?.data) {
            const data = response?.data?.data;
            return data;
        }
    } catch (error) {

    }
}