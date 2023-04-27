import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Select,
  Input,
  Pagination,
  DatePicker,
  Tabs,
  Button,
} from "antd";
import ExamResultIndexTable from "../ExamResultIndexTable";
import moment from "moment";
import {
  getExaminationUserResultByStatistic,
  getExaminationUserResultByStudent,
} from "../../../../services/api_services/examination_user_api";
import useDebounce from "../../../../components/CustomHooks/useDebounce";
import { DataLoader } from "../../../Loaders/Loaders";
import { exportExamResult } from "../../../../services/exports/exam_result_export";
import AnimationLineChart from "../../../../components/Charts/AnimationLineChart";

const ChartExamStudentsTab = props => {
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filter_org_id, setfilter_org_id] = useState("all");
  const [isloading, setIsloading] = useState(false);
  const [reload, setreload] = useState(false);
  const [params, setParams] = useState({
    word: "",
    page: 1,
  });
  const wait_word = useDebounce(params.word, 800);
  const { RangePicker } = DatePicker;
  const [week, setWeek] = useState();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      setIsloading(true);
      let frontFilters = [];
      let params = {
        token,
        organization_id: filter_org_id,
        show_count: "all",
        filters: JSON.stringify(frontFilters),
        week: moment(week).format("YYYY-MM-DD"),
      };
      const response = await getExaminationUserResultByStatistic(params);
      if (response?.data?.status == 1) {
        setData(response?.data?.data);
        setFilters(response?.data?.filters);
        setIsloading(false);
      }
    })();
  }, [filter_org_id, reload, wait_word, week]);

  const changeOrganizationId = value => {
    setfilter_org_id(value);
  };

  const changeWeekSelect = value => {
    setWeek(value);
  };
  console.log("po", data);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xl={6}>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a person"
            optionFilterProp="children"
            value={filter_org_id != "all" ? Number(filter_org_id) : "all"}
            onChange={changeOrganizationId}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          <DatePicker
            className={"w-100"}
            onChange={changeWeekSelect}
            picker="week"
          />
        </Col>
        <Col xl={24}>
          <AnimationLineChart data={data} />
        </Col>
      </Row>
    </>
  );
};
export default ChartExamStudentsTab;
