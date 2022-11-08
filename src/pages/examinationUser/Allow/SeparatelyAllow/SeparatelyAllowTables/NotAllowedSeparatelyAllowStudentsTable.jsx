import React, {useState, useEffect} from "react";
import {Row, Col, Badge} from "reactstrap";
import axios from "axios";
import {NavLink, useHistory} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import {Select, Input, Modal, Form, message, Button, Table, Popconfirm, Tooltip} from "antd";
import PaginationComponent from "react-reactstrap-pagination";
import useDebounce from "../../../../../components/CustomHooks/useDebounce";

const NotAllowedSeparatelyAllowStudentsTable = ({}) => {
    const {Option} = Select;
    const history = useHistory();
    const {t} = useTranslation();
    const [get_again, set_get_again] = useState(false);
    const [show_count, setshow_count] = useState("10");
    const [page, setpage] = useState("1");
    const [total, settotal] = useState("1");
    const [paymentTypes, setPaymentTypes] = useState();
    const [selected, setSelected] = useState();
    const [word, setword] = useState(
        localStorage.getItem(
            window.location.pathname + "-not-confirmed-default-search-word"
        )
    );
    const [organization_id, set_selected_organization_id] = useState(
        localStorage.getItem(
            window.location.pathname + "-not-confirmed-default-organization-id"
        )
            ? localStorage.getItem(
                window.location.pathname + "-not-confirmed-default-organization-id"
            )
            : "all"
    );
    const [group_id, set_selected_group_id] = useState(
        localStorage.getItem(
            window.location.pathname + "-not-confirmed-default-group-id"
        )
            ? localStorage.getItem(
                window.location.pathname + "-not-confirmed-default-group-id"
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
            url: PATH_PREFIX + '/come-examination/separately-students-allow',
            method: 'GET',
            params: {
                token,
                organization_id,
                group_id,
                show_count,
                page,
                status: '1',
                exam_result: 'null',
                word
            }
        }).then(res => {
            setIsLoading(false)
            let sortingArr = res?.data?.forSortArray;
            let dataOrg = res?.data?.data?.data;
            let dataSorted = [...dataOrg]?.sort(function (a, b) {
                return sortingArr.indexOf(a.id) - sortingArr.indexOf(b.id);
            });
            console.log('sorted' , dataOrg)
            setData(dataSorted);
            // setData(res?.data?.data?.data);
            set_filters(res?.data?.filters);
            settotal(res?.data?.data?.total)

        })

    }, [get_again, show_count, organization_id, waitWord, group_id]);

    const change_word = word => {
        setword(word);
        localStorage.setItem(
            window.location.pathname + "-not-confirmed-default-search-word",
            word
        );
    };

    const change_organization_id = element_id => {
        set_selected_group_id("all");
        localStorage.setItem(
            window.location.pathname + "-not-confirmed-default-group-id",
            'all'
        );
        set_groups([]);
        set_selected_organization_id(element_id);
        localStorage.setItem(
            window.location.pathname + "-not-confirmed-default-organization-id",
            element_id
        );
    };
    const change_group_id = element_id => {
        set_selected_group_id(element_id);
        localStorage.setItem(
            window.location.pathname + "-not-confirmed-default-group-id",
            element_id
        );
    };
    const columns = [
        {
            title: 'F.I.O',
            render: (index, element) => <>{element?.student_fio}</>
        },
        {
            title: 'Raqami',
            render: (index, element) => <>{element?.unikal_number}</>
        },
        {
            title: 'Pasport',
            render: (index, element) => <>{element?.student_passport}</>
        },
        {
            title: 'Tashkilot',
            render: (index, element) => <>{JSON.parse(element?.info)?.organization_name}</>
        },
        {
            title: 'Test topshirish holati',
            className: ' text-center',
            render: (index, element) => <>{element?.type == 'resubmit' ? 'Qayta topshirish' : 'Birinchi marta'}</>
        },
        {
            title: 'To`lov holati',
            className: 'last-td text-center',
            render: (index, element) => <>{element?.payment_status == '1' ? <Badge color={'success'}>To`langan</Badge> :
                <Badge color={'danger'}>To`lanmagan</Badge>}</>
        },
        {
            title: 'Ruxsat berish',
            className: 'last-td',
            render: (index, element) => <>{
                parseInt(element?.payment_status) ?
                    <Popconfirm title={'O`quvchiga testga ruxsat berilsinmi'}
                                onConfirm={() => allow_student(element?.id)} okText={'Ruxsat berish'}
                                cancelText={'Bekor qilish'}>
                        <Button disabled={!parseInt(element?.payment_status)}
                                className={parseInt(element?.payment_status) === 1 ? 'btn btn-outline-success text-success' : 'btn btn-outline-dark'}>
                            <i className={'fa fa-check'}/>
                        </Button>
                    </Popconfirm> :
                    <Button disabled={!parseInt(element?.payment_status)}
                            className={parseInt(element?.payment_status) === 1 ? 'btn btn-outline-success text-success' : 'btn btn-outline-dark'}>
                        <i className={'fa fa-check'}/>
                    </Button>
            }

            </>
        },

    ];
    const allow_student = (student_id) => {
        const token = localStorage.getItem('token');
        const form_data = new FormData();
        form_data.append('final_access_student_id', student_id);
        if (student_id) {
            axios({
                url: PATH_PREFIX + '/go-examination/allow-separately-student-to-final-exam',
                method: 'POST',
                params: {token},
                data: form_data,
            }).then(res => {
                if (res?.data?.status == 1) {
                    history.push(`/come-examination/allow-students/separately/${res?.data?.final_access_student?.id}`);
                    // window.location.href = '/come-examination/allow-students/separately/'+res?.data?.final_access_student?.id;
                    message.success(res?.data?.message);
                    set_get_again(!get_again);
                }
                if (res?.data?.status == 0) {
                    message.error(res?.data?.message)
                }
            })
        }
    }

    return (
        <>
            <Row style={{justifyContent: "space-between"}}>
                <Col xl={3}>
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
                <Col xl={3}>
                    <label htmlFor="">Guruh</label>
                    <Select
                        showSearch
                        style={{width: "100%"}}
                        placeholder="Guruh"
                        optionFilterProp="children"
                        onChange={e => {
                            change_group_id(e);
                            setpage(1)
                        }}
                        defaultValue="all"
                        value={group_id != 'all' ? Number(group_id) : 'all'}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="all">Barchasi</Option>
                        {filters?.groups?.map((element, index) => {
                            return (
                                <Option value={element?.id} key={index}>
                                    {element?.type == 'first' ? element?.group?.name_uz : element?.name}
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
            <>
                <Table dataSource={data} columns={columns} pagination={false} loading={isLoading}/>
            </>
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

export default withTranslation()(NotAllowedSeparatelyAllowStudentsTable);
