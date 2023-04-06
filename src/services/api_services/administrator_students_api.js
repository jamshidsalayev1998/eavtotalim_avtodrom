import API_V2 from "api/index_v2";
import API from "../../api";

export const getAllStudentsForAdministrator = async params => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: "/examination-administrator/all-students",
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {
    return error;
  }
};
export const getStudentCertificate = async finalStudentAccessId => {
  try {
    let params = {};
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: `/examination-administrator/certificate/${finalStudentAccessId}`,
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const addStudentToComes = async (params, data) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: `/examination-administrator/add-student`,
      method: "POST",
      params: params,
      headers: {
        Accept: "application/json",
      },
      data: data,
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const getOrganizations = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: `/examination-administrator/get-organizations`,
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    return response?.data;
  } catch (e) {
    return e;
  }
};

export const getVisitorTypes = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API_V2({
      url: `/examination-administrator/visitor-type`,
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    if (response?.data?.message === "Success") {
      return response?.data;
    }
  } catch (e) {
    return e;
  }
};

// {
//     "data": [
//         {
//             "id": 1,
//             "name": "Oddiy",
//             "description": "Oddiy imtihon topshiruvchi",
//             "edu_type_visitor_types": [
//                 {
//                     "edu_type_id": 1,
//                     "description": "Original pasport va maktab bergan original guvohnoma bilan keladi\n                        -Pasport dannisi (Pasport seriya raqam fuqaroning tugilgan vaqti)\n                        -Qaysi maktab bitirgani ma`lumoti kiritiladi\n                        -Yosh chegarasi avtomatik tekshiriladi\n                        -083 seriya raqami va fayli kiritiladi (1 dona fayl kiritishga scannerga to`gridan to`gri o`tsin )\n                         -Maktab tomonidan berilgan guvohnoma seriya raqami kiritiladi nusxalari biriktiriladi(1 ta fayl kiritishga scannerga to`gridan to`gri o`tsin )\n                        (hujjat berilgan sanani kiritish)",
//                     "edu_type": {
//                         "id": 1,
//                         "name": "«B» toifali avtotransport vositalari haydovchilarini tayyorlash",
//                         "short_name": "В  tayyorlash",
//                         "character_name": "B",
//                         "image": "/edu_type_img/B.png"
//                     },
//                     "file_types": [
//                         {
//                             "id": 1,
//                             "file_key": "med_file",
//                             "type": {
//                                 "name": "Tibbiy ma`lumotnoma nusxasi",
//                                 "type": "pdf",
//                                 "required": 1
//                             }
//                         },
//                         {
//                             "id": 2,
//                             "file_key": "school_license",
//                             "type": {
//                                 "name": "Avtomaktab tomonidan berilgan guvohnoma",
//                                 "type": "pdf",
//                                 "required": 1
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     "edu_type_id": 2,
//                     "description": "Original pasport va maktab bergan original guvohnoma bilan keladi\n                        -Pasport dannisi (Pasport seriya raqam fuqaroning tugilgan vaqti)\n                        -Qaysi maktab bitirgani ma`lumoti kiritiladi\n                        -Yosh chegarasi avtomatik tekshiriladi\n                        -083 seriya raqami va fayli kiritiladi (1 dona fayl kiritishga scannerga to`gridan to`gri o`tsin )\n                         -Maktab tomonidan berilgan guvohnoma seriya raqami kiritiladi nusxalari biriktiriladi(1 ta fayl kiritishga scannerga to`gridan to`gri o`tsin )\n                        (hujjat berilgan sanani kiritish)",
//                     "edu_type": {
//                         "id": 2,
//                         "name": "«A» toifali mototransport vositalari haydovchilarini tayyorlash",
//                         "short_name": "A  tayyorlash",
//                         "character_name": "A",
//                         "image": "/edu_type_img/A.png"
//                     },
//                     "file_types": [
//                         {
//                             "id": 3,
//                             "file_key": "med_file",
//                             "type": {
//                                 "name": "Tibbiy ma`lumotnoma nusxasi",
//                                 "type": "pdf",
//                                 "required": 1
//                             }
//                         },
//                         {
//                             "id": 4,
//                             "file_key": "school_license",
//                             "type": {
//                                 "name": "Avtomaktab tomonidan berilgan guvohnoma",
//                                 "type": "pdf",
//                                 "required": 1
//                             }
//                         }
//                     ]
//                 },
//             ]
//     ],
//     "message": "Success"
// }

// "edu_type_visitor_types": [
//     {
//         "edu_type_id": 1,
//         "description": "Original pasport va maktab bergan original guvohnoma bilan keladi\n                        -Pasport dannisi (Pasport seriya raqam fuqaroning tugilgan vaqti)\n                        -Qaysi maktab bitirgani ma`lumoti kiritiladi\n                        -Yosh chegarasi avtomatik tekshiriladi\n                        -083 seriya raqami va fayli kiritiladi (1 dona fayl kiritishga scannerga to`gridan to`gri o`tsin )\n                         -Maktab tomonidan berilgan guvohnoma seriya raqami kiritiladi nusxalari biriktiriladi(1 ta fayl kiritishga scannerga to`gridan to`gri o`tsin )\n                        (hujjat berilgan sanani kiritish)",
//         "edu_type": {
//             "id": 1,
//             "name": "«B» toifali avtotransport vositalari haydovchilarini tayyorlash",
//             "short_name": "В  tayyorlash",
//             "character_name": "B",
//             "image": "/edu_type_img/B.png"
//         },
//         "file_types": [
//             {
//                 "id": 1,
//                 "file_key": "med_file",
//                 "type": {
//                     "name": "Tibbiy ma`lumotnoma nusxasi",
//                     "type": "pdf",
//                     "required": 1
//                 }
//             },
//             {
//                 "id": 2,
//                 "file_key": "school_license",
//                 "type": {
//                     "name": "Avtomaktab tomonidan berilgan guvohnoma",
//                     "type": "pdf",
//                     "required": 1
//                 }
//             }
//         ]
//     },
//     {
//         "edu_type_id": 2,
//         "description": "Original pasport va maktab bergan original guvohnoma bilan keladi\n                        -Pasport dannisi (Pasport seriya raqam fuqaroning tugilgan vaqti)\n                        -Qaysi maktab bitirgani ma`lumoti kiritiladi\n                        -Yosh chegarasi avtomatik tekshiriladi\n                        -083 seriya raqami va fayli kiritiladi (1 dona fayl kiritishga scannerga to`gridan to`gri o`tsin )\n                         -Maktab tomonidan berilgan guvohnoma seriya raqami kiritiladi nusxalari biriktiriladi(1 ta fayl kiritishga scannerga to`gridan to`gri o`tsin )\n                        (hujjat berilgan sanani kiritish)",
//         "edu_type": {
//             "id": 2,
//             "name": "«A» toifali mototransport vositalari haydovchilarini tayyorlash",
//             "short_name": "A  tayyorlash",
//             "character_name": "A",
//             "image": "/edu_type_img/A.png"
//         },
//         "file_types": [
//             {
//                 "id": 3,
//                 "file_key": "med_file",
//                 "type": {
//                     "name": "Tibbiy ma`lumotnoma nusxasi",
//                     "type": "pdf",
//                     "required": 1
//                 }
//             },
//             {
//                 "id": 4,
//                 "file_key": "school_license",
//                 "type": {
//                     "name": "Avtomaktab tomonidan berilgan guvohnoma",
//                     "type": "pdf",
//                     "required": 1
//                 }
//             }
//         ]
//     },
// ]
