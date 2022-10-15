import React, {useState, useEffect} from 'react';
import styleModule from "./style.module.css";
import {Col, Row} from "antd"
import moment from "moment";
import 'moment/locale/uz-latn'
import {PATH_PREFIX_FILE} from "../../../../../Utils/AppVariables";

export const CertificateOld = React.forwardRef(({examinationArea, data, src}, ref) => {
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
            <div className={styleModule.firstBox}></div>
            <div className={styleModule.secondBox}>
                <div>
                                        <span className={styleModule.secondBoxP}>
                                            SERTIFIKAT
                                        </span>
                </div>
                <div className={"d-flex justify-content-center"}>
                    <div className={styleModule.hrBox}>
                                            <span className={styleModule.secondBoxPname}>
                                                {examinationArea?.name}
                                            </span>
                    </div>
                </div>
                <div className={"pt-2"}>
                                        <span className={styleModule.fourthBoxP}>
                                            {data?.student_fio}
                                        </span>
                </div>
                <div className={"pt-2 d-flex justify-content-center"}>
                    <div className={styleModule.sentenceBox}>
                                            <span className={styleModule.fifthBoxP}>
                                                Ushbu sertifikat F.I.O: <b>{data?.student_fio}</b> Pasport: <b>{data?.student_passport}</b> test topshiruvchiga "{examinationArea?.name}" test markazi  testlaridan muvaffaqiyatli o'tganligi uchun berildi. Sertifikatning haqiqiyligini qrcode ni skaner qilish orqali tekshirish mumkin
                                            </span>
                    </div>
                </div>
                <div className={"pt-2 d-flex justify-content-between  pl-4 pr-4"}>
                    <Col xl={8} className={' w-100  d-flex justify-content-center'}>
                        <div className={'p-3   d-flex '}>
                            <div className={'   bg-white d-flex align-items-center justify-content-center '}
                                 style={{width: '150px'}}>
                                {
                                    examinationArea?.logo &&
                                <img style={{width:'100%'}} src={PATH_PREFIX_FILE+examinationArea?.logo} alt=""/>
                                }
                            </div>
                        </div>
                    </Col>
                    <Col xl={8} className={' w-100 d-flex justify-content-center'}>
                        <div className={'p-3   d-flex '}>
                            <div className={styleModule.borderDemo} style={{width: '150px'}} >
                                {/*<img src={PATH_PREFIX_FILE+'files/examination_area/pechat/pechat.png'} style={{width:'100%'}} alt=""/>*/}
                            </div>
                        </div>
                    </Col>
                    <Col xl={8} className={' w-100 d-flex justify-content-center'}>
                        <img src={src} alt=""/>
                    </Col>
                </div>
            </div>

        </div>
    );
});