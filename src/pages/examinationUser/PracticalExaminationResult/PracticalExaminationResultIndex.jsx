import React, { useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { withTranslation } from "react-i18next";
import { Row, Col, Select, Input, Pagination } from "antd";
import axios from "axios";
import { DataLoader } from "../../Loaders/Loaders";
import useDebounce from "../../../components/CustomHooks/useDebounce";
import PracticalExamResultIndexTable from "./ExamResultIndexTable";
import { PATH_PREFIX } from "Utils/AppVariables";

const PracticalExaminationResultIndex = props => {
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filter_org_id, setfilter_org_id] = useState("all");
  const [isloading, setIsloading] = useState(false);
  const [word, setword] = useState("");
  const [page, setpage] = useState(1);
  const [total, settotal] = useState(0);
  const [show_count, setshow_count] = useState(10);
  const [reload, setreload] = useState(false);
  const [params, setParams] = useState({
    word: "",
    page: 1,
  });
  const wait_word = useDebounce(params.word, 800);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsloading(true);
    axios({
      url: PATH_PREFIX + "/practical-examination-user/results-by-student",
      method: "GET",
      params: {
        token,
        organization_id: filter_org_id,
        show_count,
        ...params,
      },
    }).then(response => {
      if (response?.data?.status == 1) {
        setData(response?.data?.data?.data);
        setFilters(response?.data?.filters);
        settotal(response?.data?.data?.total);
        setIsloading(false);
      }
    });
  }, [filter_org_id, reload, wait_word]);

  const select_page = value => {
    setpage(value);
    setParams({ ...params, page: value });
    setreload(!reload);
  };

  const change_search = value => {
    setword(value);
    setParams({ ...params, word: value, page: 1 });
  };
  const show_count_change = value => {
    setshow_count(value);
    setreload(!reload);
  };
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5>Imtihon natijalari </h5>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Row className="d-flex justify-content-between">
                  <Col xl={6}>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a person"
                      optionFilterProp="children"
                      value={
                        filter_org_id != "all" ? Number(filter_org_id) : "all"
                      }
                      onChange={e => setfilter_org_id(e)}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="all">Barchasi</Option>
                      {filters?.organizations?.map((element, index) => {
                        return (
                          <Option value={element?.id}>
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
                  <Col xl={6}>
                    <Input
                      allowClear={true}
                      value={word}
                      onChange={e => change_search(e?.target?.value)}
                    />
                  </Col>
                </Row>
                {!isloading ? (
                  <Row>
                    <Col xl={24}>
                      <PracticalExamResultIndexTable tableData={data} />
                    </Col>
                  </Row>
                ) : (
                  <DataLoader />
                )}
                <Row className="d-flex justify-content-end mt-2">
                  <Pagination
                    defaultCurrent={1}
                    current={params.page}
                    defaultPageSize={10}
                    total={total}
                    onChange={e => select_page(e)}
                    onShowSizeChange={(page, e) => show_count_change(e)}
                  />
                </Row>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(PracticalExaminationResultIndex);
