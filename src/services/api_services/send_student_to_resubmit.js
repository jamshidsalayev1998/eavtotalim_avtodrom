import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";
import {createBrowserHistory} from "history"


export const sendStudentToResubmit = async (elementId) => {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('final_access_student_id', elementId);
        const response = await API({
            url: "/examination-administrator/send-student-to-resubmit",
            method: "POST",
            params: {
                'token': token
            },
            data: formData
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}

export const sendStudentToResubmitAllResponse = async (elementId) => {

    try {
        const history = createBrowserHistory();

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('final_access_student_id', elementId);
        const response = await API({
            url: "/examination-administrator/send-student-to-resubmit",
            method: "POST",
            params: {
                'token': token
            },
            data: formData
        })
        if (response?.data) {
            if (response?.data?.status == 1) {
                message.success(response?.data?.message);
            }
            if (response?.data?.status == 0) {
                message.error(response?.data?.message);
            }
            return response?.data?.status;
        }
    } catch (error) {

    }
}