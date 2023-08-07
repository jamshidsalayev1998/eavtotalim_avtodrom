import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {Table, Tbody, Th, Thead, Tr} from "react-super-responsive-table";
import {PATH_PREFIX_FILE, PATH_PREFIX_V2} from "../../Utils/AppVariables";
import {useTranslation} from "react-i18next";
import {Badge, Card, CardBody} from "reactstrap";
import {DataLoader} from "../Loaders/Loaders";
import PaginationComponent from "react-reactstrap-pagination";
import axios from "axios";
import {Tooltip} from "antd";

const Autodrome = () => {
  const {t} = useTranslation()

  const token = localStorage.getItem("token");

  // const [show_count, setShow_count] = useState(10);
  const [selected_count, setSelected_count] = useState(1);
  const [autodromes, setAutodromes] = useState({
    data: [],
    loaded: false,
    error: "",
    total: 0,
  });

  const getAutodromes = async () => {
    return await axios.get(`${PATH_PREFIX_V2}/examination-area-organization-agreement`, {
      params: {
        token: token,
        page: selected_count
      }
    }).then(res => {
      console.log('res', res.data)
      setAutodromes({
        loaded: true,
        total: res.data.data?.length,
        data: res.data?.data,
        error: null,
      });
    }).catch(err => {
      console.log('error', err)
    });
  }

  useEffect(() => {
    getAutodromes()
  }, [selected_count])

  const agreementHandle = async (id, key, data) => {
    let res = await axios.post(`${PATH_PREFIX_V2}/examination-area-organization-agreement/${key === "accept" ? "accept" : "reject"}/${id}`, data, {
      headers: {
        'AUTHORIZATION': `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      await getAutodromes()
    }
  }

  const handleSelected = (selectedPage) => {
    setSelected_count(selectedPage);
  }

  return (
    <>
      <div
        className="page-content students"
        style={{
          backgroundColor: "#F8F9FB",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-dark">{t("autodrome")}</h5>
            </div>
            {
              !autodromes.loaded ? <DataLoader/> : <Table id="autodrome"
                                                          className="table table-striped table-bordered">
                <Thead className="font-size-14">
                  <Tr>
                    <Th data-priority="3">№</Th>
                    <Th data-priority="2">{t("Avtomaktab")}</Th>
                    <Th data-priority="3">{t("Shartnoma raqami")}</Th>
                    <Th data-priority="1">{t("Date")}</Th>
                    <Th data-priority="6">{t("Status")}</Th>
                    <Th data-priority="6">{t("File")}</Th>
                    <Th data-priority="6">{t("Actions")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    autodromes?.data?.map((el, index) => {
                      return (
                        <Tr key={el?.id}>
                          <Th className="">{index + 1}</Th>
                          <Th className="table_body">
                            {el?.organization?.name}
                          </Th>
                          <Th className="table_body">
                            {el?.agreement_number}
                          </Th>
                          <Th className="table_body">{el?.agreement_expiration_date}</Th>
                          <Th className="table_body">
                            <Badge color={el.status === 0 ? "primary" : el.status === 2 ? "warning" : "success"}
                                   className="py-1 px-2 badge badge-pill">
                              {el.status === 0 ? `${t("new")}` : el.status === 1 ? `${t("confirmed")}` : el.status === 2 ? `${t("rejected")}` : `${t("confirmed_archive")}`}</Badge>
                          </Th>
                          <Th>
                            <a className="link_to_print" href={PATH_PREFIX_FILE + el?.agreement} download
                               target="_blank" rel="noreferrer">
                              <i className="bx bx-printer"/>
                            </a>
                          </Th>
                          <Th className="table_body " style={{width: "80px"}}>
                            {
                              el?.status === 0 ? <div className="func_buttons">
                                <Tooltip title={t('confirm')}>
                                  <span onClick={() => agreementHandle(el?.id, "accept", el)}><i
                                    className="bx bx-check font-size-24"></i></span>
                                </Tooltip>
                                <Tooltip title={t('reject')}>
                                  <span onClick={() => agreementHandle(el?.id, 'reject', el)}><i
                                    className="bx bx-x font-size-18 mr-3 text-danger"></i></span>
                                </Tooltip>
                              </div> :  el?.status === 1 ? <Tooltip title={t('confirmed')}>
                                <span><i className="bx bx-check font-size-24"></i></span>
                              </Tooltip> : el?.status === 2 ? <Tooltip title={t('rejected')}>
                                <span><i className="bx bx-x font-size-24"></i></span>
                              </Tooltip> :  el?.status === 2 ? <Tooltip title={t('confirmed_archive')}>
                                <span><i className="bx bx-archive font-size-24"></i></span>
                              </Tooltip> : ""
                            }
                          </Th>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
            }
            {autodromes.data?.length > 0 && (
              <div className="table_bottom_tools_custom">
                <div className="show_responsive">
                </div>
                <div className="px-0 pagination_responsive">
                  <PaginationComponent
                    totalItems={autodromes.total}
                    pageSize={10}
                    onSelect={handleSelected}
                    defaultActivePage={selected_count}
                  />
                </div>

              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  )
};

export default Autodrome;
