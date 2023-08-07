import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Container } from "reactstrap";
import styleModule from "./style.module.css";
import { useRouteMatch } from "react-router";
import { getStudentCertificate } from "../../../../../services/api_services/administrator_students_api";
import QRCode from "qrcode";
import { Certificate } from "./Certificate";
import { useReactToPrint } from "react-to-print";
import { PATH_PREFIX_FILE } from "Utils/AppVariables";

const CertificateShow = props => {
  const [data, setData] = useState();
  const [eduType, setEduType] = useState();
  const [examinationArea, setExaminationArea] = useState();
  const [src, setSrc] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const match = useRouteMatch("/examination-administrator/certificate/:id");
  useEffect(() => {
    (async () => {
      const response = await getStudentCertificate(match?.params?.id);
      if (response?.data?.status == 1) {
        setData(response.data?.certificate);
        setEduType(response.data?.edu_type);
        setExaminationArea(response?.data?.examinationArea);
        QRCode.toDataURL(
          PATH_PREFIX_FILE +
            "check-certificate/" +
            response.data?.certificate?.key
        ).then(res => {
          setSrc(res);
        });
      }
    })();
  }, []);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5>Sertifikat </h5>
                <button className="btn btn-light" onClick={handlePrint}>
                  <i className="fa fa-print"></i>
                </button>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Certificate
                data={data}
                eduType={eduType}
                examinationArea={examinationArea}
                src={src}
                ref={componentRef}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default CertificateShow;
