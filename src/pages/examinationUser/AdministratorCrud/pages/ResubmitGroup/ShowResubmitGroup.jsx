import React, {useState, useEffect} from "react";
import {Card, CardBody, Container, Badge} from "reactstrap";
import axios from "axios";
import {useHistory, useRouteMatch} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import {DataLoader} from "pages/Loaders/Loaders";
import {Table} from "antd";
import Swal from "sweetalert2";
import AddStudentToResubmitGroupModal from "./AddStudentToResubmitGroupModal";

const ShowResubmitGroup = ({}) => {
    let match = useRouteMatch("/come-examination/resubmit/no-allow-students/:id");
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
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // alert('sdsd')
        const token = localStorage.getItem("token");
        setIsLoading(true);
        axios({
            url: PATH_PREFIX + "/come-examination/allow-groups/" + element_id,
            method: "GET",
            params: {
                token,
                status: 1
            },
        }).then(res => {
            if (res?.data?.status == "1") {
                let a = [];
                setGroup(res?.data?.group);
                setIsLoading(false);
                res?.data?.data?.map((item, index) => {
                    if (item?.payment_status == 1) {
                        a.push(item?.id);
                    }
                });
                setStudents(res?.data?.data);
            }
        });
    }, [get_again]);
    const columns = [
        {
            title: "F.I.O",
            dataIndex: "fio",
        },
        {
            title: "Pasport",
            dataIndex: "passport",
        },
        {
            title: "Telefon",
            dataIndex: "phone",
        },
        {
            title: "To`lov holati",
            render: (element, index) => <>{element?.payment_status ? <Badge color={'success'}>to`langan</Badge> :
                <Badge color={'danger'}>to`lanmagan</Badge>}</>
        },
    ];
    const data = students;
 const showModal = () => {
        setIsModalVisible(true);
    };
    return (
        <>
            <AddStudentToResubmitGroupModal setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} groupId={element_id} set_get_again={set_get_again} get_again={get_again} />
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
                                        Qayta topshirish guruhi
                                    </h5>
                                </div>
                                <div>
                                    <button className={'btn btn-outline-success'} onClick={showModal}> <i className={'fa fa-plus'}></i> O'quvchi qo'shish </button>
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

export default withTranslation()(ShowResubmitGroup);
