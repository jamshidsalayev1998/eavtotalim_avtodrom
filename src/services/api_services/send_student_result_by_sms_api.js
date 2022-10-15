import API from "../../api";

export const sendStudentResultBySms = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-user/send-result-sms",
            method: "POST",
            params: {
                'token': token
            },
            data
        })
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {

    }
}
