import API from "../../../api";


export const getPaymentReport = async (params={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const response = await API({
            url: '/examination-area/examination-area-payment-report',
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

