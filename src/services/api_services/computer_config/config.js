import API from "../../../api";


export const getComputerConfig = async (params={}) => {
    try {
        const token = localStorage.getItem("token");
        const computerKey = localStorage.getItem('computer_key');
        if (computerKey) {
            Object.assign(params, {computer_key: computerKey});
        }
        Object.assign(params, {token: token});
        const response = await API({
            url: "/examination-director/computer-config",
            method: "GET",
            params: params,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {
        return error
    }
};

export const setComputerConfig = async (key,params ={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const data = new FormData();
        data.append('computer_key' , key);
        const response = await API({
            url: "/examination-director/computer-config",
            method: "POST",
            params: params,
            headers: {
                'Accept': 'application/json'
            },
            data
        });
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {
        return error
    }
};

export const getComputerConfigNoAuth = async (params={}) => {
    try {
        const token = localStorage.getItem("token");
        const computerKey = localStorage.getItem('computer_key');
        if (computerKey) {
            Object.assign(params, {computer_key: computerKey});
        }
        Object.assign(params, {token: token});
        const response = await API({
            url: "/computer-config-no-auth",
            method: "GET",
            params: params,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {
        return error
    }
};

export const setComputerConfigNoAuth = async (key,params ={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const data = new FormData();
        data.append('computer_key' , key);
        const response = await API({
            url: "/computer-config-no-auth",
            method: "POST",
            params: params,
            headers: {
                'Accept': 'application/json'
            },
            data
        });
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {
        return error
    }
};


