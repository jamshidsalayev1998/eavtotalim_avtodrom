import React, {useState, useEffect} from "react";
import {Row, Col} from "reactstrap";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import {DataLoader} from "pages/Loaders/Loaders";
import {Select, Input, Modal, Form, message, Popconfirm} from "antd";
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table";
import PaginationComponent from "react-reactstrap-pagination";
import useDebounce from "../../../../components/CustomHooks/useDebounce";
import './style.css'
import NumberFormat from "react-number-format";

const StudentPaymentConfirmedsIndex = ({secondTabLoading}) => {
    const {Option} = Select;
    const [confirm_form] = Form.useForm();
    const {t} = useTranslation();
    const [get_again, set_get_again] = useState(false);
    const [show_count, setshow_count] = useState("10");
    const [page, setpage] = useState("1");
    const [total, settotal] = useState("1");
    const [word, setword] = useState(
        localStorage.getItem(
            window.location.pathname + "-confirmed-default-search-word"
        )
    );
    const [organization_id, set_selected_organization_id] = useState(
        localStorage.getItem(
            window.location.pathname + "-confirmed-default-organization-id"
        )
            ? localStorage.getItem(
            window.location.pathname + "-confirmed-default-organization-id"
            )
            : "all"
    );
    const [group_id, set_selected_group_id] = useState(
        localStorage.getItem(
            window.location.pathname + "-confirmed-default-group-id"
        )
            ? localStorage.getItem(
            window.location.pathname + "-confirmed-default-group-id"
            )
            : "all"
    );
    const [filters, set_filters] = useState([]);
    const [groups, set_groups] = useState([]);
    const [data, setData] = useState([]);
    const handleSelected = (selectedPage, get_again_type = false) => {
        setpage(selectedPage);
        if (get_again_type) {
            set_get_again(!get_again);
        }
    };
    const [isLoading, setIsLoading] = useState(false);
    const waitWord = useDebounce(word, 1000)

    useEffect(() => {
        // alert('sdsd')
        const token = localStorage.getItem("token");
        setIsLoading(true);
        axios({
            url: PATH_PREFIX + "/cashier/student-payments",
            method: "GET",
            params: {
                token,
                show_count,
                page,
                organization_id,
                group_id,
                word,
                payment_status: "1",
                // type: 'first'
            },
        }).then(res => {
            if (res?.data?.status == "1") {
                setIsLoading(false);
                setData(res?.data?.data?.data);
                set_filters(res?.data?.filters);
                set_groups(res?.data?.filters?.groups);
                settotal(res?.data?.data?.total);
            }
        });
    }, [get_again, show_count, organization_id, waitWord, group_id, secondTabLoading]);

    const change_word = word => {
        setword(word);
        localStorage.setItem(
            window.location.pathname + "-confirmed-default-search-word",
            word
        );
    };

    const change_organization_id = element_id => {
        set_selected_group_id("all");
        localStorage.setItem(
            window.location.pathname + "-confirmed-default-group-id",
            'all'
        );
        set_groups([]);
        set_selected_organization_id(element_id);
        localStorage.setItem(
            window.location.pathname + "-confirmed-default-organization-id",
            element_id
        );
    };
    const cancel_payment = (element) => {
        const token = localStorage.getItem('token');
        const form_data = new FormData();
        form_data.append('final_access_student_id', element?.id);
        form_data.append('payment_id', element?.examination_area_payment?.id);
        setIsLoading(true)
        axios({
            url: PATH_PREFIX + '/cashier/student-payment-cancel',
            method: 'POST',
            params: {
                token
            },
            data: form_data
        }).then(res => {
            if (res?.data?.status == 1) {
                message.success(res?.data?.message);
                set_get_again(!get_again);
            }
            if (res?.data?.status == 0) {
                message.error(res?.data?.message);

            }
            setIsLoading(false)
        })
    }
    return (
        <>

            <Row style={{justifyContent: "space-between"}}>
                <Col xl={4}>
                    <label htmlFor="">Avtomaktab</label>
                    <Select
                        showSearch
                        style={{width: "100%"}}
                        placeholder="Avtomaktab"
                        optionFilterProp="children"
                        onChange={e => {
                            change_organization_id(e);
                            setpage(1)
                        }}
                        defaultValue="all"
                        value={organization_id != 'all' ? Number(organization_id) : 'all'}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="all">Barchasi</Option>
                        {filters?.organizations?.map((element, index) => {
                            return (
                                <Option value={element?.id} key={index}>
                                    {element?.name_uz ||
                                    element?.name_ru ||
                                    element?.name_en ||
                                    element?.name_qq ||
                                    element?.name_kiril}
                                </Option>
                            );
                        })}
                    </Select>
                </Col>

                <Col xl={2}>
                    <label htmlFor="">Qidirish</label>
                    <Input
                        allowClear
                        style={{width: "100%"}}
                        defaultValue={word}
                        onChange={e => {
                            change_word(e?.target?.value);
                            handleSelected(1, false)
                        }}
                    />
                </Col>
            </Row>
            {isLoading && <DataLoader/>}
            {!isLoading && (
                <>
                    <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered mt-3"
                    >
                        <Thead className="font-size-14">
                            <Tr>
                                <Th data-priority="3" style={{width: "1px"}}>
                                    №
                                </Th>
                                <Th data-priority="3">F.I.O</Th>
                                <Th data-priority="3" className={'text-center'}>Pasport</Th>
                                <Th data-priority="3" className={'text-center'}>To'langan summa</Th>
                                <Th data-priority="3" className={'text-center'}>To'langan toifa / To'lov turi</Th>
                                <Th data-priority="3" className={'last-td text-center'}>Amallar</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((element, index) => {
                                return (
                                    <Tr key={index} className={'hover-tr-success'}>
                                        <Td>
                                            {show_count == "all"
                                                ? index + 1
                                                : show_count * (page - 1) + index + 1}
                                        </Td>

                                        <Td>
                                            {
                                                element?.examination_area_payment?.payment_type?.type === 'cash' ?
                                                    <NavLink
                                                        to={'/cashier/student-payments/' + element?.examination_area_payment?.id}>
                                                        {element?.student_fio}
                                                    </NavLink>
                                                    :
                                                    <span>{element?.student_fio}</span>
                                            }

                                        </Td>
                                        <Td className={'text-center'}>
                                            {element?.student_passport}
                                        </Td>

                                        <Td className={'text-center'}>
                                            <NumberFormat
                                                value={element?.examination_area_payment?.amount}
                                                thousandSeparator={true}
                                                displayType={"text"}
                                            />
                                        </Td>
                                        <Td className={'text-center'}>
                                            {element?.examination_area_payment?.examination_area_payment_type?.name} / {element?.examination_area_payment?.payment_type?.name}
                                        </Td>
                                        <Td className={'text-center'}>
                                            <Popconfirm placement={"left"} title={'To`lovni bekor qilasizmi ?'}
                                                        onConfirm={e => cancel_payment(element)} okText={'Ha'}
                                                        cancelText={'Yo`q'}>
                                                <button className={'btn btn-outline-danger'}><i
                                                    className={'fa fa-times'}></i></button>
                                            </Popconfirm>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </>
            )}
            {data?.length > 0 && (
                <Row>
                    <Col xl={3}>
                        <div className=" d-flex justify-content-between align-items-center font-weight-bold">
                            <span>{t("Show")}</span>
                            <select
                                className="custom-select mx-2"
                                value={show_count}
                                onChange={e => {
                                    setshow_count(e.target.value);
                                    setpage(1);
                                }}
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value={total}>{t("All")}</option>
                            </select>
                            <span>{t("Entries")}</span>
                        </div>
                    </Col>
                    <Col xl={9} className="d-flex justify-content-end">
                        <PaginationComponent
                            totalItems={total}
                            pageSize={show_count}
                            onSelect={e => handleSelected(e, true)}
                            // maxPaginationNumbers={Math.ceil(total / show_count)}
                            defaultActivePage={1}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default withTranslation()(StudentPaymentConfirmedsIndex);
