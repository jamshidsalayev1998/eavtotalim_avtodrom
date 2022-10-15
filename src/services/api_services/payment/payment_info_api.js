import API from "../../../api";


export const getPaymentInfo = async (itemId,params={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const response = await API({
            url: "/cashier/payment-info/"+itemId,
            method: "GET",
            params: params,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response?.data) {
            return response?.data?.data;
        }
    } catch (error) {
        return error
    }
};

