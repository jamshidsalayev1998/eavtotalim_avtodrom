import API from "../../../api";


export const changeExaminationAreaStatus = async (params={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const response = await API({
            url: "/examination-director/change-examination-area-status-work",
            method: "POST",
            params,
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

