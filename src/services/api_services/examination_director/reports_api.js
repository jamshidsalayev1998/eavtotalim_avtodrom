import API from "../../../api";


export const reportsIndexByOrganizations = async (params={}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const response = await API({
            url: "/examination-director/reports-by-organizations",
            method: "GET",
            params,
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

