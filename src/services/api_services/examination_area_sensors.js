import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";

export const getExaminationAreaSensor = async (params={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token});
        const response = await API({
            url: "/examination-area/sensor",
            method: "GET",
            params: params,
            headers:{
                'Accept':'application/json'
            }
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
};
export const showExaminationAreaSensor = async (itemId,params={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token});
        const response = await API({
            url: "/examination-area/sensor/"+itemId,
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
export const storeExaminationAreaSensor = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/sensor",
            method: "POST",
            params: {
                'token': token
            },
            data:formData
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}
export const updateExaminationAreaSensor = async (formData,carId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/sensor/"+carId,
            method: "POST",
            params: {
                'token': token,
                '_method':'PUT'
            },
            data:formData
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}
export const deleteExaminationAreaSensor = async (carId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/sensor/"+carId,
            method: "DELETE",
            params: {
                'token': token
            },
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}
export const storeExaminationAreaSensorPenalty = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/sensor-penalty",
            method: "POST",
            params: {
                'token': token
            },
            data:formData
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}
export const deleteExaminationAreaSensorPenalty = async (itemId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/sensor-penalty/"+itemId,
            method: "DELETE",
            params: {
                'token': token
            },
        })
        if (response?.data) {
            const data = response?.data;
            return data;
        }
    } catch (error) {

    }
}
export const updateExaminationAreaSensorPenalty = async (formData,carId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/sensor-penalty/"+carId,
            method: "POST",
            params: {
                'token': token,
                '_method':'PUT'
            },
            data:formData
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}