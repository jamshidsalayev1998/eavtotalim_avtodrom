import React, {useState, useEffect, useContext} from "react"
import PropTypes from 'prop-types'
import {Link, useHistory} from "react-router-dom"
import {Dropdown, DropdownToggle, DropdownMenu, Row, Col} from "reactstrap"
import SimpleBar from "simplebar-react"
import {withTranslation} from "react-i18next"
import axios from "axios";
import {PATH_PREFIX} from "../../../Utils/AppVariables";
import MainContext from "../../../Context/MainContext";
import {notification} from 'antd';
import "./notification_style.css"

const NotificationDropdown = props => {

    const {role} = useContext(MainContext);
    const [menu, setMenu] = useState(false)
    const [notifications, setnotifications] = useState([]);
    const history = useHistory();

    useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     axios({
    //         url: PATH_PREFIX + '/notification/new-notifications',
    //         method: 'GET',
    //         params: {
    //             token,
    //         }
    //     }).then(response => {
    //         if (response?.data?.status == 1) {
    //             setnotifications(response?.data?.data);
    //         }
    //     })
    }, [])
    const openNotification = (myNotification) => {
        notification.info({
            message: `Yangilik `,
            description:
            myNotification?.name_uz,
            placement: 'topRight',
            onClick: () => {
                history.push(`/user/notifications/${myNotification?.id}`);
                notification.close(myNotification?.id)
            },
            className:'notification-hover',
            key:myNotification?.id,
        });
    }
    return (
        <>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="dropdown d-inline-block"
                tag="li"
            >
                <DropdownToggle
                    className="btn header-item noti-icon waves-effect"
                    tag="button"
                    id="page-header-notifications-dropdown"
                >
                    <i className="bx bx-bell bx-tada"/>
                    <span
                        className="badge badge-danger badge-pill">{notifications.length > 0 && notifications.length}</span>
                </DropdownToggle>

                <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0" right>
                    <div className="p-3">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0"> {props.t("Notifications")} </h6>
                            </Col>
                            <div className="col-auto">
                                <Link to="/user/notifications" className="small">
                                    {" "}
                                    Barchasini ko'rish
                                </Link>
                            </div>
                        </Row>
                    </div>

                    <SimpleBar style={{height: "230px"}}>
                        {
                            notifications.length > 0 &&
                            notifications.map((element, index) => {
                                return (
                                    <Link
                                        to={`/user/notifications/${element?.id}`}
                                        className="text-reset notification-item" key={index}>
                                        <div className="media">

                                            <div className="media-body">
                                                <h6 className="mt-0 mb-1">
                                                    yozuv 1
                                                </h6>
                                                <div className="font-size-12 text-muted">
                                                    <p className="mb-1">
                                                        {element?.name_uz}
                                                    </p>
                                                    <p className="mb-0">
                                                        <i className="mdi mdi-clock-outline"/>{" "}
                                                        {props.t("3 min ago")}{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }

                    </SimpleBar>
                    <div className="p-2 border-top">
                        <Link
                            className="btn btn-sm btn-link font-size-14 btn-block text-center"
                            to="#"
                        >
                            {" "}
                            {props.t("View all")}{" "}
                        </Link>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
    t: PropTypes.any
}