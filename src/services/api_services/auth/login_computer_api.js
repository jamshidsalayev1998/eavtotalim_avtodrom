import API from "../../../api";

export const loginByComputerKey = async (data,params = {}) => {
    try {
        const response = await API({
            url: "/login-by-computer-key",
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

export const checkByComputerKey = async (computerKey) => {
    try {
        const params = {
            computer_key:computerKey
        };
        const response = await API({
            url: "/check-computer-key",
            method: "GET",
            params: params,
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {
        return error
    }
};



