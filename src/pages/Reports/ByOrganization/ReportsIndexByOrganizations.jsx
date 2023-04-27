import React, { useEffect, useState } from "react";
import { Badge, Card, CardBody, Container } from "reactstrap";
import {
  Row,
  Col,
  Table,
  Popconfirm,
  Form,
  message,
  Tooltip,
  Pagination,
  Input,
} from "antd";
import { reportsIndexByOrganizations } from "../../../services/api_services/examination_director/reports_api";
import useDebounce from "../../../components/CustomHooks/useDebounce";

const ReportsIndexByOrganizations = () => {
  const [reload, setReload] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [word, setWord] = useState("");
  const waitWord = useDebounce(word, 2000);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getData();
  }, [waitWord, reload]);
  const getData = () => {
    (async () => {
      setIsLoading(true);
      const params = {
        page,
      };
      const filters = [
        {
          fieldKey: "name_uz",
          fieldOperator: "LIKE",
          fieldValue: "%" + word + "%",
        },
      ];
      if (word) {
        Object.assign(params, { filters: JSON.stringify(filters) });
      }
      const response = await reportsIndexByOrganizations(params);
      if (response?.data) {
        setData(response?.data);
        setTotal(response?.total);
      }
      setIsLoading(false);
    })();
  };
  const columns = [
    {
      title: "№",
      render: (index, row, counter) => <>{counter + 1}</>,
      align: "center",
      width: 40,
    },
    {
      title: "Avtomaktab",
      render: (index, row) => <>{row?.name_uz}</>,
      width: 350,
    },
    {
      title: "Jami o`tganlar",
      render: (index, row) => <>{row?.theoretical_result?.length}</>,
    },
    {
      title: "1-martada",
      children: [
        {
          title: "Nazariy",
          render: (index, row, counter) => (
            <>{calculateTotal(counter, "theoretical_result", 1)}</>
          ),
        },
        {
          title: "Amaliy",
          render: (index, row, counter) => (
            <>{calculateTotal(counter, "practical_result", 1)}</>
          ),
        },
      ],
    },
    {
      title: "2-martada",
      children: [
        {
          title: "Nazariy",
          render: (index, row, counter) => (
            <>{calculateTotal(counter, "theoretical_result", 2)}</>
          ),
        },
        {
          title: "Amaliy",
          render: (index, row, counter) => (
            <>{calculateTotal(counter, "practical_result", 2)}</>
          ),
        },
      ],
    },
    {
      title: "3-martada",
      children: [
        {
          title: "Nazariy",
          render: (index, row, counter) => (
            <>{calculateTotal(counter, "theoretical_result", 3)}</>
          ),
        },
        {
          title: "Amaliy",
          render: (index, row, counter) => (
            <>{calculateTotal(counter, "practical_result", 3)}</>
          ),
        },
      ],
    },
    {
      title: "4-martada",
      children: [
        {
          title: "Nazariy",
          render: (index, row, counter) => (
            <>{calculateTotal(counter, "theoretical_result", 4)}</>
          ),
        },
        {
          title: "Amaliy",
          render: (index, row, counter) => (
            <>{calculateTotal(counter, "practical_result", 4)}</>
          ),
        },
      ],
    },
  ];
  const calculateTotal = (indexOrganization, column, howMuch) => {
    const needData = data[indexOrganization];
    let needCalculate = 0;
    needData[column]?.map(obj => {
      if (parseInt(obj?.total) === howMuch) {
        needCalculate++;
      }
    });
    return needCalculate;
  };
  const changePage = value => {
    setPage(value);
    setReload(!reload);
  };
  const changeWord = e => {
    setWord(e?.target?.value);
    setPage(1);
  };
  return (
    <div className="page-content">
      <Container fluid>
        <Card>
          <div className="top-organizations">
            <h5>Hisobotlar</h5>
          </div>

          <Row gutter={[16, 16]}>
            <Col xl={24} className={"d-flex justify-content-end mt-3"}>
              <Col xl={4} className={"w-100"}>
                <Input allowClear={true} onChange={changeWord} />
              </Col>
            </Col>
            <Col xl={24}>
              <Table
                loading={isLoading}
                columns={columns}
                dataSource={data}
                bordered={true}
                pagination={false}
                scroll={{ x: true, y: 600 }}
                size="small"
                sticky
              />
            </Col>
            <Col xl={24} className={"d-flex justify-content-end mt-3"}>
              <Pagination
                defaultCurrent={page}
                page={page}
                total={total}
                pageSize={10}
                onChange={changePage}
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default ReportsIndexByOrganizations;
