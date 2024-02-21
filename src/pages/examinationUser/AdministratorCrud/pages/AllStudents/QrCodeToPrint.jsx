import React, { useState, useEffect, useRef } from "react";
import { Badge, Button, Card, CardBody, Container } from "reactstrap";
import { withTranslation } from "react-i18next";
import ReactToPrint from "react-to-print";
import toPrintCss from "./toPrint.module.css";
import { Image } from "antd"
// import path from "path"
const data = "<html><body>salom</body></html>";

const QrCodeToPrint = ({ src, selectedStudent }) => {
  const ref = useRef();

  function bitta() {
    var mywindow = window.open("", "PRINT", "height=800,width=1000");

    mywindow.document.write(
      "<html><head><title>" + document.title + "</title>"
    );
    mywindow.document.write(
      "<style>" +
      "@media print{ @page { size: 10;margin:0}} body{font-size: 11px !important;}" +
      "</style>"
    );
    mywindow.document.write("</head><body >");
    mywindow.document.write(`<div style="padding: 0;margin: 0"  >
<div style="text-align: center; font-size: 40px">
<b>
 ${selectedStudent?.unikal_number ? selectedStudent?.unikal_number : ""}
 </b>
</div>
<div style="text-align: center">
                    <p >Familiya ism otasining ismi: </p>
</div>
<div style="text-align: center">
<b>
 ${selectedStudent?.student_fio}
 </b>
</div>
                <p><b>Pasport:</b> ${selectedStudent?.student_passport}</p>
                 
                     <p><b>Test topshirish
                    holati:</b> ${selectedStudent?.type == "resubmit"
        ? "Qayta topshirish"
        : "Birinchi marta"
      }</p>
          
                </div>
                <div style="text-align: center">
                    <img src=${src}    alt=""/>
                    </div>`);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  }

  return (
    <>
      <div className="border rounded">
        <div className={"pl-3 pt-3"}>
          <h3>{selectedStudent?.id}</h3>
          <p>
            <b>F.I.O:</b> {selectedStudent?.student_fio}
          </p>
          <p>
            <b>Pasport:</b> {selectedStudent?.student_passport}
          </p>
          <p>
            <b>Kelish vaqti:</b> {selectedStudent?.access_start_date}{" "}
            {selectedStudent?.access_start_time}
          </p>
          <p>
            <b>Tel:</b> {selectedStudent?.student_phone}
          </p>
          <p>
            <b>Talim turi:</b> {selectedStudent?.edu_type?.short_name_uz}
          </p>
          <p>
            <b>Test topshirish holati:</b>{" "}
            {selectedStudent?.type == "resubmit" ? (
              <Badge color={"warning"}>Qayta topshirish</Badge>
            ) : (
              <Badge color={"primary"}>Birinchi marta</Badge>
            )}
          </p>
          <p>
            <b>To`lov holati(Nazariy/Amaliy)</b>
            {selectedStudent?.payment_status ? (
              <Badge color={"success"}>To'lov qilingan</Badge>
            ) : (
              <Badge color={"danger"}>To'lov qilinmagan</Badge>
            )}
            /
            {selectedStudent?.practical_payment_status ? (
              <Badge color={"success"}>To'lov qilingan</Badge>
            ) : (
              <Badge color={"danger"}>To'lov qilinmagan</Badge>
            )}
          </p>
          <p>
            <b>Test topshirganlik holati(Nazariy/Amaliy)</b>
            {selectedStudent?.exam_result == 1 ? (
              <Badge color={"success"}>O`tgan</Badge>
            ) : selectedStudent?.exam_result == 0 ? (
              <Badge color={"danger"}>Yiqilgan</Badge>
            ) : (
              <Badge color={"warning"}>Topshirmagan</Badge>
            )}
            /
            {selectedStudent?.practical_exam_result == 1 ? (
              <Badge color={"success"}>O`tgan</Badge>
            ) : selectedStudent?.practical_exam_result == 0 ? (
              <Badge color={"danger"}>Yiqilgan</Badge>
            ) : (
              <Badge color={"warning"}>Topshirmagan</Badge>
            )}
          </p>
        </div>
        <div className={"p-3 text-center"}>
          <img src={src} alt="" />
        </div>
      </div>
      <Button
        className={"btn btn-light w-100 mt-3"}
        onClick={() => {
          bitta();
        }}
      >
        <i className={"fa fa-print text-dark"}></i>
      </Button>
      <Image
        style={{width:'100%'}}
        src={selectedStudent?.image}
      />
    </>
  );
};

export default withTranslation()(QrCodeToPrint);
