import React ,{useState} from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {getExaminationUserResultByStudent, getReportByStudent} from "../api_services/examination_user_api";
import moment from "moment";

export const exportExamResult = (fileName, params = {}) => {
    (async () => {
        let langs = [];
        langs[1] = 'O`zbek(lotin)';
        langs[2] = 'Rus';
        langs[3] = 'O`zbek(kiril)';
        langs[5] = 'Qoraqalpoq';
        const res = await getReportByStudent(params)
        let array = [];
        res?.data?.data?.data?.map((element) => {
            array.push({
                'Avtomaktab': JSON.parse(element?.info)?.organization_name,
                'Guruh': JSON.parse(element?.info)?.group,
                'Tili': langs[element?.lang_id],
                'F.I.O': element?.student_fio,
                'Toifa': JSON.parse(element?.info)?.edu_type_short_name,
                'Imtihon sanasi': moment(element?.created_at).format('YYYY-MM-DD'),
                'Imtihon topshirish': element?.final_access_student?.type === 'resubmit' ? 'Qayta topshirish' :'Birinchi marta',
                'Imtihon bahosi': element?.final_test_student_attempt?.correct_answers*5+'%',
                'Imtihon natijasi': element?.final_test_student_attempt?.correct_answers > 17 ? 'Topshirdi' :'Topshirmadi',
                'Pasport': element?.student_passport,
                'Telefon': element?.student_phone
            })
        })
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(array);
        const wb = {Sheets: {data: ws}, SheetNames: ["data"]};
        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    })()
}