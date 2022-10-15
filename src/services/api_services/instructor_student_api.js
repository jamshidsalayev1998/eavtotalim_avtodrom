import API from "../../api";

export const getAllStudents = async (params = {}) => {
    try {
        const token = localStorage.getItem("token");
        params['token'] = token;
        const response = await API({
            url: "/examination-instructor/students",
            method: "GET",
            params:params
        })
        if (response?.data) {
            return response;
        }
    } catch (error) {

    }
}
export const getExaminationAreaInstructorCars = async (params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token:token})
        const response = await API({
            url: "/examination-instructor/cars",
            method: "GET",
            params: params
        })
        if (response?.data) {
            return response;
        }
    } catch (error) {

    }
}
export const examinationAreaInstructorStudentCarMerge = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-instructor/merge",
            method: "POST",
            params: {
                'token': token
            },
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            data: data
        })
        if (response?.data) {
            return response;
        }
    } catch (error) {

    }
}
export const instructorStudentCarStartExam = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/practical-car/tablet-start-exam",
            method: "POST",
            params: {
                'token': token
            },
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            data: data
        })
        if (response?.data) {
            return response;
        }
    } catch (error) {

    }
}
export const instructorMyExaminationArea = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/examination-instructor/my-examination-area",
            method: "GET",
            params: {
                'token': token
            },
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        })
        if (response?.data) {
            return response?.data;
        }
    } catch (error) {

    }
}
export const examinationAreaInstructorStudentCarUnMerge = async (dataObject) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/practical-car/tablet-finish-exam",
            method: "POST",
            params: {
                'token': token
            },
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            data: dataObject
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}
export const instructorStudentCarFinishExam = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API({
            url: "/practical-car/tablet-finish-exam",
            method: "POST",
            params: {
                'token': token
            },
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            data: data
        })
        if (response?.data) {
            return response;
        }
    } catch (error) {

    }
}

