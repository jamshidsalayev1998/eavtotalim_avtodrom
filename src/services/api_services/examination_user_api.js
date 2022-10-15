import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";

export const getExaminationUserResultByStudent = async (params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token});
        const response = await API({
            url: "/examination-user/results-by-student",
            method: "GET",
            params:params
        })
        if (response?.data) {
            return response;
        }
    } catch (error) {

    }
}

export const getReportByStudent = async (params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token});
        const response = await API({
            url: "/examination-user/report-by-student",
            method: "GET",
            params:params
        })
        if (response?.data) {
            return response;
        }
    } catch (error) {

    }
}

export const getExaminationUserResultByStatistic = async (params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token});
        const response = await API({
            url: "/examination-user/results-by-statistic",
            method: "GET",
            params:params
        })
        if (response?.data) {
            return response;
        }
    } catch (error) {

    }
}
