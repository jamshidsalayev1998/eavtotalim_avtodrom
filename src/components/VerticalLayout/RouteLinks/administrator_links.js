import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IS_EDUCATION, IS_EXAM, IS_PRINT, IS_USER, IS_ROOM, IS_REPORT, IS_FINAL_EXAM } from "store/sidebar/actions";
import MainContext from "Context/MainContext";
import { useSelector, useDispatch } from "react-redux";



const AdministratorLinks = (props) => {

    const { t } = useTranslation()

    const layout = useSelector(state => state.Layout);

    const { role, user_type } = useContext(MainContext);
    const dispatch = useDispatch();
    const sidebarState = useSelector(state => state.sidebar_content);

    const toggleMenuBox = action_type => {
        dispatch({ type: action_type });
    };

    if (layout.leftMenu) {
        return (
            <React.Fragment>
                <div id="sidebar-menu"
                    style={layout?.leftMenu ?
                        { position: 'fixed', height: '90vh', overflow: 'auto' } : null}>
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li style={{ backgroundColor: '#ff7a45' }}>
                            <Link to="/" className="waves-effect">
                                <i className="fas fa-home"></i>
                                <span>{props.t("Home")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/come-examination/come-groups" className="waves-effect">
                                <i className="fas fa-layer-group"></i>
                                <span>Guruh bo'yicha keluvchilar</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <div id="sidebar-menu"
                    style={layout?.leftMenu ?
                        { position: 'fixed', height: '90vh', overflow: 'auto' } : null}>
                    <ul className="metismenu list-unstyled" id="side-menu">

                        <li className="" name="asosiy" style={{ backgroundColor: '#ff7a45' }}>
                            <Link to="/" className="waves-effect">
                                <i className="fas fa-home"></i>
                                <span>Bosh sahifa</span>
                            </Link>
                        </li>
                        <li className="" name="asosiy" >
                            <Link to="/come-examination/come-groups" className="waves-effect">
                                <i className="fas fa-layer-group"></i>
                                <span>Guruh bo'yicha keluvchilar</span>
                            </Link>
                        </li>

                        <li className="" name="asosiy" >
                            <Link to="/examination/resubmit" className="waves-effect">
                                <i className="fas fa-poll-h"></i>
                                <span>Qayta topshirish uchun guruhlash</span>
                            </Link>
                        </li>
                        <li className="" name="asosiy" >
                            <Link to="/examination-administrator/all-students" className="waves-effect">
                                <i className="fas fa-poll-h"></i>
                                <span>Barcha keluvchilar</span>
                            </Link>
                        </li>
                        <li className="" name="asosiy" >
                            <Link to="/examination-administrator/certificate" className="waves-effect">
                                <i className="fas fa-poll-h"></i>
                                <span>Sertifikat chiqarish</span>
                            </Link>
                        </li>
                        <li className="" name="asosiy" >
                            <Link to="/examination/queue-display" className="waves-effect">
                                <i className="fas fa-poll-h"></i>
                                <span>Navbat</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default AdministratorLinks;