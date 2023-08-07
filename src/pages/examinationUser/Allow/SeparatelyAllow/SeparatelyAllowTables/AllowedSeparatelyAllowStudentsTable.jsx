import React, { useState, useEffect } from "react";
import { Badge } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import {
  Select,
  Input,
  Modal,
  Form,
  message,
  Button,
  Table,
  Popconfirm,
  Tooltip,
  Row,
  Col,
} from "antd";
import PaginationComponent from "react-reactstrap-pagination";
import useDebounce from "../../../../../components/CustomHooks/useDebounce";
import QRCode from "qrcode";
import PrintPasswordToCheck from "../PrintPasswordToCheck";
import {
  printToCheckSeparatelyStudentAllow,
  showSeparatelyStudentAllow,
} from "../../../../../services/api_services/separately_student_allow_api";
import { PATH_PREFIX } from "Utils/AppVariables";

const AllowedSeparatelyAllowStudentsTable = ({}) => {
  const { Option } = Select;
  const { t } = useTranslation();
  const [get_again, set_get_again] = useState(false);
  const [show_count, setshow_count] = useState("10");
  const [page, setpage] = useState("1");
  const [total, settotal] = useState("1");
  const [selectedStudent, setSelectedStudent] = useState();
  const [src, setSrc] = useState("");

  function select_student(selected) {
    (async () => {
      const res = await showSeparatelyStudentAllow(selected?.id);
      if (res?.data?.status == 1) {
        // setData(res?.data?.data);
        // setSelectedStudent(res?.data?.data);
        QRCode.toDataURL(selected?.id + "").then(res => {
          setSrc(res);
        });
        const v = await printToCheckSeparatelyStudentAllow(res?.data?.data);
      }
    })();
  }

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
    axios({
      url: PATH_PREFIX + "/come-examination/separately-students-allow",
      method: "GET",
      params: {
        token,
        organization_id,
        group_id,
        show_count,
        page,
        status: "2",
        word,
      },
    }).then(res => {
      setIsLoading(false);
      setData(res?.data?.data?.data);
      set_filters(res?.data?.filters);
      settotal(res?.data?.data?.total);
    });
  }, [get_again, show_count, organization_id, waitWord, group_id]);

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
  const change_group_id = element_id => {
    set_selected_group_id(element_id);
    localStorage.setItem(
      window.location.pathname + "-not-confirmed-default-group-id",
      element_id
    );
  };
  const columns = [
    {
      title: "№",
      render: (text, record, index) => index + 1,
      width: 40,
      align: "center",
    },
    {
      title: "F.I.O",
      render: (index, element) => (
        <>
          {" "}
          <NavLink
            to={{
              pathname: `/come-examination/allow-students/separately/${element?.id}`,
              state: {
                student_fio: element?.student_fio,
              },
            }}
          >
            {" "}
            {element?.student_fio}{" "}
          </NavLink>{" "}
        </>
      ),
    },
    {
      title: "Raqami",
      render: (index, element) => <>{element?.unikal_number}</>,
    },
    {
      title: "Pasport",
      render: (index, element) => <>{element?.student_passport}</>,
    },
    {
      title: "Tashkilot",
      render: (index, element) => (
        <>{JSON.parse(element?.info)?.organization_name}</>
      ),
    },
    {
      title: "Kompyuter",
      render: (index, element) => (
        <>{element?.merged_computer?.computer?.order}</>
      ),
    },
    // {
    //     title: 'Test topshirish holati',
    //     className: ' text-center',
    //     render: (index, element) => <>{element?.type == 'resubmit' ? 'Qayta topshirish' : 'Birinchi marta'}</>
    // },
    {
      title: "Test topshirganlik holati",
      className: "last-td text-center",
      render: (index, element) => (
        <>
          {element?.exam_result == "1" ? (
            <Badge color={"success"}>O'tgan</Badge>
          ) : element?.exam_result == "0" ? (
            <Badge color={"danger"}>Yiqilgan</Badge>
          ) : (
            <Badge color={"warning"}>Topshirmagan</Badge>
          )}
        </>
      ),
    },

    // {
    //     title: 'To`lov holati',
    //     className: 'last-td text-center',
    //     render: (index, element) => <>{element?.payment_status == '1' ? <Badge color={'success'}>To`langan</Badge> :
    //         <Badge color={'danger'}>To`lanmagan</Badge>}</>
    // },
    {
      title: "Chek ga chop etish",
      className: " text-center",
      render: (index, element) => (
        <>
          <i
            style={{ cursor: "pointer" }}
            onClick={e => select_student(element)}
            className={"fa fa-print"}
          ></i>
        </>
      ),
    },
  ];
  const allow_student = student_id => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("final_access_student_id", student_id);
    if (student_id) {
      axios({
        url:
          PATH_PREFIX +
          "/go-examination/allow-separately-student-to-final-exam",
        method: "POST",
        params: { token },
        data: form_data,
      }).then(res => {
        if (res?.data?.status == 1) {
          message.success(res?.data?.message);
          set_get_again(!get_again);
        }
        if (res?.data?.status == 0) {
          message.error(res?.data?.message);
        }
      });
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-between mb-3">
        <Col xl={12}>
          <Row gutter={[16, 16]}>
            <Col xl={12}>
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
                value={
                  organization_id != "all" ? Number(organization_id) : "all"
                }
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
            <Col xl={12}>
              <label htmlFor="">Guruh</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Guruh"
                optionFilterProp="children"
                onChange={e => {
                  change_group_id(e);
                  setpage(1);
                }}
                defaultValue="all"
                value={group_id != "all" ? Number(group_id) : "all"}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="all">Barchasi</Option>
                {filters?.groups?.map((element, index) => {
                  return (
                    <Option value={element?.id} key={index}>
                      {element?.type == "first"
                        ? element?.group?.name_uz
                        : element?.name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col xl={4}>
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
      <Row>
        <Col xl={24}>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            loading={isLoading}
            bordered={true}
            scroll={{ x: true, y: 600 }}
            size="small"
            sticky
          />
        </Col>
      </Row>
      {data?.length > 0 && (
        <Row className={"justify-content-between"}>
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

export default withTranslation()(AllowedSeparatelyAllowStudentsTable);
