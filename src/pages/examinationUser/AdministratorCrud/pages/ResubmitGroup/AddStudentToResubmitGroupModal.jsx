import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory, useRouteMatch} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import {DataLoader} from "pages/Loaders/Loaders";
import {Table, message, Modal} from "antd";

const AddStudentToResubmitGroupModal = ({setIsModalVisible, isModalVisible, groupId,set_get_again,get_again}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [selected_keys, set_selected_keys] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios({
            url: PATH_PREFIX + '/examination-director/resubmit/returneds-index',
            method: 'GET',
            params: {
                token
            }
        }).then(res => {
            if (res?.data?.status == 0) {
                message.error(res?.data?.message);
            }
            if (res?.data?.status == 1) {
                setData(res?.data?.data)
            }
        })
    }, [get_again]);


    const handleOk = () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('selecteds', selected_keys);
        formData.append('group_id', groupId);
        axios({
            url: PATH_PREFIX + '/examination-director/resubmit/add-to-ready-group',
            method: 'POST',
            params: {
                token
            },
            data: formData
        }).then(res => {
            if (res?.data?.status == 1) {
                message.success(res?.data?.message);
                handleCancel();
                set_get_again(!get_again)
            }
            if (res?.data?.status == 0) {
                message.error(res?.data?.message);
            }
        })

    };

    const handleCancel = () => {
        set_selected_keys([]);
        setIsModalVisible(false);
    };
    const columns = [
        {
            title: '#',
            key: 'counter',
            render: (index, row, counter) => <>{counter + 1}</>,
        },
        {
            title: 'F.I.O',
            key: 'name',
            render: (index, row, counter) => <>{row?.final_test_student_access?.student_fio}</>
        },
        {
            title: 'Phone',
            key: 'phone',
            render: (index, row, counter) => <>{row?.final_test_student_access?.student_phone}</>
        },
        {
            title: 'Passport',
            key: 'passport',
            render: (index, row, counter) => <>{row?.final_test_student_access?.student_passport}</>
        },

    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            set_selected_keys(selectedRowKeys);
        },
    };

    return (
        <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            zIndex={1005}
            width={1000}
        >
            <div style={{height: '500px', overflow: 'hidden', overflowY: 'scroll'}}>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        </Modal>
    );
};

export default withTranslation()(AddStudentToResubmitGroupModal);
