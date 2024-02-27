import React from "react"

import {Row, Col, Card, CardBody, CardTitle} from "reactstrap"
import {Link} from "react-router-dom"

import ApexRadial from "./ApexRadial"

const MonthlyEarning = ({data}) => {
    const get_percent = (data) => {
        let last_month = data?.count_statuses?.last_month;
        let this_month = data?.count_statuses?.this_month;
        let ob = null;
        if (last_month == 0) {
            let percent = 100;
            ob = {
                percent: percent,
                color: 'text-success',
                icon: ''
            }
        } else {
            if (this_month > last_month) {
                let percent = (this_month - last_month) / last_month * 100;
                ob = {
                    percent: percent,
                    color: 'text-success',
                    icon: 'mdi mdi-arrow-up'
                }
            } else if (this_month < last_month) {
                let percent = (last_month - this_month) / last_month * 100;
                ob = {
                    percent: percent,
                    color: 'text-danger',
                    icon: 'mdi mdi-arrow-down'
                }
            } else {
                let percent = 0;
                ob = {
                    percent: percent,
                    color: 'text-dark',
                    icon: ''
                }
            }
        }

        return ob;
    }

    return (
        <React.Fragment>
            {" "}
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">Oy davomida kelganlar</CardTitle>
                    <Row>
                        <Col sm="6">
                            <p className="text-muted">Bu oy</p>
                            <h3>{data?.count_statuses?.this_month}</h3>
                            <p className="text-muted">
                <span className={get_percent(data)?.color}>
                  {" "}
                    {get_percent(data)?.percent}% <i className="mdi mdi-arrow-up"></i>{" "}
                </span>{" "}
                                O'tgan oyga nisbatan
                            </p>
                            <div className="mt-4">
                                <Link
                                    to=""
                                    className="btn btn-primary waves-effect waves-light btn-sm"
                                >
                                    View More <i className="mdi mdi-arrow-right ml-1"></i>
                                </Link>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="mt-4 mt-sm-0">
                                {
                                    data &&
                                    <ApexRadial data={data}/>

                                }
                            </div>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default MonthlyEarning
