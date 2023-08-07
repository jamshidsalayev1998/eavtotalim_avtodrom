import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { DataLoader } from "pages/Loaders/Loaders";
import { Select, Input, Modal, Form, message, Button } from "antd";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import PaginationComponent from "react-reactstrap-pagination";
import useDebounce from "../../../../components/CustomHooks/useDebounce";
import "./style.css";
import { getExaminationPaymentType } from "../../../../services/api_services/examination_payment_types";
import { getStudentsForCashier } from "../../../../services/api_services/cashier_helper_api";
import { PATH_PREFIX } from "Utils/AppVariables";

const StudentPracticalPaymentNotConfirmedsIndex = ({ firstTabLoading }) => {
  const { Option } = Select;
  const [confirm_form] = Form.useForm();
  const { t } = useTranslation();
  const [get_again, set_get_again] = useState(false);
  const [show_count, setshow_count] = useState("10");
  const [page, setpage] = useState("1");
  const [total, settotal] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState();
  const [examinationAreaPaymentTypes, setExaminationAreaPaymentTypes] =
    useState([]);
  const [selected, setSelected] = useState();

  const [word, setword] = useState(
    localStorage.getItem(
      window.location.pathname + "-not-confirmed-default-search-word"
    )
  );
  const [organization_id, set_selected_organization_id] = useState(
    localStorage.getItem(
      window.location.pathname + "-not-confirmed-default-organization-id"
    )
      ? localStorage.getItem(
          window.location.pathname + "-not-confirmed-default-organization-id"
        )
      : "all"
  );
  const [group_id, set_selected_group_id] = useState(
    localStorage.getItem(
      window.location.pathname + "-not-confirmed-default-group-id"
    )
      ? localStorage.getItem(
          window.location.pathname + "-not-confirmed-default-group-id"
        )
      : "all"
  );
  const [filters, set_filters] = useState([]);
  const [groups, set_groups] = useState([]);
  const [data, setData] = useState([]);
  const handleSelected = (selectedPage, get_again_type = false) => {
    setpage(selectedPage);
    if (get_again_type) {
      set_get_again(!get_again);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const waitWord = useDebounce(word, 1000);

  useEffect(() => {
    // alert('sdsd')
    const token = localStorage.getItem("token");
    setIsLoading(true);
    let filters = [
      {
        fieldKey: "practical_payment_status",
        value: "0",
      },
      {
        fieldKey: "exam_result",
        value: "1",
      },
    ];
    let params = {
      token,
      show_count,
      page,
      organization_id,
      group_id,
      word,
      filters: JSON.stringify(filters),
      groupBy: "student_passport",
    };
    axios({
      url: PATH_PREFIX + "/cashier/student-payments",
      method: "GET",
      params: params,
    }).then(res => {
      if (res?.data?.status == "1") {
        setIsLoading(false);
        setData(res?.data?.data?.data);
        set_filters(res?.data?.filters);
        set_groups(res?.data?.filters?.groups);
        settotal(res?.data?.data?.total);
        setPaymentTypes(res?.data?.payment_types);
      }
    });
    (async () => {
      let additionalParams = {
        exam_type: "practical",
      };
      const response = await getExaminationPaymentType(additionalParams);
      if (response?.data?.status == 1) {
        setExaminationAreaPaymentTypes(response?.data?.data);
      }
    })();
  }, [
    get_again,
    show_count,
    organization_id,
    waitWord,
    group_id,
    firstTabLoading,
  ]);

  const change_word = word => {
    setword(word);
    localStorage.setItem(
      window.location.pathname + "-not-confirmed-default-search-word",
      word
    );
  };

  const change_organization_id = element_id => {
    set_selected_group_id("all");
    localStorage.setItem(
      window.location.pathname + "-not-confirmed-default-group-id",
      "all"
    );
    set_groups([]);
    set_selected_organization_id(element_id);
    localStorage.setItem(
      window.location.pathname + "-not-confirmed-default-organization-id",
      element_id
    );
  };

  const confirm_payment = element => {
    setSelected(element);
    setIsModalVisible(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    confirm_form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelected(null);
  };
  const onFinish = values => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    for (const valuesKey in values) {
      form_data.append(valuesKey, values[valuesKey] ? values[valuesKey] : "");
    }
    form_data.append("final_access_student_id", selected?.id);
    if (selected?.id) {
      setIsLoading(true);
      axios({
        url: PATH_PREFIX + "/cashier/student-payment-confirm",
        method: "POST",
        params: {
          token,
        },
        data: form_data,
      }).then(res => {
        if (res?.data?.status == 1) {
          message.success(res?.data?.message);
          handleCancel();
          set_get_again(!get_again);

          // setGeneralReload(!generalReload)
        } else if (res?.data?.status == 0) {
          message.error(res?.data?.message);
          setIsLoading(false);
        }
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title={"To`lovni tasdiqlash"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        zIndex={1005}
        okText={"Saqlash"}
        cancelText={"Bekor qilish"}
        footer={[
          <Button key={"back"} onClick={handleCancel}>
            Bekor qilish
          </Button>,
          <Button
            key={"submit"}
            type="primary"
            loading={isLoading}
            onClick={handleOk}
          >
            Saqlash
          </Button>,
        ]}
      >
        <Row>
          <Col xl={12} className="text-center d-flex justify-content-center">
            <b style={{ fontSize: "20px" }}>{selected?.student_fio}</b>
          </Col>
          <Col xl={12} className="text-center d-flex justify-content-center">
            <b>{selected?.student_passport}</b>
          </Col>
          <Col xl={12} className="text-center d-flex justify-content-center">
            <b>
              {selected?.final_access_group?.type == "first"
                ? selected?.final_access_group?.group?.name_uz
                : selected?.final_access_group?.name}{" "}
              ({selected?.organization?.name_uz})
            </b>
          </Col>
        </Row>
        <Form
          form={confirm_form}
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="To`lov toifasi"
            name="examination_area_payment_type_id"
            rules={[
              {
                required: true,
                message: "To`lov toifasini tanlang!",
              },
            ]}
            initialValue={
              examinationAreaPaymentTypes.length > 0
                ? examinationAreaPaymentTypes[0]?.id
                : ""
            }
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="To`lov toifasi"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {examinationAreaPaymentTypes?.map((element, index) => {
                return (
                  <Option value={element?.id} key={index}>
                    {element?.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="To`lov turi"
            name="pay_type_id"
            rules={[
              {
                required: true,
                message: "To`lov turini tanlang!",
              },
            ]}
            initialValue={1}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="To`lov toifasi"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {paymentTypes?.payment_types?.map((element, index) => {
                return (
                  <Option value={element?.id} key={index}>
                    {element?.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Row style={{ justifyContent: "space-between" }}>
        <Col xl={4}>
          <label htmlFor="">Avtomaktab</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Avtomaktab"
            optionFilterProp="children"
            onChange={e => {
              change_organization_id(e);
              setpage(1);
            }}
            defaultValue="all"
            value={organization_id != "all" ? Number(organization_id) : "all"}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="all">Barchasi</Option>
            {filters?.organizations?.map((element, index) => {
              return (
                <Option value={element?.id} key={index}>
                  {element?.name_uz ||
                    element?.name_ru ||
                    element?.name_en ||
                    element?.name_qq ||
                    element?.name_kiril}
                </Option>
              );
            })}
          </Select>
        </Col>

        <Col xl={2}>
          <label htmlFor="">Qidirish</label>
          <Input
            allowClear
            style={{ width: "100%" }}
            defaultValue={word}
            onChange={e => {
              change_word(e?.target?.value);
              handleSelected(1, false);
            }}
          />
        </Col>
      </Row>
      {isLoading && <DataLoader />}
      {!isLoading && (
        <>
          <Table
            id="tech-companies-1"
            className="table table-striped table-bordered mt-3"
          >
            <Thead className="font-size-14">
              <Tr>
                <Th data-priority="3" style={{ width: "1px" }}>
                  №
                </Th>
                <Th data-priority="3">F.I.O</Th>
                <Th data-priority="3" className={"text-center"}>
                  Pasport
                </Th>
                <Th data-priority="3" className={"text-center"}>
                  Kelish sanasi va vaqti
                </Th>
                <Th data-priority="3" className={"last-td text-center"}>
                  Amallar
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((element, index) => {
                return (
                  <Tr
                    key={index}
                    className={"hover-tr-success"}
                    onClick={() => confirm_payment(element)}
                  >
                    <Td className="text-center">
                      {show_count == "all"
                        ? index + 1
                        : show_count * (page - 1) + index + 1}
                    </Td>

                    <Td>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => confirm_payment(element)}
                      >
                        {element?.student_fio}
                      </span>
                    </Td>
                    <Td className={"text-center"}>
                      {element?.student_passport}
                    </Td>

                    <Td className={"text-center"}>
                      {element?.access_start_date} ({element?.access_start_time}
                      )
                    </Td>
                    <Td className={"text-center"}>
                      <button
                        className={"btn btn-outline-success"}
                        onClick={() => confirm_payment(element)}
                      >
                        <i className={"fa fa-check"}></i>
                      </button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </>
      )}
      {data?.length > 0 && (
        <Row>
          <Col xl={3}>
            <div className=" d-flex justify-content-between align-items-center font-weight-bold">
              <span>{t("Show")}</span>
              <select
                className="custom-select mx-2"
                value={show_count}
                onChange={e => {
                  setshow_count(e.target.value);
                  setpage(1);
                }}
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
              onSelect={e => handleSelected(e, true)}
              // maxPaginationNumbers={Math.ceil(total / show_count)}
              defaultActivePage={1}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default withTranslation()(StudentPracticalPaymentNotConfirmedsIndex);
