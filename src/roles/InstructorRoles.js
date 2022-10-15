import React, {useContext} from "react"
import PropTypes from 'prop-types'
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { instructorRoutes,all_user_routes,authRoutes } from "../routes/allRoutes";

// Import all middleware
import Authmiddleware from "../routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "../components/VerticalLayout"
import HorizontalLayout from "../components/HorizontalLayout"
import NonAuthLayout from "../components/NonAuthLayout"

// Import scss
import "../assets/scss/theme.scss"
import MainContext from "../Context/MainContext";


const InstructorRoles = props => {
    const {hasLayout} = useContext(MainContext);
    function getLayout() {
        let layoutCls = VerticalLayout

        switch (props.layout.layoutType) {
            case "horizontal":
                layoutCls = HorizontalLayout
                break
            default:
                layoutCls = VerticalLayout
                break
        }
        return layoutCls
    }

    const Layout = getLayout();

    return (
        <React.Fragment>
            <Router>
                <Switch>
                    {authRoutes.map((route, idx) => (
                        <Authmiddleware
                            path={route.path}
                            layout={NonAuthLayout}
                            component={route.component}
                            key={idx}
                        />
                    ))}
                     {all_user_routes.map((route, idx) => (
                        <Authmiddleware
                            path={route.path}
                            layout={Layout}
                            component={route.component}
                            key={idx}
                            exact
                        />
                    ))}

                    {instructorRoutes.map((route, idx) => (
                        <Authmiddleware
                            path={route.path}
                            layout={hasLayout ? Layout: NonAuthLayout}
                            component={route.component}
                            key={idx}
                            exact
                        />
                    ))}

                    <Redirect to="/" />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

InstructorRoles.propTypes = {
    layout: PropTypes.any
}

const mapStateToProps = state => {
    return {
        layout: state.Layout,
    }
}

export default connect(mapStateToProps, null)(InstructorRoles)
