import React, {useState, useEffect} from 'react';
import styleModule from "./style.module.css";
import {Col, Row} from "antd"
import moment from "moment";
import 'moment/locale/uz-latn'
import {PATH_PREFIX_FILE} from "../../../../../Utils/AppVariables";

export const Certificate = React.forwardRef(({examinationArea, data, src,eduType}, ref) => {
    useEffect(() => {
        setPageSize()
    })
    moment.locale('uz-latn');

    function setPageSize() {
        const style = document.createElement('style');
        style.innerHTML = `@page {size: landscape}`;
        style.id = 'page-orientation';
        document.head.appendChild(style);
    }

    return (

        <div className={styleModule.img_box} ref={ref}>
            {/*<div className={styleModule.firstBox}></div>*/}
            <div className={styleModule.secondBox}>
                <Row className={'d-flex justify-content-center '}>
                    <div className={styleModule.tashkilotNomi}>
                        <h4 className={''}>{examinationArea?.name}</h4>
                    </div>

                </Row>
                <Row className={'d-flex justify-content-center  '}>

                </Row>
                <Row className={'d-flex justify-content-center  '}>
                    <Col className={styleModule.xl6}>
                        <img src={PATH_PREFIX_FILE+examinationArea?.logo} alt="" className={''} style={{width: '100px',marginLeft:'20px'}}/>
                    </Col>
                    <Col className={styleModule.xl12}>
                        <div className={styleModule.tashkilotNomiLabel} style={{width:'100%',textAlign:'center'}}>
                            <h6>Tashkilot nomi / Наименование организации / Name of company </h6>
                        </div>
                        <h4 className={'pt-2'}>Milliy haydovchilik guvohnomasini olish uchun nazariy va amaliy
                            imtihonlarni
                            muvoffaqiyatli topshirganligi haqida maxsus </h4>
                    </Col>
                    <Col className={styleModule.xl6 + '  d-flex justify-content-start pl-5'}>
                        <img src={src} alt="" className={''} style={{width: '100px'}}/>
                    </Col>

                </Row>
                <Row className={'d-flex justify-content-center  pt-2'}>
                    <Col className={styleModule.xl6}>
                    </Col>
                    <Col className={styleModule.xl12}>
                        <span style={{fontSize: '50px'}}>SERTIFIKAT </span>
                    </Col>
                    <Col className={styleModule.xl6}>
                    </Col>

                </Row>
                <Row className={'d-flex justify-content-center  pt-1'}>
                    <div className={styleModule.seriyaRaqam}>
                        <h4> № {data?.number ? data?.number : '12345678912345'}</h4>
                    </div>
                </Row>
                <Row className={'d-flex justify-content-center  '}>
                    <div className={styleModule.tashkilotNomiLabel}>
                        <h6>Seriya va raqam / Серия и номер / Series and number </h6>
                    </div>
                </Row>
                <Row className={'d-flex justify-content-center  '}>
                    <Col className={styleModule.xl5}>
                        <Row className={'d-flex justify-content-center  pt-4'}>
                            <div className={styleModule.seriyaRaqam}>
                                <h5>{data?.student_fio}</h5>
                            </div>
                        </Row>
                        <Row className={'d-flex justify-content-center  '}>
                            <div className={styleModule.tashkilotNomiLabel80}>
                                <h6>Familiya ism / Фамилия имя / Full name </h6>
                            </div>
                        </Row>
                    </Col>
                    <Col className={styleModule.xl5}>
                        <Row className={'d-flex justify-content-center  pt-4'}>
                            <div className={styleModule.seriyaRaqam}>
                                <h5> {data?.final_access_student?.birthday ? data?.final_access_student?.birthday : ''} &nbsp;</h5>
                            </div>
                        </Row>
                        <Row className={'d-flex justify-content-center  '}>
                            <div className={styleModule.tashkilotNomiLabel80}>
                                <h6>Tug'ilgan sanasi / Дата рождения / Date of birth </h6>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <Row className={'d-flex justify-content-center  '}>
                    <Col className={styleModule.xl5}>
                        <Row className={'d-flex justify-content-center  pt-4'}>
                            <div className={styleModule.seriyaRaqam}>
                                <h5>{examinationArea?.area?.name?examinationArea?.area?.name: ''}&nbsp; </h5>
                            </div>
                        </Row>
                        <Row className={'d-flex justify-content-center  '}>
                            <div className={styleModule.tashkilotNomiLabel80}>
                                <h6>Berilgan joy / Место выдачи / Place of issue </h6>
                            </div>
                        </Row>
                    </Col>
                    <Col className={styleModule.xl5}>
                        <Row className={'d-flex justify-content-center  pt-4'}>
                            <div className={styleModule.seriyaRaqam}>
                                <h5>{eduType?.short_name_uz}</h5>
                            </div>
                        </Row>
                        <Row className={'d-flex justify-content-center  '}>
                            <div className={styleModule.tashkilotNomiLabel80}>
                                <h6>Transport vositasi turi / Тип транспортного средства / Vehicle type </h6>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <Row className={'d-flex justify-content-center  '}>
                    <Col className={styleModule.xl3}>
                        <Row className={'d-flex justify-content-center  pt-4'}>
                            <div className={styleModule.seriyaRaqam}>
                                <h5>{moment(data?.created_at).format('DD-MM-YYYY')}</h5>
                            </div>
                        </Row>
                        <Row className={'d-flex justify-content-center  '}>
                            <div className={styleModule.tashkilotNomiLabel80}>
                                <h6>Berilgan sana / Дата выдачи / Date of issue </h6>
                            </div>
                        </Row>
                    </Col>
                    <Col className={styleModule.xl3}>
                        <Row className={'d-flex justify-content-center  pt-4'}>
                            <div className={styleModule.seriyaRaqam}>
                                <h5>{moment(data?.created_at).add(2, 'months').format('DD-MM-YYYY')}</h5>
                            </div>
                        </Row>
                        <Row className={'d-flex justify-content-center  '}>
                            <div className={styleModule.tashkilotNomiLabel80}>
                                <h6>Amal qilish muddati / Действителен до / Valid until </h6>
                            </div>
                        </Row>
                    </Col>
                    <Col className={styleModule.xl3}>
                        <Row className={'d-flex justify-content-center  pt-4'}>
                            <div className={styleModule.seriyaRaqam}>
                                <h5>&nbsp;</h5>
                            </div>
                        </Row>
                        <Row className={'d-flex justify-content-center  '}>
                            <div className={styleModule.tashkilotNomiLabel80}>
                                <h6>Imzo / Подпись / Signature </h6>
                            </div>
                        </Row>
                    </Col>
                </Row>

            </div>

        </div>
    );
});