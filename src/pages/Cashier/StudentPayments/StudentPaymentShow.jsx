import React, {useState, useEffect, useRef} from "react";
import {Card, CardBody, Container, Row, Col, Badge} from "reactstrap";
import {useReactToPrint} from 'react-to-print';
import {StudentPaymentReceipt} from "./StudentPaymentReceipt";
import {withTranslation, useTranslation} from "react-i18next";
import {useHistory} from "react-router";


const StudentPaymentShow = () => {
    const [data, setData] = useState();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const {t} = useTranslation();
    const history = useHistory();

    return (<>
        <div className="page-content">
            <Container fluid>
                <Card>
                    <CardBody>
                        <div className="top-organizations">
                            <div className={'d-flex'}>
                                <span className="mr-3" onClick={() => history.goBack()} style={{cursor:'pointer'}}>
                                    <i className="bx bx-arrow-back"> </i>
                                </span>
                                <h5 className="text-dark">{t("To'lov kvitansiyasi")}</h5>
                            </div>
                            <button className="btn btn-light" onClick={handlePrint}><i className="fa fa-print"></i>
                            </button>
                        </div>
                        <div className="crypto-buy-sell-nav mt-3">
                            <StudentPaymentReceipt data={data} ref={componentRef}/>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </div>
    </>)
}

export default StudentPaymentShow