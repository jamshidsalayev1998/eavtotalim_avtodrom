import React, {useState, useEffect} from "react";
import {Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";
import {Table, Pagination} from "antd";
import moment from "moment";

const PaymentReportTable = (props) => {
    const {data, columns,isLoading, reload, setReload,tableRef} = props;

    return (
        <>
            {
                data ?
                    <Table ref={tableRef} dataSource={data} loading={isLoading} columns={columns} pagination={false} bordered={true} scroll={{
                        x: 4000,
                        y: 1300,
                    }}/> : ''
            }
        </>
    );
};

export default withTranslation()(PaymentReportTable);
