import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";

export const getExaminationPaymentType = async (additionalParams = {}) => {
    try {
        const token = localStorage.getItem("token");
        let params = {};
        Object.assign(params,{token:token});
        Object.assign(params,additionalParams);
        const response = await API({
            url: "/examination-area/payment-type",
            method: "GET",
            params:params
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}
export const storeExaminationPaymentType = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/payment-type",
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
export const updateExaminationPaymentType = async (formData,paymentTypeId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/payment-type/"+paymentTypeId,
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
export const deleteExaminationPaymentType = async (paymentTypeId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-area/payment-type/"+paymentTypeId,
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
