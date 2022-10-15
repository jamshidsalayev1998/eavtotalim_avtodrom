import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";

export const getExaminationAreaCars = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/car",
            method: "GET",
            params: {
                'token': token
            },
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
}
export const storeExaminationAreaCars = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/car",
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
export const updateExaminationAreaCars = async (formData,carId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/car/"+carId,
            method: "PUT",
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
export const deleteExaminationAreaCars = async (carId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/car/"+carId,
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
