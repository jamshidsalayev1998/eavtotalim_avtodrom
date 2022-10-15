import React from 'react'
import API from "../../api";

export const generalApi = async (params = {},url) => {
    try {
        const token = localStorage.getItem('token');
        Object.assign(params,{token:token})
        const response = await API({
            url: url,
            method: 'GET',
            params: params,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.status == 200) {
            return response?.data;
        }
    } catch (err) {

    }
}