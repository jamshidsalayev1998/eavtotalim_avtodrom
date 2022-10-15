import React from "react";
import {Col, Row} from "antd";

const QueueNumbersComponent = (props) => {
    const {bgColor, data} = props;
    return (
        <Row gutter={[20, 20]} className={''}>
            {
                data ? data?.map((element, index) => {
                    return (
                        <Col xl={4} className={'text-center'}>
                            <div className={`${bgColor}` + ' p-3'} style={{fontSize: '25px'}}>
                                {element?.unikal_number}
                            </div>
                        </Col>
                    )
                }) : ''
            }


        </Row>
    )
}

export default QueueNumbersComponent;