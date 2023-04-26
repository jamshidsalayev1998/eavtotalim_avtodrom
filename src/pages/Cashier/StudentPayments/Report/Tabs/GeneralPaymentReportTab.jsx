import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { withTranslation } from "react-i18next";
import {
  Row,
  Col,
  Select,
  Input,
  Pagination,
  DatePicker,
  Tabs,
  Button,
  Table,
} from "antd";
import moment from "moment";
import { getPaymentReport } from "../../../../../services/api_services/payment/payment_report_api";
import PaymentReportTable from "../PaymentReportTable";
import { Excel } from "antd-table-saveas-excel";
import tableExport from "antd-table-export";
import { exportPaymentReportFunction } from "../../../../../services/exports/payment_report_export";

const GeneralPaymentReportTab = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState();
  const [cashierId, setCashierId] = useState(undefined);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageConfig = {
    fromDate: window.location.pathname + "-general-from-date",
    toDate: window.location.pathname + "-general-to-date",
  };
  const [intervalDate, setIntervalDate] = useState({
    from_date: localStorage.getItem(pageConfig?.fromDate)
      ? moment(localStorage.getItem(pageConfig?.fromDate))
      : null,
    to_date: localStorage.getItem(pageConfig?.toDate)
      ? moment(localStorage.getItem(pageConfig?.toDate))
      : moment(),
  });
  const tableRef = useRef();
  console.log("reff", tableRef);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let params = {};
      let filters = [];
      if (cashierId) {
        filters.push({
          fieldKey: "created_by",
          fieldOperator: "=",
          fieldValue: cashierId,
        });
      }
      Object.assign(params, { filters: JSON.stringify(filters) });
      let paymentFilters = {};
      if (intervalDate?.from_date && intervalDate?.to_date) {
        Object.assign(paymentFilters, { intervalDate: intervalDate });
      }
      Object.assign(params, { paymentFilters: JSON.stringify(paymentFilters) });
      const response = await getPaymentReport(params);
      if (parseInt(response?.status) === 1) {
        setFilters(response?.filters);
        // console.log('asd' , response?.data)
        setData(response?.data);
      }
      setIsLoading(false);
    })();
  }, [reload]);
  const changeIntervalDate = value => {
    if (value?.length > 0) {
      setIntervalDate({
        from_date: value[0],
        to_date: value[1],
      });
      localStorage.setItem(pageConfig?.fromDate, value[0]);
      localStorage.setItem(pageConfig?.toDate, value[1]);
    } else if (value == null) {
      setIntervalDate({
        from_date: null,
        to_date: moment(),
      });
      localStorage.removeItem(pageConfig?.fromDate);
      localStorage.removeItem(pageConfig?.toDate);
    }
    setReload(!reload);
  };
  const disabledDate = current => {
    return current && current > moment().endOf("day");
  };

  const changeCashier = value => {
    if (value !== "all") {
      setCashierId(value);
    } else {
      setCashierId(undefined);
    }
    setReload(!reload);
  };
  const summAmount = data => {
    let summ = 0;
    data.forEach(el => {
      summ += parseInt(el?.amount);
    });
    return summ;
  };

  const columnsHead = [
    {
      title: "№",
      fixed: "left",
      render: (index, element, counter) => <>{counter + 1}</>,
      align: "center",
      width: "60",
    },
    {
      title: "Toifa",
      fixed: "left",
      render: (index, element) => <>{element?.eduType?.short_name_en}</>,
      align: "center",
      width: "200",
    },
    {
      title: "Umumiy",
      fixed: "left",
      render: (index, element) => (
        <div style={{ width: "60px" }}> {summAmount(element?.payments)}</div>
      ),
      align: "center",
      width: "120",
    },
  ];

  const columnsFoot = filters
    ? filters?.examinationAreaPaymentTypes?.map((elemType, indexType) => {
        return {
          title: elemType?.name,
          children: filters
            ? filters?.paymentTypes?.map((elemType2, indexType2) => {
                return {
                  title: elemType2?.short_name,
                  render: (index, element) => (
                    <>
                      {summAmount(
                        element?.payments
                          ?.filter(
                            perElem =>
                              perElem.examination_area_payment_type_id ===
                              elemType?.id
                          )
                          ?.filter(
                            perElemT =>
                              perElemT.payment_type_id === elemType2?.id
                          )
                      )}
                    </>
                  ),
                };
              })
            : [],
        };
      })
    : [];

  const columns = [...columnsHead, ...columnsFoot];

  const exportExamResultFunction = () => {
    let params = {};
    let filters = [];
    if (cashierId) {
      filters.push({
        fieldKey: "created_by",
        fieldOperator: "=",
        fieldValue: cashierId,
      });
    }
    Object.assign(params, { filters: JSON.stringify(filters) });
    let paymentFilters = {};
    if (intervalDate?.from_date && intervalDate?.to_date) {
      Object.assign(paymentFilters, { intervalDate: intervalDate });
    }
    Object.assign(params, { paymentFilters: JSON.stringify(paymentFilters) });
    exportPaymentReportFunction("Hisobot(amaliy)", params);
  };
  return (
    <>
      <Row className="d-flex" gutter={[12, 12]}>
        <Col xl={6} className="mb-3">
          <RangePicker
            disabledDate={disabledDate}
            defaultValue={[intervalDate?.from_date, intervalDate?.to_date]}
            onChange={changeIntervalDate}
            className={"w-100"}
          />
        </Col>

        <Col xl={8}>
          <Select
            className={"w-100"}
            showSearch
            placeholder="Kassirlar"
            optionFilterProp="children"
            onChange={changeCashier}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            defaultValue={"all"}
          >
            <Option value="all">Barchasi</Option>
            {filters?.users
              ? filters?.users?.map((element, i) => {
                  return (
                    <Option value={element?.id} key={i}>
                      {element?.name}
                    </Option>
                  );
                })
              : ""}
          </Select>
        </Col>
        <Col xl={4}>
          <Button onClick={exportExamResultFunction}>Excel ga chiqarish</Button>
        </Col>
      </Row>
      <Row>
        {data ? (
          <Table
            ref={tableRef}
            dataSource={data}
            loading={isLoading}
            columns={columns}
            pagination={false}
            bordered={true}
            scroll={{ x: true, y: 600 }}
            size="small"
            sticky
          />
        ) : (
          ""
        )}
      </Row>
    </>
  );
};

export default withTranslation()(GeneralPaymentReportTab);
