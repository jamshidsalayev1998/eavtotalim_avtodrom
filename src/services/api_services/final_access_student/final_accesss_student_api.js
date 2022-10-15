import API from "../../../api";


export const updateFinalAccessStudent = async (itemId,data,params={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const response = await API({
            url: "/examination-area/final-access-student-edit/"+itemId,
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

export const editFinalAccessStudent = async (itemId,params={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const response = await API({
            url: "/examination-area/final-access-student-edit/"+itemId,
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

