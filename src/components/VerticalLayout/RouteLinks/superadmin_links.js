import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import MainContext from "Context/MainContext";



const SuperadminLinks = (props) => {

    const { t } = useTranslation()

    const layout = useSelector(state => state.Layout);

    const { role, user_type } = useContext(MainContext);
    const dispatch = useDispatch();
    const sidebarState = useSelector(state => state.sidebar_content);

    const toggleMenuBox = action_type => {
        dispatch({ type: action_type });
    };


    return (
        <React.Fragment>
            <div id="sidebar-menu" >
                <ul className="metismenu list-unstyled" id="side-menu">
                    <li className="menu-title">{props.t("Asosiy")} </li>
                    <li>
                        <Link
                            to="/dashboard"
                            className="waves-effect"
                            onClick={() => {
                                props.toggleLeftmenu(false);
                                props.changeSidebarType("default");
                            }}
                        >
                            <i className="bx bx-home-circle"></i>
                            <span>{props.t("Dashboards")}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
}

export default SuperadminLinks;