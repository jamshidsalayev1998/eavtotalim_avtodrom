import React, {useState, useEffect} from 'react';
import {Col, Row} from "antd"
import moment from "moment";
import 'moment/locale/uz-latn'
import StyleReceipt from "./receipt.module.css"
import {getExaminationAreaConfig} from "../../../services/api_services/examination_area_config_api";
import {useRouteMatch} from "react-router";
import {getPaymentInfo} from "../../../services/api_services/payment/payment_info_api";

export const StudentPaymentReceipt = React.forwardRef(({data}, ref) => {
    const [config, setConfig] = useState();
    const [payment, setPayment] = useState();
    let arr = [1, 2];
    const match_params = useRouteMatch('/cashier/student-payments/:id')
    console.log('match', match_params);
    useEffect(() => {
        (async () => {
            const response = await getExaminationAreaConfig({});
            setConfig(response);
            const res = await getPaymentInfo(match_params?.params?.id)
            setPayment(res)
        })()
    }, []);

    console.log('conf', payment)
    moment.locale('uz-latn');


    return (

        <div className={StyleReceipt.printBox} ref={ref}>
            {
                arr.map((element, index) => {
                    return (
                        <Row className={''}>
                            <Col xl={24} className={'w-100 mt-3'}>
                                <div className={`${StyleReceipt.textCenter} w-100`}>
                                    <span>Naqd pullarni topshirish kvitansiyasi № <b>{payment?.id}</b></span>
                                </div>
                                <div className={`${StyleReceipt.textCenter} w-100 mt-3`}>
                                    <span><b>{moment(payment?.created_at).format('DD MMMM YYYY')} yil</b></span>
                                </div>
                                <div className={'w-100 mt-3  '}>
                                    <div className={`${StyleReceipt.inline} ${StyleReceipt.textLeft} w-50`}>Naqd pulni
                                        topshiruvchi: <b>{payment?.student_fio}</b>
                                    </div>
                                    <div
                                        className={`${StyleReceipt.inline} ${StyleReceipt.textRight} ${StyleReceipt.inlineDivs}  w-50 `}>
                                        <div className={`${StyleReceipt.borderBox}`}>{parseInt(payment?.amount).toLocaleString('en-US')}</div>
                                        <div className={`${StyleReceipt.borderBox}`}>so'm</div>
                                        <div className={`${StyleReceipt.borderBox}`}>00</div>
                                        <div className={`${StyleReceipt.borderBox}`}>tiyin</div>
                                    </div>
                                </div>
                                <div className={`${StyleReceipt.textCenter} w-100 mt-3`}>
                                    <span><b>{config?.name}</b></span>
                                </div>
                                <div className={'w-100 mt-3  '}>
                                    <div className={`${StyleReceipt.inline} ${StyleReceipt.textLeft} w-50`}>Pul kirim
                                        qiladigan hisob raqam
                                    </div>
                                    <div
                                        className={`${StyleReceipt.inline} ${StyleReceipt.textRight} ${StyleReceipt.inlineDivs} ${StyleReceipt.borderBox} w-50 `}>
                                        <div>{config?.hr}</div>
                                    </div>
                                </div>
                                <div className={'w-100 mt-3  '}>
                                    <div className={`${StyleReceipt.inline} ${StyleReceipt.textLeft} w-50`}>Bank kodi
                                    </div>
                                    <div
                                        className={`${StyleReceipt.inline} ${StyleReceipt.textRight} ${StyleReceipt.inlineDivs} ${StyleReceipt.borderBox} w-50 `}>
                                        <div>{config?.mfo}</div>
                                    </div>
                                </div>
                                <div className={'w-100 mt-3  '}>
                                    <div className={`${StyleReceipt.inline} ${StyleReceipt.textLeft} `}>Summa so'z bilan
                                        : <b>{payment?.summaWord} so'm 00 tiyin</b></div>
                                </div>
                                <div className={'w-100 mt-3  '}>
                                    <div className={`${StyleReceipt.inline} ${StyleReceipt.textLeft} `}>To'lov maqsadi
                                        : <b>{payment?.eduType} toifali haydovchilik guvohnomasi uchun</b></div>
                                </div>
                                <div className={`w-100 mt-4  ${StyleReceipt.inlineDivs}`}>
                                    <div className={`${StyleReceipt.textLeft} w-50`}>Naqd pul topshiruvchi shaxs imzosi:
                                        ____________
                                    </div>
                                    <div
                                        className={`${StyleReceipt.textLeft} w-50`}>Kassir{payment?.cashier ? '(' + payment?.cashier + ')' : ''}:
                                        ____________
                                    </div>
                                </div>
                                {
                                    index ==0 ?
                                <div className={`w-100 mt-4  ${StyleReceipt.inlineDivs} ${StyleReceipt.textCenter}`}>
                                    ----------------------------------------------------------------------------------------------------------------------------------------------------
                                </div>:''
                                }

                            </Col>
                        </Row>
                    )
                })
            }

        </div>
    );
});