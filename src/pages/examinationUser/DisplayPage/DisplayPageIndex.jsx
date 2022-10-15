import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";


import {Row, Col, Select, Input, Pagination, message} from "antd";
import axios from "axios";
import {PATH_PREFIX} from "../../../Utils/AppVariables";
import {DataLoader} from "../../Loaders/Loaders";
import useDebounce from "../../../components/CustomHooks/useDebounce";
import DisplayPageIndexTable from "./DisplayPageIndexTable";
import MainContext from "../../../Context/MainContext";

const DisplayPageIndex = props => {
    const [data, setData] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const {hasLayout, setHasLayout} = useContext(MainContext);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // setIsloading(true)
        axios({
            url: PATH_PREFIX + '/examination-user/results-by-student-for-display',
            method: 'GET',
            params: {
                token,
            }
        }).then(response => {
            if (response?.data?.status == 1) {
                setData(response?.data?.data);
                // setIsloading(false)
            }
        })
        setTimeout(() => {
            setReload(!reload)
        }, 5000)
    }, [reload]);


    return (
        <>
            <div className="page-content" style={!hasLayout ? {padding: '1px'} : {}}>
                <Container fluid style={!hasLayout ? {padding: '1px'} : {}}>
                    <Card>
                        <CardBody>
                            <Row className="d-flex justify-content-end">
                                <button className="btn btn-outline-light" onClick={() => setHasLayout(!hasLayout)}><i
                                    class={hasLayout ? `fa fa-expand` : `fa fa-compress`} aria-hidden="true"></i>
                                </button>
                            </Row>
                            <div className="crypto-buy-sell-nav mt-3">
                                {
                                    !isloading ?
                                        <Row>
                                            <Col xl={24}>
                                                <DisplayPageIndexTable tableData={data}/>
                                            </Col>
                                        </Row>
                                        : <DataLoader/>
                                }
                                <Row className="d-flex justify-content-end mt-2">
                                    {/*<Pagination defaultCurrent={1} current={params.page} defaultPageSize={10}   total={total} onChange={e => select_page(e)} onShowSizeChange={(page , e) => show_count_change(e)} />*/}
                                </Row>

                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default withTranslation()(DisplayPageIndex);
