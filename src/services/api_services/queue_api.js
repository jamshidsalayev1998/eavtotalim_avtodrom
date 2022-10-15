import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";

export const getQueueList = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-user/final-test-queue",
            method: "GET",
            params: {
                'token': token
            }
        })
        if (response?.data) {
            const data = response?.data;
            return data;
        }
    } catch (error) {

    }
}
