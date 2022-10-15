import React, {useState, useEffect, useRef} from "react";
import {Card, CardBody, Container} from "reactstrap";
import axios from "axios";
import {useHistory, useRouteMatch} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import {DataLoader} from "pages/Loaders/Loaders";
import {Table} from "antd";
import Swal from "sweetalert2";
import FinalTestPrintComponent from "./FinalTestPrintComponent";
import {
    printToCheckSeparatelyStudentAllow,
    showSeparatelyStudentAllow
} from "../../../../services/api_services/separately_student_allow_api";

const ShowAllowedStudent = ({}) => {
    let match = useRouteMatch("/come-examination/allowed-students/:id");
    const history = useHistory();
    const {t} = useTranslation();
    const [get_again, set_get_again] = useState(false);
    const [element_id, set_element_id] = useState(match?.params?.id);
    // const [data, setData] = useState("");
    const [group, setGroup] = useState("");
    const [students, setStudents] = useState([]);
    const [selected_students, setSelectedStudents] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [selected_keys, set_selected_keys] = useState([]);

    useEffect(() => {
        // alert('sdsd')
        const token = localStorage.getItem("token");
        setIsLoading(true);
        axios({
            url: PATH_PREFIX + "/come-examination/allow-groups/" + element_id,
            method: "GET",
            params: {
                token,
                status: 2,
            },
        }).then(res => {
            if (res?.data?.status == "1") {
                let a = [];
                setGroup(res?.data?.group);
                setIsLoading(false);

                setSelectedStudents(a);
                setStudents(res?.data?.final_access_students);
            }
        });
    }, [get_again]);
    const columns = [
        {
            title: "F.I.O",
            dataIndex: "student_fio",
        },
        {
            title: "Pasport",
            dataIndex: "student_passport",
        },
        {
            title: "Telefon",
            dataIndex: "student_phone",
        },
        {
            title: 'Chek ga chop etish',
            className: ' text-center',
            render: (index, element) => <><i style={{cursor: 'pointer'}} onClick={e => printToCheck(element)}
                                             className={'fa fa-print'}></i></>
        },
    ];
    const printToCheck = (element) =>{
        (async () => {
            const res = await showSeparatelyStudentAllow(element?.id);
            if (res?.data?.status == 1) {

                const v = await printToCheckSeparatelyStudentAllow(res?.data?.data)
            }
        })()
    }
    const data = students;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

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
                                        {" "}
                                        <b>"{group?.organization?.name_uz}"</b> tashkiloti{" "}
                                        <b>"{group?.group?.name_uz}"</b> guruhidan testga ruhsat
                                        berilgan o'quvchilarga login parol berish
                                    </h5>
                                </div>
                                <div style={{display: 'flex'}}>

                                    <FinalTestPrintComponent group={group}/>
                                    {/* <button className="btn btn-success"><i className="fa fa-print"></i> Parollarni chop etish </button> */}
                                </div>
                            </div>
                            <div className="crypto-buy-sell-nav mt-3">
                                {isLoading && <DataLoader/>}
                                {!isLoading && (
                                    <>
                                        <Table
                                            columns={columns}
                                            dataSource={data}
                                            pagination={false}
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

export default withTranslation()(ShowAllowedStudent);
