import React, { useEffect, useState } from "react";
import "./print.css";
import { Row, Col } from "antd";
import { getExaminationAreaConfig } from "../../../../services/api_services/examination_area_config_api";
import moment from "moment";
import QRCode from "qrcode";
import logoBlueBig from "../../../../assets/images/logo_mini.png";
import { PATH_PREFIX_FILE } from "Utils/AppVariables";

const PrintReportByStudent = props => {
  const { selectedStudent } = props;
  const [examinationAreaInfo, setExaminationAreaInfo] = useState();
  const [qrCodeSrc, setQrCodeSrc] = useState();
  useEffect(() => {
    (async () => {
      const response = await getExaminationAreaConfig({});
      if (response) {
        setExaminationAreaInfo(response);
        QRCode.toDataURL(
          response?.name +
            " | " +
            selectedStudent?.student_fio +
            " | " +
            moment().format("YYYY-MM-DD")
        ).then(res => {
          setQrCodeSrc(res);
        });
      }
    })();
  }, []);

  return (
    <div
      style={{ fontSize: "25px", padding: "20px" }}
      className={"bg-intalim-image"}
    >
      <Row className={"justify-content-center mt-3"}>
        <img
          style={{ width: "150px" }}
          src={PATH_PREFIX_FILE + examinationAreaInfo?.logo}
          alt=""
        />
      </Row>
      <Row className={"justify-content-center mt-3"}>
        <h1>Bayonnoma</h1>
      </Row>
      <Row>
        <p>
          Hurmatli <b>{selectedStudent?.student_fio}</b> siz{" "}
          <b>"{examinationAreaInfo?.name}"</b> test markazida test sinovlarida
          qatnashdingiz.
        </p>
        <p>
          Nazariy testda{" "}
          <b>{selectedStudent?.final_test_student_attempt?.correct_answers}</b>{" "}
          ta to'g'ri javobni topgan holda nazariy testdan{" "}
          <b>
            {selectedStudent?.exam_result == 1
              ? "o`tdingiz"
              : "o`ta olmadingiz"}
          </b>
          .
        </p>
        <p>
          {selectedStudent?.exam_result ? (
            <>
              Amaliy sinovdan{" "}
              <b>{selectedStudent?.practical_exam_penalty_ball}</b> jarima bali
              to`plagan holda{" "}
              <b>
                {selectedStudent?.practical_exam_result == 1
                  ? "o`tdingiz"
                  : "o`ta olmadingiz"}
              </b>
            </>
          ) : (
            ""
          )}
        </p>
        <p>
          Umumiy natijada siz test va sinovlardan :{" "}
          <b>
            {parseInt(selectedStudent?.exam_result) &&
            parseInt(selectedStudent?.practical_exam_result)
              ? "muvofaqiyatli o'tdingiz"
              : "afsuski o'ta olmadingiz"}
          </b>
        </p>
        <p>
          {parseInt(selectedStudent?.exam_result) &&
          parseInt(selectedStudent?.practical_exam_result)
            ? ""
            : "Siz qayta test topshirish uchun " +
              moment(selectedStudent?.final_test_student_attempt?.created_at)
                .add(8, "days")
                .format("YYYY-MM-DD") +
              " sanadan keyin kelishingiz mumkin"}
        </p>
      </Row>
    </div>
  );
};

export default PrintReportByStudent;
