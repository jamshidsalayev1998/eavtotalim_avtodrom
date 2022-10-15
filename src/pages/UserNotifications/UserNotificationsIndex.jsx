import React, {useState, useEffect} from "react";
import {Card, CardBody, Container, Row, Col} from "reactstrap";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import {isEmpty} from "lodash";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import {DataLoader} from "pages/Loaders/Loaders";


const UserNotificationsIndex = props => {
    const [data, setData] = useState([]);
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    // sort with values by database
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        axios({
            url: PATH_PREFIX + "/notification/my-notifications",
            method: "GET",
            params: {
                token,
            },
        }).then(response => {
            if (response?.data?.status == 1) {
                setData(response?.data?.data?.data);
                setIsLoading(false);
            }
        });
    }, []);
    return (
        <>
            <div className="page-content">
                <Container fluid>

                    <div className="top-organizations">
                        <h5 className="text-dark">Yangiliklar</h5>

                    </div>
                    <div className="crypto-buy-sell-nav">
                        {isLoading && <DataLoader/>}
                        {!isLoading && (
                            <>
                                {!isEmpty(data) &&
                                data?.map((element, index) => {
                                    return (
                                        <NavLink
                                            to={
                                                {
                                                    pathname: `/user/notifications/${element?.id}`,

                                                }}
                                            className="text-black"
                                            style={{color: "grey"}}
                                            key={element?.id}
                                        >
                                            <Card className="card_item">
                                                <CardBody className="py-2 align-middle">
                                                    <Container fluid>
                                                        <Row>
                                                            <Col xl={12} lg={12} md={12}>
                                                                <div className="d-flex align-items-center p-3">
                                                                    <div
                                                                        className="mr-3 text-success"
                                                                    >
                                                                        {
                                                                            !element?.i_read.length > 0 &&
                                                                            <i className="bx bx-credit-card-front"></i>
                                                                        }
                                                                    </div>
                                                                    <div className="subject_text">
                                                                        <h5 className="hover_effect_card">
                                                                            {element?.name_uz}
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </Col>


                                                        </Row>
                                                    </Container>
                                                </CardBody>
                                            </Card>
                                        </NavLink>
                                    );
                                })}
                            </>
                        )}
                    </div>

                </Container>
            </div>
        </>
    );
};

export default withTranslation()(UserNotificationsIndex);
