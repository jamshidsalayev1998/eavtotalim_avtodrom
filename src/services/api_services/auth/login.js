import API from "../../../api";

export const loginApi = async (data,params) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const data = new FormData();
        data.append('computer_key' , key);
        const response = await API({
            url: "/login",
            method: "POST",
            params: params,
            headers: {
                'Accept': 'application/json'
            },
            data
        });
        if (response?.data) {
            return response;
        }
    } catch (error) {
        return error
    }
};

export const saveUserDataByLogin = (token,name,isnotif) =>{

}

