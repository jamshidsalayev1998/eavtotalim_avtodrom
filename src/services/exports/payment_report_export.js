import React, {useState} from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import {getPaymentReport} from "../api_services/payment/payment_report_api";

export const exportPaymentReportFunction = (fileName, params = {}) => {
    (async () => {
        const response = await getPaymentReport(params);
        if (parseInt(response?.status) === 1) {
            let result = [];
            const myData = response?.data;
            const filters = response?.filters;
            const res = myData?.map((element) => {
                let tempArray =  {
                    'Toifa': element?.eduType?.short_name_en,
                };
                let yy = filters?.examinationAreaPaymentTypes?.map((elementEPType) => {
                    Object.assign(tempArray,{[elementEPType?.name]:{'nimadir':'sd','nimadir2':'rr'}})
                });
                result.push(tempArray)
            });
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const ws = XLSX.utils.json_to_sheet(result);
            const wb = {Sheets: {data: ws}, SheetNames: ["data"]};
            const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, fileName + fileExtension);
        }
    })()
}