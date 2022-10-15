import React, {useContext, useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {Table, Row, Col, Card, Tooltip, Skeleton, message, Popconfirm} from "antd";
import {CardBody, Container,} from "reactstrap";
import {computerTestEndApi, getExamProcessComputers} from "../../../../../services/api_services/final_test_admin_api";
import {clearComputerApi} from "../../../../../services/api_services/computers_api";

const ExamProcessByComputerTab = (props) => {
    const {reload, setReload} = props;
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const resp = await getExamProcessComputers();
            setData(resp?.data)
        })()
    }, [reload]);
    const clearComputer = (computer) => {
        (async () => {
            const res = await clearComputerApi(computer?.id);
            if (parseInt(res?.status) === 1) {
                message.success(res?.message);
                setReload(!reload)
            }
        })()
    }
    const computerEndTest = (final_access_student_id) => {
        (async () => {
            const res = await computerTestEndApi(final_access_student_id);
            if (parseInt(res?.status) === 1) {
                message.success(res?.message);
                setReload(!reload)
            }
            else{
                message.error(res?.message);

            }
        })()
    }
    return (
        <Row className={''} gutter={[12, 12]}>
            {
                data ? data?.map((element, index) => {
                    return (
                        <Col xl={6}>
                            <Card hoverable={true}
                                  title={
                                      <div className={'d-flex justify-content-between'}>
                                          <span>{element?.merge ? 'Band' : 'Bo`sh'}</span> <b>{element?.order}</b></div>
                                  }
                                  className={'p-2 border text-center'}
                                  bordered={false}
                                  style={{height: '100%'}}
                                  actions={[
                                      <Tooltip placement={'bottom'} title={'Bo`shatish'}>
                                          {
                                              element?.merge ?
                                                  <Popconfirm title={'Kompyuterni bo`shatasizmi ?'}
                                                              okText={'Bo`shatish'} cancelText={'Bekor qilish'} onConfirm={() => clearComputer(element)}>
                                                  <span style={{fontSize: '25px', color: '#52c41a'}}><i
                                                      className={'bx bxs-brush-alt'}/></span></Popconfirm> :
                                                  <span style={{fontSize: '25px', color: '#faad14'}}><i
                                                      className={'bx bxs-brush-alt'}/></span>
                                          }

                                      </Tooltip>
                                      ,
                                      <Tooltip placement={'bottom'} title={'Testni tugatish'}>
                                          {
                                              element?.merge ?
                                                  <Popconfirm title={'Testni tugatasizmi ?'} okText={'Tugatish'}
                                                              cancelText={'Bekor qilish'} onConfirm={()=>computerEndTest(element?.merge?.final_access_student?.id)}>
                                              <span style={{fontSize: '25px', color: '#f5222d'}}><i
                                                  class='bx bx-x'/></span>
                                                  </Popconfirm>
                                                  :
                                                  <span style={{fontSize: '25px', color: '#f5222d'}}><i
                                                      class='bx bx-x'/></span>
                                          }
                                      </Tooltip>
                                  ]}

                            >
                                {
                                    element?.merge ?
                                        <div>
                                            <h4>{element?.merge?.final_access_student?.student_fio}</h4>
                                            <h4>{element?.merge?.final_access_student?.student_passport}</h4>
                                        </div> :
                                        <Skeleton
                                            loading={true}
                                            paragraph={{
                                                rows: 0,
                                            }}

                                        >
                                        </Skeleton>
                                }

                            </Card>
                        </Col>
                    )
                }) : ''
            }

        </Row>
    );
};
export default withTranslation()(ExamProcessByComputerTab);
