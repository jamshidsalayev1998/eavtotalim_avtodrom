import React, { useState } from 'react';
import { Card, CardBody, Container, Row, Col, Media } from 'reactstrap';
import { isArray, isEmpty } from 'lodash';
import { Divider } from 'antd';
import clsx from 'clsx';
import { PATH_PREFIX_TEST_FILE } from 'Utils/AppVariables';
import styles from './style.module.scss';
import bg_brand from 'assets/images/bg_brand.png';
import { generateTestResultBtns, getColor } from '../services';
import { Modal } from 'antd';
import {PATH_PREFIX_FILE} from "Utils/AppVariables";

const ResultTest = ({ data, displayingVariants }) => {

    const [current_index, setCurrent_index] = useState(0);
    const [current_test, setCurrent_test] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageLink, setImageLink] = useState("");

    const nextBtn = () => {
        if (current_index < data?.questions.length - 1) {
            setCurrent_test(data?.questions[current_index + 1])
            setCurrent_index(current_index + 1)
        } else {
            return
        }
    }

    const prevBtn = () => {
        if (current_index > 0) {
            setCurrent_test(data?.questions[current_index - 1])
            setCurrent_index(current_index - 1)
        } else {
            return
        }
    }




    const showModal = (e) => {
        setIsModalVisible(true);
        setImageLink(e)
      };

    return (
        <React.Fragment>
            { !isArray(data) && <Card className={styles.test_result_page}>
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col xl={12}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col lg="4">
                                                <Media>
                                                    <div className="mr-3">
                                                        <img
                                                            src={bg_brand}
                                                            alt=""
                                                            className="avatar-md rounded-circle img-thumbnail"
                                                        />
                                                    </div>
                                                    <Media className="align-self-center" body>
                                                        <div className="text-muted">
                                                            <h5 className="mb-1">{data?.student}</h5>
                                                        </div>
                                                    </Media>
                                                </Media>
                                            </Col>

                                            <Col lg="8" className="align-self-center">
                                                <div className="text-lg-center mt-4 mt-lg-0">
                                                    <Row>
                                                        <Col xs="4">
                                                            <div>
                                                                <p className="text-muted text-truncate mb-2">Savollar soni</p>
                                                                <span className="mb-0">{data?.general_exam_result?.question_count}</span>
                                                            </div>
                                                        </Col>
                                                        <Col xs="4">
                                                            <div>
                                                                <p className="text-muted text-truncate mb-2">To'g'ri javoblar soni</p>
                                                                <span className="mb-0">{data?.general_exam_result?.correct_answers_count}</span>
                                                            </div>
                                                        </Col>
                                                        <Col xs="4">
                                                            <div>
                                                                <p className="text-muted text-truncate mb-2">Natija</p>
                                                                <span className="mb-0">{data?.general_exam_result?.percent}%</span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={12}>
                                <div className={styles.test_header}>
                                    <div className="mr-3 mb-1 font-size-17" style={{ fontWeight: 500 }}>Savol {current_index + 1}/{data?.questions.length}</div>
                                    <div>
                                        {
                                            !isEmpty(data?.result) && data && data?.questions?.map((element, index) => {
                                                return <button
                                                    key={index}
                                                    shape="circle"
                                                    className={clsx('mr-1 mb-2', styles.test_item_btns)}
                                                    style={generateTestResultBtns(element?.result, index, current_index)}
                                                    onClick={() => setCurrent_index(index)}>
                                                </button>
                                            })
                                        }
                                    </div>
                                    <div className={clsx("my-3 ml-3", styles.next_prev_btn_box)}>
                                        <a
                                            className="d-flex align-items-center"
                                            style={{ whiteSpace: "nowrap" }}
                                            onClick={prevBtn}
                                            disabled={current_index === 0 ? true : false}
                                        > <i className="bx bx-chevron-left"></i>Oldingi savol</a>
                                        <a
                                            className=" d-flex align-items-center ml-5"
                                            onClick={nextBtn}
                                            style={{ whiteSpace: "nowrap" }}
                                            disabled={current_index === data?.questions.length - 1 ? true : false}
                                        >Keyingi savol<i className="bx bx-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                            <Divider className="mt-0" />
                            <Col xl={5} lg={6} md={6}>
                                <div className={styles.correct_full_answers_box}>
                                    <div className="my-2 text-muted">
                                        <span className="font-size-17">{current_index + 1}- savol. </span> {data.questions[current_index]?.body?.map((element, index) => {
                                            if (element.type === 1 || element.type === "1") {
                                                return <span key={index} className="font-size-16" style={{ fontWeight: 500 }}>{element.value}</span>
                                            }
                                        })}
                                    </div>
                                    {
                                        !isEmpty(data.questions[current_index]?.answers) && data.questions[current_index]?.answers?.map((element, index) => {

                                            return (
                                                <Card
                                                    className={styles.test_variants_item}
                                                    style={getColor(element.user_result)}
                                                    key={index}
                                                >
                                                    <CardBody>
                                                        {
                                                            element.user_result === 1 ?
                                                                <i className="fas fa-times-circle mr-2 font-size-16" style={{ color: "#EB5757" }}></i> :
                                                                element.user_result === 2 || element.user_result === 3 ?
                                                                <i className="fas fa-check-circle mr-2 font-size-16" style={{ color: "#27AE60" }} ></i> 
                                                                :<i className="far fa-circle mr-2 font-size-16" style={{ color: "#A7B6C2" }}></i>
                                                        }
                                                        {element?.body?.map((e, i) => {
                                                            return displayingVariants(e)
                                                        })}
                                                    </CardBody>
                                                </Card>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                            <Col xl={1} md={1}></Col>
                            <Col xl={5} lg={5} md={5}>
                                {
                                    !isEmpty(current_test?.body) &&
                                    data.questions[current_index]?.body?.map((element, index) => {
                                        if (element.type === 2 || element.type === "2") {
                                            return (
                                                <div key={element.id} className={styles.test_img_box}>
                                                    <img width="100%" height="100%" onClick={()=>showModal(element.value)} src={PATH_PREFIX_TEST_FILE + element.value} alt="" />
                                                </div>
                                            )
                                        }
                                    })
                                }
                                <p className='mt-4'>
                                    {data.questions[current_index]?.answer_description}
                                </p>
                            </Col>
                            <Col xl={5}>
                                {
                                    data.questions[current_index]?.answer_video &&
                                    <video controls controlsList="nodownload" poster={bg_brand}>
                                        <source src={PATH_PREFIX_FILE + data.questions[current_index]?.answer_video} />
                                    </video>
                                }
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>}
            <Modal zIndex={10000} bodyStyle={{padding:"0"}} className="p-0" closeIcon={<i className={`${styles.closeButton} fas fa-times text-white`}></i>}     width={1200} title="" visible={isModalVisible} onCancel={()=>setIsModalVisible(false)} footer={false} >
                <img src={PATH_PREFIX_TEST_FILE+imageLink} style={{maxHeight:"85vh"}} className="w-100" alt="" />
            </Modal>
        </React.Fragment >
    )
}


export default ResultTest