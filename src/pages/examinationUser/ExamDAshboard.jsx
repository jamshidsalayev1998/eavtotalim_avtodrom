import PropTypes from 'prop-types'
import React, {useState, useEffect} from "react"
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Media,
    Table,
} from "reactstrap"
import {Link} from "react-router-dom"

//import Charts
import StackedColumnChart from "./StackedColumnChart"


// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import {withTranslation} from "react-i18next"
import axios from "axios";
import {PATH_PREFIX} from "../../Utils/AppVariables";

const ExamDashboard = props => {
    const [modal, setmodal] = useState(false)
    const token = localStorage.getItem('token');
    const [data, setData] = useState()

    useEffect(() => {
        axios({
            url: PATH_PREFIX + '/examination-director/dashboard',
            method: 'GET',
            params: {
                token
            }
        }).then(res => {
            if (res?.data?.status == 1) {
                setData(res?.data?.data);
            }
        })
    }, [])
    const reports = [
        {title: "Test topshirganlar", iconClass: "bx-copy-alt", description: data?.count_statuses?.all_count},
        {title: "O'tganlar", iconClass: "bx bx-comment-minus", description: data?.count_statuses?.succesed_count},
        {
            title: "Qaytganlar",
            iconClass: "bx bx-rotate-left",
            description: data?.count_statuses?.returned_count,
        },
    ]
    const email = [
        {title: "Week", linkto: "#", isActive: false},
        {title: "Month", linkto: "#", isActive: false},
        {title: "Year", linkto: "#", isActive: true},
    ]

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Row>
                        <Col xl="4">
                            <WelcomeComp data={data}/>
                            <MonthlyEarning data={data}/>
                        </Col>
                        <Col xl="8">
                            <Row>
                                {/* Reports Render */}
                                {reports.map((report, key) => (
                                    <Col md="4" key={"_col_" + key}>
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <Media body>
                                                        <p className="text-muted font-weight-medium">
                                                            {report.title}
                                                        </p>
                                                        <h4 className="mb-0">{report.description}</h4>
                                                    </Media>
                                                    <div
                                                        className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                    <span className="avatar-title">
                                                      <i
                                                          className={
                                                              "bx " + report.iconClass + " font-size-24"
                                                          }
                                                      ></i>
                                                    </span>
                                                    </div>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4 float-sm-left">
                                        {data?.this_year} - yildagi oylik kelganlar
                                    </CardTitle>
                                    <div className="clearfix"></div>
                                    {
                                        data &&
                                        <StackedColumnChart data={data}/>

                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                    <Row>
                        <Col lg="12">
                            {
                                data &&
                                <LatestTranaction data={data}/>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    )
}

ExamDashboard.propTypes = {
    t: PropTypes.any
}

export default withTranslation()(ExamDashboard)
