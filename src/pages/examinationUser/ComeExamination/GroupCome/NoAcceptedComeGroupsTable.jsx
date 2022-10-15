import React, { useState, useEffect } from "react";
import { Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import { Select, Modal, Button, TimePicker,Input } from "antd";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import PaginationComponent from "react-reactstrap-pagination";
import moment from "moment";
import Swal from "sweetalert2";

const NoAcceptedComeGroupsTable = () => {
  const { Option } = Select;
  const { t } = useTranslation();
  const [show_count, setshow_count] = useState("10");
  const [page, setpage] = useState("1");
  const [total, settotal] = useState("1");
  const [word, setword] = useState(localStorage.getItem(window.location.pathname+'-no-accepted-default-search-word'));
  const [organizations, set_organizations] = useState([]);
  const [organization_id, set_organization_id] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const handleSelected = selectedPage => {
    setpage(selectedPage);
    set_get_again(!get_again);
  };

  const [selected_element_id, set_selected_element_id] = useState("");
  const [come_group_name, set_come_group_name] = useState("");
  const [come_organization_name, set_come_organization_name] = useState("");
  const [come_date, set_come_date] = useState("");
  const [come_start_time, set_come_start_time] = useState("");
  const [come_end_time, set_come_end_time] = useState("");

  const [get_again, set_get_again] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true)
    axios({
      url: PATH_PREFIX + "/come-examination/come-groups-index",
      method: "GET",
      params: {
        show_count,
        page,
        word,
        organization_id,
        token,
        status: "0",
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        setIsLoading(false)
        setData(res?.data?.data?.data);
        settotal(res?.data?.data?.total);
        set_organizations(res?.data?.filters?.organizations);
      }
    });
  }, [get_again, show_count, page, organization_id,word]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (group_name, element_id, organization_name) => {
    set_selected_element_id(element_id);
    set_come_group_name(group_name);
    set_come_organization_name(organization_name);
  setIsModalVisible(true);
  };

  const handleOk = () => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Tasdiqlaysizmi?",
      text: "Guruhga yakuniy imtihon uchun belgilangan vaqtni tasdiqlaysizmi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tasdiqlash!",
      cancelButtonText: "Bekor qilish",
    }).then(result => {
      if (result.isConfirmed) {
        const form_data = new FormData();
        form_data.append("access_start_date", come_date ? come_date : "");
        form_data.append(
          "access_start_time",
          come_start_time ? come_start_time : ""
        );
        form_data.append("access_end_time", come_end_time ? come_end_time : "");
        form_data.append(
          "element_id",
          selected_element_id ? selected_element_id : ""
        );
        if (selected_element_id != "") {
          axios({
            url: PATH_PREFIX + "/come-examination/come-group-accept",
            method: "POST",
            params: {
              token,
            },
            data: form_data,
          }).then(res => {
            if (res?.data?.status == 1) {
              Swal.fire({
                icon: "success",
                title: res?.data?.message,
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                handleCancel();
                set_get_again(!get_again);
              });
            }
          });
        }
      }
    });
  };

  const handleCancel = () => {
    set_come_date("");
    set_come_start_time("");
    set_come_end_time("");
    setIsModalVisible(false);
    set_selected_element_id("");
  };

  const change_word = (word) => {
    setword(word);
    localStorage.setItem(window.location.pathname+'-no-accepted-default-search-word' , word);
  }



  return (
    <>
        <Modal
        title="Guruhga kelish vaqtini tasdiqlash"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        zIndex={1005}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Bekor qilish
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Tasdiqlash
          </Button>,
        ]}
      >
        <Row>
          <Col xl={12}>
            <div
              className="form-group"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <label htmlFor="">Guruh</label>
                <p>
                  <b>{come_group_name}</b>
                </p>
              </div>
              <div>
                <label htmlFor="">Tashkilot</label>
                <p>
                  <b>{come_organization_name}</b>
                </p>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">Kelish sanasi</label>
              <input
                type="date"
                className="form-control"
                value={come_date}
                onChange={e => set_come_date(e?.target?.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Kelish vaqti (dan)</label>
              <TimePicker
                style={{ width: "100%" }}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                value={come_start_time}
                onChange={e => set_come_start_time(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Kelish vaqti (gacha)</label>
              <TimePicker
                style={{ width: "100%" }}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                value={come_end_time}
                onChange={e => set_come_end_time(e)}
              />
            </div>
          </Col>
        </Row>
      </Modal>
          <Row style={{ justifyContent: "space-between" }}>
            <Col xl={4}>
              <label htmlFor="">Tashkilot</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a person"
                optionFilterProp="children"
                value={organization_id}
                onChange={e => {set_organization_id(e); setpage(1)}}
                defaultValue="all"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="all">Barchasi</Option>
                {organizations?.map((element, index) => {
                  return (
                    <Option value={element?.id} key={index}>
                      {element?.name_uz}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col xl={2}>
              <label htmlFor="">Qidirish</label>
              <Input allowClear style={{ width: '100%' }} defaultValue={word} onChange={(e) => {change_word(e?.target?.value); setpage(1)}} />
            </Col>
          </Row>
          {isLoading && <DataLoader />}
          {!isLoading && (
          <Row>
            <Table
              id="tech-companies-1"
              className="table table-striped table-bordered mt-2"
            >
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Guruh nomi</Th>
                  <Th>Tashkilot</Th>
                  <Th>O'quvchilar soni</Th>
                  <Th>Holati</Th>
                  <Th>Tasdiqlash</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((element, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <NavLink
                          to={`/come-examination/come-groups/${element?.id}`}
                          
                        >
                          {" "}
                          {element?.group?.name_uz}{" "}
                        </NavLink>{" "}
                      </Td>
                      <Td>{element?.group?.organization?.name_uz}</Td>
                      <Td>{element?.final_access_students_count}</Td>
                      <Td style={{ width: "1px" }}>
                        <Badge
                          color={element?.status == 1 ? "success" : "warning"}
                          className="py-1 px-2 badge badge-pill"
                        >
                          {element?.status == "1" && "Tasdiqlangan"}
                          {element?.status == "0" && "Tasdiqlanmagan"}
                        </Badge>
                      </Td>
                      <Td
                        style={{ width: "1px" }}
                        onClick={() =>
                          showModal(
                            element?.group?.name_uz,
                            element?.id,
                            element?.group?.organization?.name_uz
                          )
                        }
                      >
                        <button
                          className="btn btn-light"
                          style={{ color: "#34C38F" }}
                        >
                          {" "}
                          <i className="fa fa-check"></i>{" "}
                        </button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Row>
      )}
      {data?.length > 0 && (
        <Row>
          <Col xl={3}>
            <div className=" d-flex justify-content-between align-items-center font-weight-bold">
              <span>{t("Show")}</span>
              <select
                className="custom-select mx-2"
                value={show_count}
                onChange={e => {setshow_count(e.target.value); setpage(1);}}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value={total}>{t("All")}</option>
              </select>
              <span>{t("Entries")}</span>
            </div>
          </Col>
          <Col xl={9} className="d-flex justify-content-end">
            <PaginationComponent
              totalItems={total}
              pageSize={show_count}
              onSelect={handleSelected}
              // maxPaginationNumbers={Math.ceil(total / show_count)}
              defaultActivePage={1}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default withTranslation()(NoAcceptedComeGroupsTable);
