import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';

export const indexComputersApi = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios({
            url: PATH_PREFIX + "/examination-director/computer",
            method: "GET",
            params: {
                'token': token
            }
        })
        if (response?.data?.status === 1) {
            const data = response?.data?.data
            return data;
        }
    } catch (error) {
        return error;
    }
}

export const storeComputersApi = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios({
            url: PATH_PREFIX + "/examination-director/computer",
            method: "POST",
            params: {
                'token': token
            },
            data:data
        })
        return response?.data;
    } catch (error) {
        console.log('iiiiy' , error)
        return error;
    }
}
export const updateComputersApi = async (data,elementId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios({
            url: PATH_PREFIX + "/examination-director/computer/"+elementId,
            method: "PUT",
            params: {
                'token': token
            },
            data:data
        })
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const deleteComputersApi = async (elementId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios({
            url: PATH_PREFIX + "/examination-director/computer/"+elementId,
            method: "DELETE",
            params: {
                'token': token
            },
        })
        return response?.data;
    } catch (error) {
        return error;
    }
}
export const clearComputerApi = async (elementId) => {
    try {
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append('computer_id' , elementId);
        const response = await axios({
            url: PATH_PREFIX + "/examination-director/clear-computer",
            method: "POST",
            params: {
                'token': token
            },
            data:data
        })
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const changeComputerApi = async (elementId) => {
    try {
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append('computer_id' , elementId);
        const response = await axios({
            url: PATH_PREFIX + "/examination-director/change-random-computer",
            method: "POST",
            params: {
                'token': token
            },
            data:data
        })
        return response?.data;
    } catch (error) {
        return error;
    }
}