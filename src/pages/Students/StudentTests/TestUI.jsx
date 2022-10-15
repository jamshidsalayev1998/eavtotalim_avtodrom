import axios from 'axios';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useLocation } from 'react-router';
import { Card, CardBody, Col } from 'reactstrap';
import { Divider } from 'antd';
import { PATH_PREFIX, PATH_PREFIX_TEST_FILE } from 'Utils/AppVariables';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import styles from './style.module.scss';


const TestUI = ({ get_abc,displayingVariants, setResults, setIsFinished, setAllCount }, ref) => {

    const location = useLocation();
    const [subject_tests, setSubject_tests] = useState([]);
    const [current_test, setCurrent_test] = useState({});
    const [temporaryStore, setTemporaryStore] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios({
            url: PATH_PREFIX + "/student-subject-test-web",
            method: "GET",
            params: {
                "token": token,
                "lesson_id": location?.state?.lesson_id,
                "lang_id": location?.state?.lang_id
            }
        }).then((response) => {
            if (response?.data?.status === 1) {
                setSubject_tests(response?.data?.questions)
                if (!isEmpty(response?.data?.questions)) {
                    setCurrent_test(response?.data?.questions[0])
                }
            }
        })
    }, [])


    const submitCheckingAnswers = (id) => {
        const newSubmitChecking = subject_tests.filter(e => e.id === id)

        return newSubmitChecking.length > 0;
    }
    const submitNotCheckingAnswers = (id) => {
        const newSubmitChecking = temporaryStore.filter(e => e.question_id === id)

        return newSubmitChecking.length > 0;
    }


    useImperativeHandle(ref, () => ({
        submitTest() {

            let newValue = new Object();
            for (let index = 0; index < temporaryStore.length; index++) {
                const element = temporaryStore[index];
                const field = element?.question_id;
                if (submitCheckingAnswers(element?.question_id)) {
                    newValue[field] = JSON.stringify([element.answer_id]);
                }
            }
            for (let index = 0; index < subject_tests.length; index++) {
                const element = subject_tests[index];
                const field = element?.id;
                if (!submitNotCheckingAnswers(element?.id)) {
                    newValue[field] = "[]";
                }
            }

            const token = localStorage.getItem("token");

            let formdata = new Object();
            formdata.selected_answers = newValue;
            formdata.lesson_id = location?.state?.lesson_id;
            formdata.lang_id = 1
            axios({
                url: PATH_PREFIX + "/subject-exam-check",
                method: "POST",
                params: {
                    token
                },
                data: formdata
            }).then((response) => {
                if (response?.data?.status === 1) {
                    setResults(response?.data);
                }
            }).then(() => {
                setIsFinished(true);
            })
        }
    }))




    const isCheck = () => {
        const selectedAnswerId = temporaryStore.filter(e => e.question_id === current_test.id)
        if (selectedAnswerId.length > 0) {
            return selectedAnswerId[0].answer_id
        }
    }


    const hasChecking = (e_id) => {
        const newArr = temporaryStore.filter(e => e.question_id === e_id)
        return newArr.length > 0;
    }


    const checkIsHas = () => {
        const newArr = temporaryStore.filter(e => e.question_id === current_test?.id)
        return newArr.length > 0;
    }



    const nextBtn = () => {
        if (currentIndex < subject_tests.length - 1) {
            setCurrent_test(subject_tests[currentIndex + 1])
            setCurrentIndex(currentIndex + 1)
        } else {
            return
        }
    }

    const prevBtn = () => {
        if (currentIndex > 0) {
            setCurrent_test(subject_tests[currentIndex - 1])
            setCurrentIndex(currentIndex - 1)
        } else {
            return
        }
    }

    const selectingBtn = (index) => {
        setCurrentIndex(index);
        setCurrent_test(subject_tests[index]);
    }


    const selectedVariant = (id) => {
        if (id !== "") {
            if (checkIsHas()) {
                setTemporaryStore([...temporaryStore?.map((e, i) => {
                    if (e.question_id === current_test?.id) {
                        e.answer_id = id
                    }

                    return e;

                })])
            } else {
                setTemporaryStore([...temporaryStore,
                {
                    question_id: current_test?.id,
                    answer_id: id
                }
                ])
            }
        }
    }






    return (
        <React.Fragment>
            <Col xl={12}>
                <div className="d-flex">
                    <div className="mt-3">
                        {
                            !isEmpty(subject_tests) && subject_tests?.map((element, index) => {
                                return <button 
                                    key={index}
                                    shape="circle"
                                    className={
                                        clsx('mr-1 mb-2', styles.test_item_btns,
                                            hasChecking(element?.id) && currentIndex !== index ? styles.test_item_btn_selected : null
                                        )}
                                    style={currentIndex === index ? { backgroundColor: "#1890ff", color: "white", border: 'none !important' } : null}
                                    onClick={() => selectingBtn(index)}>
                                </button>
                            })
                        }
                    </div>
                    <div className={clsx("my-3 ml-3", styles.next_prev_btn_box)}>
                        <a
                            className="d-flex align-items-center"
                            onClick={prevBtn}
                            disabled={currentIndex === 0 ? true : false}
                        > <i className="bx bx-chevron-left"></i>Oldingi savol</a>
                        <a
                            className=" d-flex align-items-center ml-5"
                            onClick={nextBtn}
                            disabled={currentIndex === subject_tests.length - 1 ? true : false}
                        >Keyingi savol<i className="bx bx-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </Col>
            <Divider className="mt-0" />
            <Col xl={6}>
                <div>

                    {
                        !isEmpty(current_test?.body) &&
                        current_test?.body?.map((element, index) => {
                            if (element.type === 1 || element.type === "1") {
                                return <span className="font-size-16" style={{ fontWeight: 500 }}>{element.value}</span>
                            }
                        })
                    }
                    <div className="mt-4">
                        {
                            !isEmpty(current_test?.answers) &&
                            current_test?.answers?.map((element, index) => {
                                return (
                                    <Card
                                        key={element.id}
                                        className={styles.test_variants_item}
                                        onClick={() => selectedVariant(element.id)}
                                        style={isCheck(element.question_id) === element.id ? { backgroundColor: "#ffe58f", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" } : { boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
                                        }
                                    >
                                        <CardBody>
                                            {get_abc(index)}&nbsp;{
                                                element?.body?.map((e, i) => {
                                                    return displayingVariants(e)
                                                })
                                            }
                                        </CardBody>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </div>
            </Col>
            <Col xl={6}>
                {
                    !isEmpty(current_test?.body) &&
                    current_test?.body?.map((element, index) => {
                        if (element.type === 2 || element.type === "2") {
                            return (
                                <div key={element.id}>
                                    <img width="100%" height="100%" src={PATH_PREFIX_TEST_FILE + element.value} alt="" />
                                </div>
                            )
                        }
                    })
                }
            </Col>
        </React.Fragment>
    )
}

export default TestUI;