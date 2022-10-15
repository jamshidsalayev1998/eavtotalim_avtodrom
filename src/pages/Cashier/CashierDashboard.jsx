import PropTypes from 'prop-types'
import React, {useState, useEffect} from "react"
import {
    Container,
} from "reactstrap"
import {withTranslation} from "react-i18next"

const CashierDashboard = props => {
    const [modal, setmodal] = useState(false)
    const token = localStorage.getItem('token');
    const [data, setData] = useState()

    useEffect(() => {

    }, [])


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                </Container>
            </div>

        </React.Fragment>
    )
}

CashierDashboard.propTypes = {
    t: PropTypes.any
}

export default withTranslation()(CashierDashboard)
