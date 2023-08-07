import API from "../../api";

export const getStudentPracticalExamResult = async finalTestStudentAccessId => {
  try {
    const token = localStorage.getItem("token");
    const response = await API({
      url: `/examination-instructor/student-practical-exam-results/${finalTestStudentAccessId}`,
      method: "GET",
      params: {
        token: token,
      },
      headers: {
        Accept: "application/json",
      },
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {}
};
export const getStudentPracticalExamResultByRecord =
  async finalTestRecordId => {
    try {
      const token = localStorage.getItem("token");
      const response = await API({
        url: `/examination-instructor/student-practical-exam-results-by-record/${finalTestRecordId}`,
        method: "GET",
        params: {
          token: token,
        },
        headers: {
          Accept: "application/json",
        },
      });
      if (response?.data) {
        const data = response;
        return data;
      }
    } catch (error) {}
  };
