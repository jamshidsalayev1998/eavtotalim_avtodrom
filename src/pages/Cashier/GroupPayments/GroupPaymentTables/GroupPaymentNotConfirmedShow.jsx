import React, {useState, useEffect} from "react";
import {Card, CardBody, Container} from "reactstrap";
import axios from "axios";
import {useHistory, useRouteMatch} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import {DataLoader} from "pages/Loaders/Loaders";
import {Table, Row, Input, Col, Select, Form} from "antd";
import Swal from "sweetalert2";
import NumberFormat from "react-number-format"
import {getExaminationPaymentType} from "../../../../services/api_services/examination_payment_types";

const GroupPaymentNotConfirmedShow = ({}) => {
    let match = useRouteMatch("/cashier/groups-payments/not-confirmed/:id");
    const [payment_form] = Form.useForm();
    const {Option} = Select
    const history = useHistory();
    const {t} = useTranslation();
    const [get_again, set_get_again] = useState(false);
    const [element_id, set_element_id] = useState(match?.params?.id);
    // const [data, setData] = useState("");
    const [group, setGroup] = useState("");
    const [students, setStudents] = useState([]);
    const [selected_students, setSelectedStudents] = useState([]);
    const [filters, setFilters] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [selected_keys, set_selected_keys] = useState([]);
    const [selectedExPayType, setSelectedExPayType] = useState();
     const [examinationAreaPaymentTypes, setExaminationAreaPaymentTypes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        axios({
            url: PATH_PREFIX + "/cashier/show-group/" + element_id,
            method: "GET",
            params: {
                token,
                payment_status: 0
            },
        }).then(res => {
            if (res?.data?.status == "1") {
                let a = [];
                setGroup(res?.data?.group);
                setIsLoading(false);
                res?.data?.data?.map((item, index) => {
                    a.push(item?.id);
                });
                set_selected_keys(a);
                setSelectedStudents(a);
                setStudents(res?.data?.data);
                setFilters(res?.data?.filters);

            }
        });
        (
            async () => {
                const response = await getExaminationPaymentType();
                if (response?.data?.status == 1) {
                    setExaminationAreaPaymentTypes(response?.data?.data)
                }
            }
        )()
    }, [get_again]);
    const columns = [
        {
            title: "F.I.O",
            render: (index, element, counter) => <>{element?.student?.last_name} {element?.student?.first_name} {element?.student?.middle_name}</>
        },
        {
            title: "Pasport",
            render: (index, element, counter) => <>{element?.student?.passport_seria} {element?.student?.passport_number}</>
        },
        {
            title: "Telefon",
            render: (index, element, counter) => <>{element?.student?.phone1}</>
        },
    ];
    const data = students;
    const rowSelection = {
        selectedRowKeys: selected_keys,
        onChange: selectedRowKeys => {
            setSelectedStudents(selectedRowKeys);
            set_selected_keys(selectedRowKeys);
        },
        getCheckboxProps: record => ({
            // disabled: true,
        }),
    };
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });
    const allow_final_test = () => {
        payment_form.submit();
    };
    const onFinish = (value) => {
        const form_data = new FormData();
        form_data.append("students", selected_keys ? selected_keys : []);
        form_data.append("group_id", group?.id);
        for (const key in value) {
            form_data.append(key, value[key] ? value[key] : '')
        }
        const token = localStorage.getItem("token");
        if (selected_keys?.length > 0) {
            swalWithBootstrapButtons
                .fire({
                    title: "To`lovlarni tasdiqlaysizmi?",
                    text: "Jami " + selected_keys?.length + " ta o'quvchi",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Tasdiqlash!",
                    cancelButtonText: "Bekor qilish!",
                    reverseButtons: true,
                })
                .then(result => {
                    if (result.isConfirmed) {
                        axios({
                            url: PATH_PREFIX + "/cashier/confirm-group-payment",
                            method: "POST",
                            params: {
                                token,
                            },
                            data: form_data,
                        }).then(res => {
                            if (res?.data?.status == "1") {
                                swalWithBootstrapButtons.fire(
                                    "Tasdiqlandi!",
                                    "O'quvchilarning to`lovlari tasdiqlandi",
                                    "success"
                                ).then(() => {
                                    history.push('/cashier/groups-payments');
                                });
                            }
                            if (res?.data?.status == "0") {
                                swalWithBootstrapButtons.fire(
                                    "Xatolik",
                                    res?.data?.message,
                                    "error"
                                );
                            }
                        });
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        result.dismiss === Swal.DismissReason.cancel;
                    }
                });
        }
    }

    const onFinishFailed = (value) => {
        // alert('failed')
    }
    const change_ex_pay_type = (e) => {
        let selected_type = filters?.examination_area_payment_types.find(element => {
            return element?.id == e
        });
        if (selected_type) {
            setSelectedExPayType(selected_type)
        }
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <div className="top_links_page_title">
                  <span className="mr-3" onClick={() => history.goBack()}>
                    <i className="bx bx-arrow-back"> </i>
                  </span>
                                    <h5 className="text-dark">
                                        <b>"{group?.type == 'first' ? group?.group?.name_uz : group?.name}"</b> guruhi
                                        to'lovini tasdiqlash (<b>{group?.organization?.name_uz}</b>)
                                    </h5>
                                </div>
                                <div>
                  <span className="ml-2 mr-2">
                    <b>{selected_keys?.length}</b> ta
                  </span>
                                    <button
                                        disabled={selected_keys?.length > 0 ? false : true}
                                        className="btn btn-success"
                                        onClick={allow_final_test}
                                    >
                                        {" "}
                                        <i className="fa fa-check"></i> To'lovni tasdiqlash
                                    </button>
                                </div>
                            </div>
                            <Row>
                                <Form
                                    form={payment_form}
                                    name="basic"
                                    initialValues={{remember: true}}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    className="d-flex w-100"
                                >

                                    <Col xl={6}>
                                        <Form.Item
                                            name="examination_area_payment_type_id"
                                            rules={[{required: true, message: 'To`lov toifasini tanlang!'}]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder={"To`lov toifasini tanlang"}
                                                optionFilterProp="children"
                                                className="w-100"
                                                onChange={e => change_ex_pay_type(e)}
                                            >
                                                {
                                                    examinationAreaPaymentTypes?.map((element, index) => {
                                                        return (
                                                            <Option key={index}
                                                                    value={element?.id}>{element?.name}</Option>

                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            name="payment_type_id"
                                            rules={[{required: true, message: 'To`lov turini tanlang!'}]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder={"To`lov turini tanlang"}
                                                optionFilterProp="children"
                                                className="w-100"
                                            >
                                                {
                                                    filters?.pay_types?.map((element, index) => {
                                                        return (
                                                            <Option key={index}
                                                                    value={element?.id}>{element?.name}</Option>

                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6} className={'ml-2'}><b> Umumiy summa</b>: {selectedExPayType ?
                                        <NumberFormat
                                            value={parseInt(selectedExPayType?.amount) * selected_keys?.length}
                                            thousandSeparator={true}
                                            displayType={"text"}/> : ''}</Col>
                                </Form>
                            </Row>
                            <div className="crypto-buy-sell-nav mt-3">
                                {isLoading && <DataLoader/>}
                                {!isLoading && (
                                    <>
                                        <Table
                                            rowSelection={{
                                                type: "checkbox",
                                                ...rowSelection,
                                            }}
                                            columns={columns}
                                            dataSource={data}
                                            pagination={false}
                                            rowKey="id"
                                        />
                                    </>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default withTranslation()(GroupPaymentNotConfirmedShow);
