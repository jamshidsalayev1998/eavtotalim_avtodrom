import React, {useEffect, useState} from "react";
import {Card, CardBody, Container, Badge} from "reactstrap";
import {message, Table, Popconfirm} from "antd";
import {NavLink} from "react-router-dom";
import {getCarParamsApi} from "../../services/api_services/car_params/car_params_api";
import moment from "moment";

const CarParamsIndex = ({}) => {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [reload, setReload] = useState(false);
    const columns = [
         {
            title:'created_at',
            render: (index,element) => <>{moment(element?.created_at).format('Y-MM-D H:m:s')}</>
        },
        {
            title:'Car id',
            dataIndex:'car_id',
            key:'car_id',
        },
        {
            title:'light',
            dataIndex:'light',
            key:'light',
        },
         {
            title:'right',
            dataIndex:'right',
            key:'right',
        },
        {
            title:'left',
            dataIndex:'left',
            key:'left',
        },
        {
            title:'remen',
            dataIndex:'remen',
            key:'remen',
        },
         {
            title:'engine',
            dataIndex:'engine',
            key:'engine',
        },
         {
            title:'arg1',
            dataIndex:'arg1',
            key:'arg1',
        },
    ]

    useEffect(() => {
        (async () => {
            const res = await getCarParamsApi({});
            if (parseInt(res?.status) === 1){
                setData(res?.data)
            }
        })();
        setTimeout(() => {
            setReload(!reload)
        }, 1000)
    }, [reload])

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations d-flex justify-content-between">
                                <h5 className="text-dark">Car params</h5>
                                <div className={'d-flex'}>
                                </div>
                            </div>
                            <div className="crypto-buy-sell-nav mt-3">
                                <Table pagination={false} dataSource={data} columns={columns}/>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default (CarParamsIndex);