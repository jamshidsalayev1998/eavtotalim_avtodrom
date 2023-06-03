import API_V2 from "../../../api/index_v2";


export const get_queue_info = async (examinationAreaId) => {
    try {
        const response = await API_V2({
            url: "/examination-area-queue/without-auth/"+examinationAreaId,
            method: "GET",
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

