import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, useHistory, Route, Redirect, Switch } from "react-router-dom";
import Authmiddleware from '../routes/middleware/Authmiddleware';
import VerticalLayout from '../components/VerticalLayout';
import HorizontalLayout from '../components/HorizontalLayout';
import NonAuthLayout from '../components/NonAuthLayout';
import Login from '../pages/Authentication/Login';
import {
    userRoutes,
    authRoutes,
    examinationUserRoutes,
    finalyExamination
} from "../routes/allRoutes";
import MainContext from 'Context/MainContext';
import ComputerSettingsPage from "../pages/examinationUser/Computers/Config/ComputerSettingsPage";




const Roles = (props) => {


    const { role } = useContext(MainContext);
    const getLayout = () => {
        let layoutCls = VerticalLayout;

        switch (props.layout.layoutType) {
            case "horizontal":
                layoutCls = HorizontalLayout
                break
            default:
                layoutCls = VerticalLayout
                break
        }

        return layoutCls;
    }

    const Layout = getLayout();

    const renderItems = (routeItems) => {
        return (
            routeItems.map((route, idx) => {
                <Authmiddleware
                    path={route.path}
                    layout={Layout}
                    component={route.component}
                    key={idx}
                    exact
                />
            })
        )
    }

    const getRolesLoop = () => {
        switch (role) {
            case "777":
                return renderItems(userRoutes);
            case "13":
                return renderItems(examinationUserRoutes);
            case "15":
                return renderItems(finalyExamination);
            default:
                return (
                    <>
                        <Route component={Login} path="/login" exact />
                        <Route component={ComputerSettingsPage} path="/computer-settings" exact />
                        <Redirect to="/login" />
                    </>
                );
        }
    }

    return (
        <React.Fragment>
            <div>
                <Router>
                    <Switch>
                        {
                            authRoutes.map((route, idx) => {
                                <Authmiddleware
                                    path={route.path}
                                    layout={Layout}
                                    component={route.component}
                                    key={idx}
                                    exact
                                />
                            })
                        }
                        {
                            getRolesLoop()
                        }
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </div>
        </React.Fragment>
    )



}




const mapStateToProps = state => {
    return {
        layout: state.Layout
    }
}


export default connect(mapStateToProps)(Roles);