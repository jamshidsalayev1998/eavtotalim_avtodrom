import React, { useContext, useEffect, useState } from 'react';
import { Row, Card, CardBody, Col } from 'reactstrap';
import { Progress } from 'antd';
import axios from 'axios';
import { PATH_PREFIX } from 'Utils/AppVariables';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
import { Modal } from 'antd';
import clsx from 'clsx';
import { Radio } from 'antd';
import MainContext from 'Context/MainContext';
import { useTranslation } from "react-i18next"

const SubjectTest = ({ isType }) => {

    const { t } = useTranslation()

    const {i18} = useContext(MainContext)

    const history = useHistory();
    const [data, setData] = useState([]);
    const [lang_id, setLang_id] = useState(1);
    const [visible, setVisible] = useState(false);
    const [lesson_id, setLesson_id] = useState("");
    const [name, setName] = useState("");
    const [itemId, setItemId] = useState(null);

    const handleOk = () => {
        setTimeout(() => {
            setVisible(false)
        }, 3000);
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        axios({
            url: PATH_PREFIX + "/student-test-subjects",
            method: "GET",
            params: {
                token
            }
        }).then((response) => {
            if (response?.data?.status === 1) {
                setData(response?.data?.data?.sort(function (x, y) {
                    return x.order - y.order;
                  }))
            }
        })
    }, [isType])



    const startedFunc = () => {
        history.push({
            pathname: "/test/completetest",
            state: {
                'lesson_id': lesson_id,
                'name': name,
                'lang_id': lang_id,
                'isType': isType,
                "id":itemId
            }
        })
    }

    // <<<=== this function for changelanguages  ===>>>

  const selectLang = (e) => {
     if(i18 === "uz" && e?.lesson?.name_uz !== null){
       return e?.lesson?.name_uz
     } else if(i18 === "ru" && e?.lesson?.name_ru !== null){
       return e?.lesson?.name_ru
     } else if(i18 === "en" && e?.lesson?.name_en !== null){
       return e?.lesson?.name_en
     } else if(i18 === "qq" && e?.lesson?.name_qq !== null){
       return e?.lesson?.name_qq
     } else if(i18 === "kr" && e?.lesson?.name_kiril !== null){
       return e?.lesson?.name_kiril
     }else{
       return e?.lesson?.name_uz
     }
   }


    const showModal = (item_Id, less_id, nameLess, isAvailable) => {
        if (isAvailable === 0) return
        setVisible(true);
        setLesson_id(less_id);
        setName(nameLess);
        setItemId(item_Id)
    }

    return (
        <React.Fragment>
            <Row className={styles.subject_test_page}>
                <Col xl={12}>
                    <Modal
                        visible={visible}
                        title={t("Start the test")}
                        onOk={handleOk}
                        onCancel={() => setVisible(false)}
                        footer={false}
                        >
                        <div className="language_item_modal_box">
                            <div className="w-100 text-center mt-2">
                                <Radio.Group onChange={e => setLang_id(e.target.value)} value={lang_id}>
                                    <Radio value={1}>O'zbek</Radio>
                                    <Radio value={3}>Kiril</Radio>
                                    <Radio value={2}>Rus</Radio>
                                    <Radio value={5}>Qoraqalpoq</Radio>
                                </Radio.Group>
                            </div>
                            <span className="text-center text-muted mt-4">
                                Mavzuda jami <b>20</b> ta test mavjud.
                                Barcha test savollarini yechish uchun jami <b>25</b> daqiqa vaqt beriladi.
                                Test savollarini testni yakunlash tugmasini bosish orqali tugatishingiz mumkin.
                            </span>
                            <div className="d-flex justify-content-center  w-100 mt-3">
                                <button className="btn btn-success px-4 font-size-15" onClick={startedFunc}>{t("Start the test")}</button>
                            </div>
                        </div>
                    </Modal>
                </Col>
                {
                    data?.length && data?.map((element, index) => {
                        return (
                            <Col key={element.id} xl={4} lg={6} md={6} xs={12} className="d-flex">
                                <Card
                                    className={clsx('border  w-100', styles.subject_test_items)}
                                    onClick={() => showModal(element?.result?.id, element?.lesson_id, element?.lesson?.name_uz, element?.available_use)}

                                >
                                    <CardBody className="d-flex">
                                        <div>
                                            <Progress type="circle" percent={element?.result?.max_result_percent} width={50} strokeColor="#27AE60" />
                                        </div>
                                        <div className="pl-3 pr-2">
                                            <h5>{selectLang(element)}</h5>
                                            <p className="text-secondary font-size-13"><i className="bx bx-time"></i> 10 {t("Min")}</p>
                                        </div>
                                    </CardBody>
                                    {
                                        element?.available_use !== (1 || "1") ?
                                            <div className={styles.not_allowed_hover_block}>
                                                <i className="bx bx-lock"></i>
                                            </div> : null
                                    }
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </React.Fragment>
    )
}


export default SubjectTest;