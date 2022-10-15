import React, {useState, useEffect, useRef} from "react";
import {Badge, Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";
import ReactToPrint from "react-to-print";
import toPrintCss from "../../AdministratorCrud/pages/AllStudents/toPrint.module.css"
// import path from "path"
const data = '<html><body>salom</body></html>';

const PrintPasswordToCheck = ({src, selectedStudent}) => {
    const ref = useRef();

    function bitta() {
        var mywindow = window.open('', 'PRINT', 'height=800,width=1000');

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('<style>' +
            '@media print{ @page { size: 10;margin:0}} body{font-size: 11px !important;}'+
            '</style>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(`<div style="padding: 0;margin: 0"  >
                    <p ><b>F.I.O:</b> ${selectedStudent?.final_test_student?.student_fio}</p>
                    <p ><b>Login:</b> ${selectedStudent?.user?.username}</p>
                    <p ><b>Parol:</b> ${selectedStudent?.user?.password}</p>
                </div>
                <div>
                    <img src=${src}    alt=""/>
                    </div>`)
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    }

    return (
        <>
            <div>
                <div className={'pl-3 pt-3'}>
                    <p><b>F.I.O:</b> {selectedStudent?.final_test_student?.student_fio}</p>
                    <p><b>Pasport:</b> {selectedStudent?.final_test_student?.student_passport}</p>
                    <p><b>Tel:</b> {selectedStudent?.final_test_student?.student_phone?selectedStudent?.final_test_student?.student_phone:''}</p>
                </div>
                <div className={'p-3 text-center'}>
                    <img src={src} alt=""/>
                </div>

            </div>
            <p ref={ref} style={{zIndex: 100, fontWeight: "800 !important"}} className={toPrintCss?.print_div}>
                <div className={''} style={{wordBreak: 'break-all', maxWidth: '250px'}}>
                    <p style={{zIndex: 100, fontWeight: "600", fontFamily: "Algerian"}}>
                        <b>F.I.O:</b> {selectedStudent?.final_test_student?.student_fio}</p>
                    <p><b>Pasport:</b> {selectedStudent?.final_test_student?.student_passport}</p>
                    <p><b>Tel:</b> {selectedStudent?.final_test_student?.student_phone?selectedStudent?.final_test_student?.student_phone:''}</p>

                </div>
                <div className={''}>
                    <img src={src} style={{position: 'relative', width: '200px', alignItems: 'center'}} alt=""/>
                </div>
            </p>
            <button className={'btn btn-light w-100'} onClick={() => {
                bitta()
            }}><i className={'fa fa-print'}></i></button>
            {/*<ReactToPrint  trigger={() => {*/}
            {/*    return <button className={'btn btn-light w-100'}><i className={'fa fa-print'}></i></button>*/}
            {/*}} content={()=>ref?.current&&ref?.current} />*/}
        </>
    );
};

export default withTranslation()(PrintPasswordToCheck);
