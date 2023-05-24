import React, { useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import axios from "axios";
import { useHistory, useRouteMatch } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { PATH_PREFIX } from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import {
  Table,
  Row,
  Input,
  Col,
  Select,
  Form,
  Popconfirm,
  message,
} from "antd";
import Swal from "sweetalert2";

const GroupPaymentConfirmedShow = ({}) => {
  let match = useRouteMatch("/cashier/groups-payments/confirmed/:id");
  const [payment_form] = Form.useForm();
  const { Option } = Select;
  const history = useHistory();
  const { t } = useTranslation();
  const [get_again, set_get_again] = useState(false);
  const [element_id, set_element_id] = useState(match?.params?.id);
  // const [data, setData] = useState("");
  const [group, setGroup] = useState("");
  const [students, setStudents] = useState([]);
  const [selected_students, setSelectedStudents] = useState([]);
  const [filters, setFilters] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [selected_keys, set_selected_keys] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/cashier/show-group/" + element_id,
      method: "GET",
      params: {
        token,
        payment_status: 1,
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        let a = [];
        setGroup(res?.data?.group);
        setIsLoading(false);
        res?.data?.data?.map((item, index) => {
          a.push(item?.id);
        });
        set_selected_keys(a);
        setSelectedStudents(a);
        setStudents(res?.data?.data);
        setFilters(res?.data?.filters);
        payment_form.setFieldsValue(res?.data?.group?.payment);
      }
    });
  }, [get_again]);
  const columns = [
    {
      title: "F.I.O",
      render: (index, element, counter) => (
        <>
          {element?.student?.last_name} {element?.student?.first_name}{" "}
          {element?.student?.middle_name}
        </>
      ),
    },
    {
      title: "Pasport",
      render: (index, element, counter) => (
        <>
          {element?.student?.passport_seria} {element?.student?.passport_number}
        </>
      ),
    },
    {
      title: "Telefon",
      render: (index, element, counter) => <>{element?.student?.phone1}</>,
    },
  ];
  const data = students;
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const cancel_payment = () => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("group_id", match?.params?.id);
    axios({
      url: PATH_PREFIX + "/cashier/cancel-group-payment",
      method: "POST",
      params: {
        token,
      },
      data: form_data,
    }).then(res => {
      if (res?.data?.status == 1) {
        message.success(res?.data?.message);
        history.push("/cashier/groups-payments");
      } else if (res?.data?.status == 0) {
        message.error(res?.data?.message);
      }
    });
  };
  const onFinish = value => {};

  const onFinishFailed = value => {
    // alert('failed')
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <div className="top_links_page_title">
                  <span className="mr-3" onClick={() => history.goBack()}>
                    <i className="bx bx-arrow-back"> </i>
                  </span>
                  <h5 className="text-dark">
                    <b>
                      "
                      {group?.type == "first"
                        ? group?.group?.name_uz
                        : group?.name}
                      "
                    </b>{" "}
                    guruhing to'lovi (<b>{group?.organization?.name_uz}</b>)
                  </h5>
                </div>
                <div>
                  <span className="ml-2 mr-2">
                    <b>{selected_keys?.length}</b> ta o'quvchi
                  </span>
                  <Popconfirm
                    title={"To`lovni bekor qilasizmi ?"}
                    placement={"bottom"}
                    onConfirm={cancel_payment}
                  >
                    <button
                      disabled={selected_keys?.length > 0 ? false : true}
                      className="btn btn-warning"
                    >
                      {" "}
                      <i className="fa fa-exclamation"></i> To'lovni bekor
                      qilish
                    </button>
                  </Popconfirm>
                </div>
              </div>
              <Row>
                <Form
                  form={payment_form}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className="d-flex w-100"
                >
                  <Col xl={6}>
                    <Form.Item
                      name="amount"
                      className="w-100"
                      rules={[{ required: true, message: "Summani kiriting!" }]}
                    >
                      <Input
                        disabled={true}
                        className="w-100"
                        placeholder={
                          "Guruh uchun qabul qilingan umumiy summani kiriting"
                        }
                        type={"number"}
                        allowClear={true}
                      />
                    </Form.Item>
                  </Col>
                  <Col xl={6}>
                    <Form.Item
                      name="examination_area_payment_type_id"
                      rules={[
                        {
                          required: true,
                          message: "To`lov toifasini tanlang!",
                        },
                      ]}
                    >
                      <Select
                        disabled={true}
                        showSearch
                        placeholder={"To`lov toifasini tanlang"}
                        optionFilterProp="children"
                        className="w-100"
                      >
                        {filters?.examination_area_payment_types?.map(
                          (element, index) => {
                            return (
                              <Option key={index} value={element?.id}>
                                {element?.name}
                              </Option>
                            );
                          }
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xl={6}>
                    <Form.Item
                      name="payment_type_id"
                      rules={[
                        { required: true, message: "To`lov turini tanlang!" },
                      ]}
                    >
                      <Select
                        disabled={true}
                        showSearch
                        placeholder={"To`lov turini tanlang"}
                        optionFilterProp="children"
                        className="w-100"
                      >
                        {filters?.pay_types?.map((element, index) => {
                          return (
                            <Option key={index} value={element?.id}>
                              {element?.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Form>
              </Row>
              <div className="crypto-buy-sell-nav mt-3">
                {isLoading && <DataLoader />}
                {!isLoading && (
                  <>
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                      rowKey="id"
                    />
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(GroupPaymentConfirmedShow);
