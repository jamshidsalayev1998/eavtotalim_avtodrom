import React, {useState, useEffect, useContext, useCallback} from "react"
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Modal
} from "reactstrap"
import axios from "axios"
import {NavLink, useHistory} from "react-router-dom"
import {connect, useDispatch} from "react-redux"
import {isEmpty} from "lodash"
import {withTranslation, useTranslation} from "react-i18next"
import MainContext from "Context/MainContext"
import {PATH_PREFIX} from "Utils/AppVariables"
import Swal from "sweetalert2"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import {preventDefault} from "leaflet/src/dom/DomEvent";
import {deleteData} from '../../services/deleteData';


const UserProfile = props => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {setAuth} = useContext(MainContext)
    

    const { t } = useTranslation()


    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}


export default (withTranslation()(UserProfile))
