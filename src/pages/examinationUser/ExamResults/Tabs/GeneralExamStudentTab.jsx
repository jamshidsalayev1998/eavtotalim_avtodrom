import React, { useState, useEffect, useRef } from "react";
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
  getExaminationUserResultByStudent,
  getReportByStudent,
} from "../../../../services/api_services/examination_user_api";
import useDebounce from "../../../../components/CustomHooks/useDebounce";
import { DataLoader } from "../../../Loaders/Loaders";
import { exportExamResult } from "../../../../services/exports/exam_result_export";
import ReactToPrint from "react-to-print";
import PrintReportByDay from "../print/PrintReportByDay";

const GeneralExamStudentsTab = props => {
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
  const { RangePicker } = DatePicker;
  const [intervalDate, setIntervalDate] = useState({
    from_date: localStorage.getItem(
      window.location.pathname + "-success-filter-from_date"
    )
      ? moment(
          localStorage.getItem(
            window.location.pathname + "-success-filter-from_date"
          )
        )
      : null,
    to_date: localStorage.getItem(
      window.location.pathname + "-success-filter-to_date"
    )
      ? moment(
          localStorage.getItem(
            window.location.pathname + "-success-filter-to_date"
          )
        )
      : moment(),
  });

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      setIsloading(true);
      let frontFilters = [];
      let params = {
        token,
        status_filter: "general",
        organization_id: filter_org_id,
        show_count,
        filters: JSON.stringify(frontFilters),
        page: page,
        word: word,
        from_date: intervalDate?.from_date
          ? moment(intervalDate?.from_date).format("YYYY-MM-DD")
          : "",
        to_date: intervalDate?.to_date
          ? moment(intervalDate?.to_date).format("YYYY-MM-DD")
          : "",
      };
      const response = await getReportByStudent(params);
      if (response?.data?.status == 1) {
        setData(response?.data?.data?.data);
        setFilters(response?.data?.filters);
        settotal(response?.data?.data?.total);
        setIsloading(false);
      }
    })();
  }, [filter_org_id, reload, wait_word, intervalDate]);

  const select_page = value => {
    setpage(value);
    setParams({ ...params, page: value });
    setreload(!reload);
  };

  const change_search = value => {
    setword(value);
    setpage(1);
    setParams({ ...params, word: value, page: 1 });
  };
  const show_count_change = value => {
    setshow_count(value);
    setreload(!reload);
  };
  const changeOrganizationId = value => {
    setfilter_org_id(value);
  };
  const disabledDate = current => {
    return current && current > moment().endOf("day");
  };
  const changeIntervalDate = value => {
    console.log("k", value);
    if (value?.length > 0) {
      setIntervalDate({
        from_date: value[0],
        to_date: value[1],
      });
      localStorage.setItem(
        window.location.pathname + "-success-filter-from_date",
        value[0]
      );
      localStorage.setItem(
        window.location.pathname + "-success-filter-to_date",
        value[1]
      );
    } else if (value == null) {
      setIntervalDate({
        from_date: null,
        to_date: moment(),
      });
      localStorage.removeItem(
        window.location.pathname + "-success-filter-from_date"
      );
      localStorage.removeItem(
        window.location.pathname + "-success-filter-to_date"
      );
    }
  };
  console.log("interval", intervalDate);
  const exportExamResultFunction = () => {
    const token = localStorage.getItem("token");
    let frontFilters = [];
    let params = {
      token,
      organization_id: filter_org_id,
      show_count: "all",
      filters: JSON.stringify(frontFilters),
      word: word,
      from_date: intervalDate?.from_date
        ? moment(intervalDate?.from_date).format("YYYY-MM-DD")
        : "",
      to_date: intervalDate?.to_date
        ? moment(intervalDate?.to_date).format("YYYY-MM-DD")
        : "",
    };
    exportExamResult("Testdan o`tganlar", params);
  };
  let printReportRef = useRef();
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
          <RangePicker
            disabledDate={disabledDate}
            defaultValue={[intervalDate?.from_date, intervalDate?.to_date]}
            onChange={changeIntervalDate}
            className={"w-100"}
          />
        </Col>
        <Col xl={8}>
          <Button onClick={exportExamResultFunction}>Export excel</Button>
          <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return (
                <Button>
                  Kunlik bayonnoma chiqarish (
                  {intervalDate?.to_date
                    ? moment(intervalDate?.to_date).format("YYYY-MM-DD")
                    : moment().format("YYYY-MM-DD")}
                  )
                </Button>
              );
            }}
            content={() => printReportRef}
          />
        </Col>
        <Col xl={4}>
          <Input
            allowClear={true}
            value={word}
            onChange={e => change_search(e?.target?.value)}
            placeholder={"Qidirish"}
          />
        </Col>
        {!isloading ? (
          <Col xl={24}>
            <ExamResultIndexTable
              tableData={data}
              reload={reload}
              setreload={setreload}
            />
          </Col>
        ) : (
          <DataLoader />
        )}
        <Col className="d-flex justify-content-end" xl={24}>
          <Pagination
            defaultCurrent={1}
            current={params.page}
            defaultPageSize={10}
            total={total}
            onChange={e => select_page(e)}
            onShowSizeChange={(page, e) => show_count_change(e)}
          />
        </Col>
      </Row>

      <div className={"print-box"} ref={element => (printReportRef = element)}>
        <PrintReportByDay
          intervalDate={intervalDate}
          reload={reload}
          dataPrint={data}
          statusPrint={"general"}
          fromDate={
            intervalDate?.from_date
              ? moment(intervalDate?.from_date).format("YYYY-MM-DD")
              : ""
          }
          toDate={
            intervalDate?.to_date
              ? moment(intervalDate?.to_date).format("YYYY-MM-DD")
              : moment().format("YYYY-MM-DD")
          }
        />
      </div>
    </>
  );
};
export default GeneralExamStudentsTab;
