import React, {useContext} from "react";
import {withTranslation} from "react-i18next";
import {Table, Row, Col} from "antd";

const QueuePageIndexTable = ({tableData}) => {

    const columns = [
        {
            title: 'Raqam',
            dataIndex: 'unikal_number',
            key: 'unikal_number',
            render: (text, row) => <> {row?.unikal_number ? row?.unikal_number : row?.student_fio} </>,
        }

    ];


    const data = tableData;
    return (
        <Row style={{height:'100vh'}}>
            <Col xl={12} className={'border-right'}>
                <Table columns={columns} dataSource={data} pagination={false}/>
            </Col>
            <Col xl={12} className={'border-right'}>
                <Table columns={columns} dataSource={data} pagination={false}/>
            </Col>

        </Row>
    );
};

export default withTranslation()(QueuePageIndexTable);
