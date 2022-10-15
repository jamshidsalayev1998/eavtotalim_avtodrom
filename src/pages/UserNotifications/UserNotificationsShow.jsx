import React, {useState, useEffect} from "react"
import {
    Card,
    CardBody,
    Container
} from "reactstrap"
import axios from "axios"
import {NavLink, useHistory, useRouteMatch,useLocation} from "react-router-dom"
import {isEmpty} from "lodash"
import {withTranslation, useTranslation} from "react-i18next"
import {PATH_PREFIX} from "Utils/AppVariables"
import {DataLoader} from "pages/Loaders/Loaders"
import {Col,Row} from "antd";
import MathJax from 'react-mathjax-preview';

const UserNotificationsShow = props => {
    const [data, setData] = useState([]);
    const {t} = useTranslation()
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const match = useRouteMatch('/user/notifications/:id')
    // const location = useLocation();

    // sort with values by database
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoading(true);
        axios({
            url: PATH_PREFIX+'/notification/my-notification-show/'+match?.params?.id,
            method:'GET',
            params:{
                token
            }
        }).then(response => {
            if (response?.data?.status == 1){
                setData(response?.data?.data);
                setIsLoading(false);
            }
        })

    }, [match?.params?.id])
    return (
        <>
            <div className="page-content">
                <Container fluid>

                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <div className="d-flex">
                                     <span className="mr-3" onClick={() => history.goBack()} style={{cursor:'pointer'}}>
                                  <i className="bx bx-arrow-back"> </i>
                                </span>
                                    <h5 className="text-dark"></h5>
                                </div>

                            </div>
                            <div className="crypto-buy-sell-nav">
                                {
                                    isLoading &&
                                    <DataLoader/>
                                }
                                {
                                    !isLoading &&
                                    <Row >
                                        <Col xl={24} className="text-center">
                                            <b>{data?.name_uz}</b>
                                        </Col>
                                        <Col xl={24}>
                                            <MathJax  math={data?.body_uz} />
                                        </Col>
                                    </Row>
                                }

                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default (withTranslation()(UserNotificationsShow))