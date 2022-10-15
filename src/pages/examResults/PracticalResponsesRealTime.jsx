import React, {useEffect, useState} from 'react'
import {Card, Table} from "antd";
import {getAllSensorResponses} from "../../services/api_services/getAllSensorResponses";
import moment from "moment";

const PracticalResponsesRealTime = () => {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pause, setPause] = useState(false);
    const pause_request = () => {
        setPause(!pause)
    }
    useEffect(() => {
        let interval = setInterval(() => {
            if (!pause) {
                getData();
            }
        }, 1000)
        return (() => {
            clearInterval(interval)
        })
    }, [reload]);
    const getData = () => {
        if (!pause) {
            (async () => {
                setIsLoading(true)
                const res = await getAllSensorResponses({show: 10});
                setData(res?.data)
                setIsLoading(false)
            })()
        }

    }

    let columns = [
        {
            title: 'sensor_id',
            render: (index, element) => <>{element?.value?.data?.sensor_id}</>
        },
        {
            title: 'car_id',
            render: (index, element) => <>{element?.value?.data?.car_id}</>
        },
        {
            title: 'result',
            render: (index, element) => <>{element?.value?.data?.result}</>
        },
        {
            title: 'created_at',
            render: (index, element) => <>{moment(element?.created_at).format('YYYY-MM-DD HH:mm:ss')}</>
        }
    ]
    return (
        <>
            <Card>
                <button className="btn btn-primary" onClick={pause_request}>{!pause ? <i className="fa fa-pause"></i> :
                    <i className="fa fa-play"></i>}</button>
                <Table loading={isLoading} dataSource={data} columns={columns}/>
            </Card>
        </>
    )
}

export default PracticalResponsesRealTime;