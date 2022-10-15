import React, { useState, useEffect } from "react";
import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { withTranslation, useTranslation } from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Modal, Button, Switch, Select } from "antd";
import Swal from "sweetalert2";
import PaginationComponent from "react-reactstrap-pagination";

const DirectorExaminationAreaIndex = props => {
  const { Option } = Select;
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
  const [add_first_name, set_add_first_name] = useState("");
  const [add_last_name, set_add_last_name] = useState("");
  const [add_middle_name, set_add_middle_name] = useState("");
  const [add_phone, set_add_phone] = useState("");
  const [add_status, set_add_status] = useState(true);
  const [add_examination_areas, set_add_examination_areas] = useState([]);
  const [add_examination_area_id, set_add_examination_area_id] = useState("");
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
  const [edit_first_name, set_edit_first_name] = useState("");
  const [edit_last_name, set_edit_last_name] = useState("");
  const [edit_middle_name, set_edit_middle_name] = useState("");
  const [edit_phone, set_edit_phone] = useState("");
  const [edit_status, set_edit_status] = useState(true);
  const [edit_examination_areas, set_edit_examination_areas] = useState([]);
  const [edit_examination_area_id, set_edit_examination_area_id] = useState("");
  const [
    edit_director_examination_area_id,
    set_edit_director_examination_area_id,
  ] = useState("");
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

  //show modal variables
  const [isShowModalVisible, setisShowModalVisible] = useState(false);
  const [show_first_name, set_show_first_name] = useState("");
  const [show_last_name, set_show_last_name] = useState("");
  const [show_middle_name, set_show_middle_name] = useState("");
  const [show_phone, set_show_phone] = useState("");
  const [show_examination_area_name, set_show_examination_area_name] = useState(
    ""
  );
  const [show_status, set_show_status] = useState(true);
  const [show_password , set_show_password] = useState('');
  const [show_username , set_show_username] = useState('');
  const [show_user_id , set_show_user_id] = useState('');
  const showShowModal = selected_id => {
    const ttt = data.filter(e => e.id == selected_id);
    if (ttt.length > 0) {
      set_show_first_name(ttt[0]?.first_name);
      set_show_last_name(ttt[0]?.last_name);
      set_show_middle_name(ttt[0]?.middle_name);
      set_show_phone(ttt[0]?.phone);
      set_show_status(ttt[0]?.status);
      set_show_examination_area_name(ttt[0]?.examination_area?.name);
      set_show_user_id(ttt[0]?.user?.id);
    }

    setisShowModalVisible(true);
  };

  const cancelShowModal = () => {
    empty_all_show_fields()
    setisShowModalVisible(false);
  };

  // sort with values by database
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/index-examination-directors",
      method: "GET",
      params: {
        token,
        show_count,
        page
      },
    }).then(res => {
      setData(res?.data?.data?.data);
      set_add_examination_areas(res?.data?.examination_areas);
      settotal(res?.data?.data?.total);
      setpage(res?.data?.data?.current_page);
      setIsLoading(false);
    });
  }, [get_again,page,show_count]);

  const show_password_function = (id) => {
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("user_id", id);
    axios({
      url: PATH_PREFIX + "/password-show-examination-director",
      method: "POST",
      params: {
        token,
      },
      data: formdata,
    }).then(response => {
      if (response?.status === 200) {
        const data = response?.data;
        set_show_password(response?.data?.password);
        set_show_username(response?.data?.username)
      }
    });
  }

  const empty_all_fields = () => {
    set_add_first_name("");
    set_add_last_name("");
    set_add_middle_name("");
    set_add_phone("");
    set_add_status(true);
    set_add_examination_area_id("");
  };
  const empty_all_edit_fields = () => {
    set_edit_first_name("");
    set_edit_last_name("");
    set_edit_middle_name("");
    set_edit_phone("");
    set_edit_status(true);
    set_edit_examination_area_id("");
    set_edit_director_examination_area_id("");
  };
  const empty_all_show_fields = () => {
    set_show_first_name("");
    set_show_last_name("");
    set_show_middle_name("");
    set_show_phone("");
    set_show_status(true);
    set_show_password('');
    set_show_username('');
    set_show_user_id('');
    set_show_examination_area_name('');
  };

  const store_examination_area = () => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("first_name", add_first_name ? add_first_name : "");
    form_data.append("last_name", add_last_name ? add_last_name : "");
    form_data.append("middle_name", add_middle_name ? add_middle_name : "");
    form_data.append("phone", add_phone ? add_phone : "");
    form_data.append(
      "examination_area_id",
      add_examination_area_id ? add_examination_area_id : ""
    );
    form_data.append("status", add_status ? "1" : "");
    axios({
      url: PATH_PREFIX + "/store-examination-director",
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
  const edit_examination_area = director_examination_area_id => {
    if (director_examination_area_id != "") {
      set_edit_director_examination_area_id(director_examination_area_id);
      const token = localStorage.getItem("token");
      axios({
        url: PATH_PREFIX + "/edit-examination-director",
        method: "GET",
        params: {
          token,
          director_examination_area_id,
        },
      }).then(res => {
        if (res?.data?.status == "1") {
          set_edit_first_name(res?.data?.data?.first_name);
          set_edit_last_name(res?.data?.data?.last_name);
          set_edit_middle_name(res?.data?.data?.middle_name);
          set_edit_phone(res?.data?.data?.phone);
          set_edit_status(res?.data?.data?.status);
          set_edit_examination_areas(res?.data?.examination_areas);
          set_edit_examination_area_id(res?.data?.data?.examination_area_id);
          showEditModal();
        }
      });
    }
  };
  const update_examination_area = () => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("first_name", edit_first_name ? edit_first_name : "");
    form_data.append("last_name", edit_last_name ? edit_last_name : "");
    form_data.append("middle_name", edit_middle_name ? edit_middle_name : "");
    form_data.append("phone", edit_phone ? edit_phone : "");
    form_data.append(
      "examination_area_id",
      edit_examination_area_id ? edit_examination_area_id : ""
    );
    form_data.append(
      "director_examination_area_id",
      edit_director_examination_area_id ? edit_director_examination_area_id : ""
    );
    form_data.append("status", edit_status ? "1" : "0");
    axios({
      url: PATH_PREFIX + "/update-examination-director",
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

  const delete_element = element_id => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append(
      "director_examination_area_id",
      element_id ? element_id : ""
    );
    Swal.fire({
      title: "O`chirasizmi?",
      text: "Ma`lumotni qayta tiklashning imkoni yo`q!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "O`chirish!",
      cancelButtonText: "Bekor qilish!",
    }).then(result => {
      if (result.isConfirmed) {
        axios({
          url: PATH_PREFIX + "/delete-examination-director",
          method: "POST",
          params: {
            token,
          },
          data: form_data,
        }).then(response => {
          if (response?.data?.status == 1) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {});
            set_get_again(!get_again);
          }
          setIsLoading(false);
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
              <Col xl={4}>
                <div className="form-group">
                  <label htmlFor="">Ism</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_first_name}
                    onChange={e => set_add_first_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={4}>
                <div className="form-group">
                  <label htmlFor="">Familiya</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_last_name}
                    onChange={e => set_add_last_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={4}>
                <div className="form-group">
                  <label htmlFor="">Otasining ismi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add_middle_name}
                    onChange={e => set_add_middle_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={4}>
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
              <Col xl={8}>
                <div className="form-group">
                  <label htmlFor="">Subyekt</label>
                  <div>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder=""
                      optionFilterProp="children"
                      onChange={e => set_add_examination_area_id(e)}
                      // onFocus={onFocus}
                      // onBlur={onBlur}
                      // onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {add_examination_areas?.map((element, index) => {
                        return (
                          <Option key={index} value={element?.id}>{element?.name}</Option>
                        );
                      })}
                    </Select>
                  </div>
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
              <Col xl={4}>
                <div className="form-group">
                  <label htmlFor="">Ism</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_first_name}
                    onChange={e => set_edit_first_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={4}>
                <div className="form-group">
                  <label htmlFor="">Familiya</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_last_name}
                    onChange={e => set_edit_last_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={4}>
                <div className="form-group">
                  <label htmlFor="">Otasining ismi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edit_middle_name}
                    onChange={e => set_edit_middle_name(e?.target?.value)}
                  />
                </div>
              </Col>
              <Col xl={4}>
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
              <Col xl={8}>
                <div className="form-group">
                  <label htmlFor="">Subyekt</label>
                  <div>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder=""
                      optionFilterProp="children"
                      onChange={e => set_edit_examination_area_id(e)}
                      // onFocus={onFocus}
                      // onBlur={onBlur}
                      // onSearch={onSearch}
                      defaultValue={edit_examination_area_id}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {edit_examination_areas?.map((element, index) => {
                        return (
                          <Option key={index} value={element?.id}>{element?.name}</Option>
                        );
                      })}
                    </Select>
                  </div>
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
          <Modal
            visible={isShowModalVisible}
            title="Show modal"
            zIndex={1005}
            // onOk={}
            onCancel={cancelShowModal}
            footer={[
              <Button key="back" onClick={cancelShowModal}>
                Cancel
              </Button>,
            ]}
          >
            <Row>
              <Col xl={6}>
                <label htmlFor="">Ism</label>
                <p>{show_first_name}</p>
              </Col>
              <Col xl={6}>
                <label htmlFor="">Familiya</label>
                <p>{show_last_name}</p>
              </Col>
              <Col xl={6}>
                <label htmlFor="">Otasining ismi</label>
                <p>{show_middle_name}</p>
              </Col>
              <Col xl={6}>
                <label htmlFor="">Telefon</label>
                <p>{show_phone}</p>
              </Col>
              <Col xl={6}>
                <label htmlFor="">Subyekt</label>
                <p>{show_examination_area_name}</p>
              </Col>
              <Col xl={6}>
                <label htmlFor="">Holati</label>
                <p>
                  <Badge
                    color={show_status == 1 ? "success" : "warning"}
                    className="py-1 px-2 badge badge-pill"
                  >
                    {show_status == "1" && "faol"}
                    {show_status == "0" && "faol emas"}
                  </Badge>
                </p>
              </Col>
              <Col xl={6}>
                <label htmlFor="">Login parolni ko'rish</label>
                <div>
                  <button className="btn btn-light" onClick={()=>show_password_function(show_user_id)}> <i className="fa fa-eye"></i> </button>
                </div>
              </Col>
              <Col xl={6}>
                <label htmlFor=""></label>
                <div>
                  login:  <span>{show_username}</span> <br />
                  parol: <span>{show_password}</span>
                </div>
              </Col>
            </Row>
          </Modal>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5 className="text-dark">Imtihon oluvchi hudud direktorlari</h5>
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
                        <Th data-priority="3">F.I.O</Th>
                        <Th data-priority="3">Tel</Th>
                        <Th data-priority="3">Subyekt nomi</Th>
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
                            <Td>
                              {element?.last_name +
                                " " +
                                element?.first_name +
                                " " +
                                element?.middle_name}{" "}
                            </Td>
                            <Td>{element?.phone}</Td>
                            <Td>{element?.examination_area?.name}</Td>
                            <Td style={{ width: "1px" }}>
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
                            <Td style={{ width: "1px" }}>
                              <div className="func_buttons">
                                <span
                                  onClick={() => showShowModal(element?.id)}
                                >
                                  <i className="fa fa-eye"></i>
                                </span>
                                <span
                                  onClick={e =>
                                    edit_examination_area(element?.id)
                                  }
                                >
                                  <i className="bx bx-edit font-size-20 text-muted"></i>
                                </span>
                                <span
                                  onClick={() => delete_element(element?.id)}
                                >
                                  <i className="bx bx-trash font-size-22 text-danger"></i>
                                </span>
                              </div>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
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
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(DirectorExaminationAreaIndex);
