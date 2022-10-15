import React, { useState, useEffect } from "react";
import { Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { PATH_PREFIX } from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import { Input, Select } from 'antd';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import PaginationComponent from "react-reactstrap-pagination";

const AcceptedComeGroupsTable = ({ get_again }) => {
  const { Option } = Select;
  const { t } = useTranslation();
  const [show_count, setshow_count] = useState("10");
  const [page, setpage] = useState("1");
  const [total, settotal] = useState("1");
  const [word, setword] = useState(localStorage.getItem(window.location.pathname+'-accepted-default-search-word'));
  const [organizations, set_organizations] = useState([]);
  const [organization_id, set_organization_id] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const handleSelected = selectedPage => {
    setpage(selectedPage);
    set_get_again(!get_again);
  };

  useEffect(() => {
    // alert('sdsd')
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/come-examination/come-groups-index",
      method: "GET",
      params: {
        show_count,
        page,
        word,
        organization_id,
        token,
        status: "1",
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        setIsLoading(false);
        setData(res?.data?.data?.data);
        settotal(res?.data?.data?.total);
        set_organizations(res?.data?.filters?.organizations);
      }
    });
  }, [get_again, show_count, page, word, organization_id]);

  const change_word = (word) => {
    setword(word);
    localStorage.setItem(window.location.pathname+'-accepted-default-search-word' , word);
  }

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <Col xl={4}>
          <label htmlFor="">Tashkilot</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a person"
            optionFilterProp="children"
            value={organization_id}
            onChange={e => {set_organization_id(e); setpage(1)}}
            defaultValue="all"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="all">Barchasi</Option>
            {organizations?.map((element, index) => {
              return (
                <Option value={element?.id} key={index}>
                  {element?.name_uz}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col xl={2}>
          <label htmlFor="">Qidirish</label>
            <Input allowClear style={{ width: '100%' }} defaultValue={word} onChange={(e) => {change_word(e?.target?.value); setpage(1)}} />
        </Col>
      </Row>
      {isLoading && <DataLoader />}
      {!isLoading && (
        <>
          <Row>
            <Table
              id="tech-companies-1"
              className="table table-striped table-bordered mt-2"
            >
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Guruh nomi</Th>
                  <Th>Tashkilot</Th>
                  <Th>O'quvchilar soni</Th>
                  <Th>Guruh kelish vaqti</Th>
                  <Th >Test topshirish holati</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((element, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <NavLink
                          to={`/come-examination/come-groups/${element?.id}`}
                        >
                          {element?.name}
                        </NavLink>
                      </Td>
                      <Td>{element?.group?.organization?.name_uz}</Td>
                      <Td>{element?.final_access_students_count}</Td>
                      <Td>
                        {element?.access_start_date} (
                        {element?.access_start_time})
                      </Td>
                      <Td >
                        <Badge
                          color={element?.type == 'resubmit' ? "warning" : "success"}
                          className="py-1 px-2 badge badge-pill"
                        >
                          {element?.type == "resubmit" && "Qayta topshirish"}
                          {element?.status == "first" && "Birinchi marta"}
                        </Badge>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Row>
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
              defaultActivePage={1}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default withTranslation()(AcceptedComeGroupsTable);
