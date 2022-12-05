import API from "../../../api";


export const acceptOnlineApplicationsApi = async (online_application_id ,message, params ={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const data = new FormData();
        data.append('online_application_id' , online_application_id);
         data.append('message' , message);
        const response = await API({
            url: "/examination-administrator/accept-online-application",
            method: "POST",
            params: params,
            headers: {
                'Accept': 'application/json'
            },
            data:data
        });
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {
        return error
    }
};

export const indexOnlineApplicationsApi = async (params ={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const response = await API({
            url: "/examination-administrator/all-online-applications",
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

export const rejectOnlineApplicationsApi = async (online_application_id,message,params ={}) => {
    try {
         const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const data = new FormData();
        data.append('online_application_id' , online_application_id);
        data.append('message' , message);
        const response = await API({
            url: "/examination-administrator/reject-online-application",
            method: "POST",
            params: params,
            headers: {
                'Accept': 'application/json'
            },
            data:data
        });
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {
        return error
    }
};