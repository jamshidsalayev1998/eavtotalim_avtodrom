import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, Col } from 'reactstrap';
import { Progress } from 'antd';
import clsx from 'clsx';
import axios from 'axios';
import { PATH_PREFIX } from 'Utils/AppVariables';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
import { Modal } from 'antd';
import { isEmpty } from 'lodash';
import { Radio } from 'antd';
import "./style.css";



const TemplateTest = ({ isType }) => {

    const history = useHistory();
    const [data, setData] = useState([]);
    const [lang_id, setLang_id] = useState(1);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [templateId, setTemplateId] = useState("")
    const [itemId, setItemId] = useState(null)

    const handleOk = () => {
        setTimeout(() => {
            setVisible(false)
        }, 3000);
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        axios({
            url: PATH_PREFIX + "/student-test-templates",
            method: "GET",
            params: {
                token
            }
        }).then((response) => {
            if (response?.data?.status === 1) {
                setData(response?.data?.templates)
            }
        })
    }, [])



    const startedFunc = () => {
        history.push({
            pathname: "/test/completetest",
            state: {
                'lesson_id': templateId,
                'name': name,
                'lang_id': lang_id,
                'template_id': templateId,
                'isType': isType,
                "id": itemId
            }
        })
    }

    const showModal = (item_Id, less_id, nameLess, isAvailable) => {
        if (isAvailable === 0) return
        setVisible(true);
        setTemplateId(item_Id)
        setName(nameLess);
        setItemId(item_Id)

    }
    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <div className={styles.custom_ant_modal_test}>
                        <Modal
                            visible={visible}
                            title="Testni boshlash"
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
                                    Mavzuda jami <b>10</b> ta test mavjud.
                                    Barcha test savollarini yechish uchun jami <b>15</b> daqiqa vaqt beriladi.
                                    Test savollarini testni yakunlash tugmasini bosish orqali tugatishingiz mumkin.
                                </span>
                                <div className="d-flex justify-content-center  w-100 mt-3">
                                    <button className="btn btn-success px-4 font-size-15" onClick={startedFunc}>Testni boshlash</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </Col>
                {
                    !isEmpty(data) && data?.map((element, index) => {
                        return (
                            <Col key={element.id} xl={4} lg={6} md={6} xs={12} className="d-flex">
                                <Card className={clsx('border  w-100', styles.subject_test_items)}
                                    onClick={() => showModal(element?.id, element?.result?.template_id, element?.name_uz, element?.available_use, element)}>
                                    <CardBody className="d-flex">
                                        <div>
                                            <Progress type="circle" percent={element?.result?.max_result_percent} width={50} strokeColor="#27AE60" />
                                        </div>
                                        <div className="pl-3 pr-2">
                                            <h5>{element?.name_uz}</h5>
                                            <p className="text-secondary font-size-13"><i className="bx bx-time"></i> 10 daq</p>
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


export default TemplateTest;