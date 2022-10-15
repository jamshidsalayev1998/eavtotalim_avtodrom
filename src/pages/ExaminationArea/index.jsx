import React, { useState, useEffect } from "react";
import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { withTranslation, useTranslation } from "react-i18next";
import {
  PATH_PREFIX
} from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Modal, Button, Switch } from "antd";
import Swal from "sweetalert2";
import PaginationComponent from "react-reactstrap-pagination";

const ExaminationAreaIndex = props => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [get_again, set_get_again] = useState(false);

  const [show_count, setshow_count] = useState("10");
  const [page, setpage] = useState("1");
  const [total, settotal] = useState("1");
  const handleSelected = selectedPage => {
    setpage(selectedPage);
    set_get_again(!get_again);
  };

  //add modal variables
  const [isAddModalVisible, setisAddModalVisible] = useState(false);
  const [add_name, set_add_name] = useState("");
  const [add_short_name, set_add_short_name] = useState("");
  const [add_region_id, set_add_region_id] = useState("");
  const [add_area_id, set_add_area_id] = useState("");
  const [add_address, set_add_address] = useState("");
  const [add_destination, set_add_destination] = useState("");
  const [add_work_days, set_add_work_days] = useState("");
  const [add_work_start_end_time, set_add_work_start_end_time] = useState("");
  const [add_phone, set_add_phone] = useState("");
  const [add_status, set_add_status] = useState(true);
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const showAddModal = () => {
    setisAddModalVisible(true);
  };
  const hideAddModal = () => {
    empty_all_fields();
    setisAddModalVisible(false);
  };
  const cancelAddModal = () => {
    setisAddModalVisible(false);
  };

  //edit modal variables
  const [isEditModalVisible, setisEditModalVisible] = useState(false);
  const [edit_name, set_edit_name] = useState("");
  const [edit_short_name, set_edit_short_name] = useState("");
  const [edit_region_id, set_edit_region_id] = useState("");
  const [edit_area_id, set_edit_area_id] = useState("");
  const [edit_address, set_edit_address] = useState("");
  const [edit_destination, set_edit_destination] = useState("");
  const [edit_work_days, set_edit_work_days] = useState("");
  const [edit_work_start_end_time, set_edit_work_start_end_time] = useState("");
  const [edit_phone, set_edit_phone] = useState("");
  const [edit_status, set_edit_status] = useState(true);
  const [edit_regions, setEditRegions] = useState([]);
  const [edit_areas, setEditAreas] = useState([]);
  const [edit_examination_area_id, set_edit_examination_area_id] = useState('');
  const showEditModal = () => {
    setisEditModalVisible(true);
  };
  const hideEditModal = () => {
    empty_all_edit_fields();
    setisEditModalVisible(false);
  };
  const cancelEditModal = () => {
    empty_all_edit_fields();
    setisEditModalVisible(false);
  };

  // sort with values by database
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/index-examination-areas",
      method: "GET",
      params: {
        token,
        show_count,
        page
      },
    }).then(res => {
      setData(res?.data?.data?.data);
      setRegions(res?.data?.regions);
      settotal(res?.data?.data?.total);
      setpage(res?.data?.data?.current_page);
      setIsLoading(false);
    });
  }, [get_again,show_count,page]);

  const empty_all_fields = () => {
    set_add_name("");
    set_add_short_name("");
    set_add_region_id("");
    set_add_area_id("");
    set_add_address("");
    set_add_destination("");
    set_add_work_days("");
    set_add_work_start_end_time("");
    set_add_phone("");
    set_add_status(true);
  };
  const empty_all_edit_fields = () => {
    set_edit_name("");
    set_edit_short_name("");
    set_edit_region_id("");
    set_edit_area_id("");
    set_edit_address("");
    set_edit_destination("");
    set_edit_work_days("");
    set_edit_work_start_end_time("");
    set_edit_phone("");
    set_edit_status(true);
    set_edit_examination_area_id('')
  };

  const change_region = region_id => {
    const token = localStorage.getItem("token");
    set_add_region_id(region_id);
    set_add_area_id("");
    axios({
      url: PATH_PREFIX + "/get-areas-online",
      method: "GET",
      params: {
        token,
        region_id,
      },
    }).then(res => {
      setAreas(res?.data?.areas);
    });
  };

  const store_examination_area = () => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("name", add_name ? add_name : "");
    form_data.append("short_name", add_short_name ? add_short_name : "");
    form_data.append("region_id", add_region_id ? add_region_id : "");
    form_data.append("area_id", add_area_id ? add_area_id : "");
    form_data.append("address", add_address ? add_address : "");
    form_data.append("destination", add_destination ? add_destination : "");
    form_data.append("work_days", add_work_days ? add_work_days : "");
    form_data.append(
      "work_start_end_time",
      add_work_start_end_time ? add_work_start_end_time : ""
    );
    form_data.append("phone", add_phone ? add_phone : "");
    form_data.append("status", add_status ? "1" : "0");
    axios({
      url: PATH_PREFIX + "/store-examination-area",
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
          empty_all_fields();
          hideAddModal();
          set_get_again(!get_again);
        });
      }
    });
  };
  const edit_examination_area = examination_area_id => {
    if (examination_area_id != "") {
      const token = localStorage.getItem("token");
      axios({
        url: PATH_PREFIX + "/edit-examination-area",
        method: "GET",
        params: {
          token,
          examination_area_id,
        },
      }).then(res => {
        if (res?.data?.status == "1") {
          set_edit_name(res?.data?.data?.name);
          set_edit_short_name(res?.data?.data?.short_name);
          set_edit_region_id(res?.data?.data?.region_id);
          set_edit_area_id(res?.data?.data?.area_id);
          set_edit_address(res?.data?.data?.address);
          set_edit_destination(res?.data?.data?.destination);
          set_edit_work_days(res?.data?.data?.work_days);
          set_edit_work_start_end_time(res?.data?.data?.work_start_end_time);
          set_edit_phone(res?.data?.data?.phone);
          set_edit_status(res?.data?.data?.status);
          setEditRegions(res?.data?.regions);
          setEditAreas(res?.data?.areas);
          set_edit_examination_area_id(examination_area_id);
          showEditModal();
        }
      });
    }
  };
  const update_examination_area = () => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("examination_area_id", edit_examination_area_id ? edit_examination_area_id : "");
    form_data.append("name", edit_name ? edit_name : "");
    form_data.append("short_name", edit_short_name ? edit_short_name : "");
    form_data.append("region_id", edit_region_id ? edit_region_id : "");
    form_data.append("area_id", edit_area_id ? edit_area_id : "");
    form_data.append("address", edit_address ? edit_address : "");
    form_data.append("destination", edit_destination ? edit_destination : "");
    form_data.append("work_days", edit_work_days ? edit_work_days : "");
    form_data.append(
      "work_start_end_time",
      edit_work_start_end_time ? edit_work_start_end_time : ""
    );
    form_data.append("phone", edit_phone ? edit_phone : "");
    form_data.append("status", edit_status ? "1" : "0");
    axios({
      url: PATH_PREFIX + "/update-examination-area",
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
          empty_all_edit_fields();
          hideEditModal();
          set_get_again(!get_again);
        });
      }
    });
  };
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Modal
            visible={isAddModalVisible}
            title="Title"
            zIndex={1005}
            width={1000}
            // onOk={}
            onCancel={cancelAddModal}
            footer={[
              <Button key="back" onClick={cancelAddModal}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                // loading={loading}
                onClick={store_examination_area}
              >
                Submit
              </Button>,
            ]}
          >
            <Row>
              <Col xl={8}>
                <div className="form-group">
                  <label htmlFor="">Nomi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_name}
                    onChange={e => set_add_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={4}>
                <div className="form-group">
                  <label htmlFor="">Qisqacha nomi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_short_name}
                    onChange={e => set_add_short_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Viloyat</label>
                  <select
                    name=""
                    className="form-control"
                    onChange={e => change_region(e?.target?.value)}
                    id=""
                  >
                    <option
                      selected={add_region_id == "" ? true : false}
                      value=""
                    >
                      Viloyat
                    </option>
                    {regions?.map((element, index) => {
                      return (
                        <option key={index} value={element?.id}>{element?.name}</option>
                      );
                    })}
                  </select>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Tuman</label>
                  <select
                    name=""
                    className="form-control"
                    id=""
                    onChange={e => set_add_area_id(e?.target?.value)}
                  >
                    <option
                      selected={add_area_id == "" ? true : false}
                      value=""
                    >
                      Tuman
                    </option>
                    {areas?.map((element, index) => {
                      return (
                        <option
                        key={index}
                          selected={add_area_id == element?.id ? true : false}
                          value={element?.id}
                        >
                          {element?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Manzil</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_address}
                    onChange={e => set_add_address(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Mo'ljal</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_destination}
                    onChange={e => set_add_destination(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Ish kunlari</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_work_days}
                    onChange={e => set_add_work_days(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Ish vaqti</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_work_start_end_time}
                    onChange={e =>
                      set_add_work_start_end_time(e?.target?.value)
                    }
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Telefon</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_phone}
                    onChange={e => set_add_phone(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Status</label>
                  <div>
                    <Switch defaultChecked onChange={e => set_add_status(e)} />
                  </div>
                </div>
              </Col>
            </Row>
          </Modal>
          <Modal
            visible={isEditModalVisible}
            title="Edit modal"
            zIndex={1005}
            width={1000}
            // onOk={}
            onCancel={cancelEditModal}
            footer={[
              <Button key="back" onClick={cancelEditModal}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                // loading={loading}
                onClick={update_examination_area}
              >
                Submit
              </Button>,
            ]}
          >
            <Row>
              <Col xl={8}>
                <div className="form-group">
                  <label htmlFor="">Nomi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_name}
                    onChange={e => set_edit_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={4}>
                <div className="form-group">
                  <label htmlFor="">Qisqacha nomi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_short_name}
                    onChange={e => set_edit_short_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Viloyat</label>
                  <select
                    name=""
                    className="form-control"
                    onChange={e => change_region(e?.target?.value)}
                    id=""
                  >
                    <option
                      selected={edit_region_id == "" ? true : false}
                      value=""
                    >
                      Viloyat
                    </option>
                    {edit_regions?.map((element, index) => {
                      return (
                        <option
                        key={index}
                          selected={
                            edit_region_id == element?.id ? true : false
                          }
                          value={element?.id}
                        >
                          {element?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Tuman</label>
                  <select
                    name=""
                    className="form-control"
                    id=""
                    onChange={e => set_edit_area_id(e?.target?.value)}
                  >
                    <option
                      selected={edit_area_id == "" ? true : false}
                      value=""
                    >
                      Tuman
                    </option>
                    {edit_areas?.map((element, index) => {
                      return (
                        <option
                          key={index}
                          selected={edit_area_id == element?.id ? true : false}
                          value={element?.id}
                        >
                          {element?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Manzil</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_address}
                    onChange={e => set_edit_address(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Mo'ljal</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_destination}
                    onChange={e => set_edit_destination(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Ish kunlari</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_work_days}
                    onChange={e => set_edit_work_days(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Ish vaqti</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_work_start_end_time}
                    onChange={e =>
                      set_edit_work_start_end_time(e?.target?.value)
                    }
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Telefon</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_phone}
                    onChange={e => set_edit_phone(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="">Status</label>
                  <div>
                    <Switch
                      checked={edit_status ? true : false}
                      onChange={e => set_edit_status(e)}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Modal>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5 className="text-dark">Imtihon oluvchi subyektlar</h5>
                <button
                  className="btn btn-outline-success"
                  onClick={showAddModal}
                >
                  {" "}
                  <i className="fa fa-plus"></i> Qo'shish
                </button>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                {isLoading && <DataLoader />}
                {!isLoading && (
                  <Table
                    id="tech-companies-1"
                    className="table table-striped table-bordered"
                  >
                    <Thead className="font-size-14">
                      <Tr>
                        <Th data-priority="3">№</Th>
                        <Th data-priority="3">Nomi</Th>
                        <Th data-priority="3">Manzil va mo'ljal</Th>
                        <Th data-priority="3">Holati</Th>
                        <Th data-priority="3">Amallar</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.map((element, index) => {
                        return (
                          <Tr key={index}>
                            <Td>{show_count == "all"
                                  ? index + 1
                                  : show_count * (page - 1) + index + 1}</Td>
                            <Td>{element?.name}</Td>
                            <Td>
                              {element?.address + " / " + element?.destination}
                            </Td>
                            <Td>
                              <Badge
                                color={
                                  element?.status == 1 ? "success" : "warning"
                                }
                                className="py-1 px-2 badge badge-pill"
                              >
                                {element?.status == "1" && "faol"}
                                {element?.status == "0" && "faol emas"}
                              </Badge>
                            </Td>
                            <Td>
                              <div className="func_buttons">
                                <span
                                  onClick={e =>
                                    edit_examination_area(element?.id)
                                  }
                                >
                                  <i className="bx bx-edit font-size-20 text-muted"></i>
                                </span>
                              </div>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                )}
                {data?.length && (
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
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(ExaminationAreaIndex);
