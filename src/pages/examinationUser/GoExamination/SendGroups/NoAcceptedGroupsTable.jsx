import React, { useState, useEffect } from "react";
import { Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import { Select,Input } from "antd";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import PaginationComponent from "react-reactstrap-pagination";

const NoAcceptedGroupsTable = ({}) => {
  const { Option } = Select;
  const { t } = useTranslation();
  const [get_again, set_get_again] = useState(false);

  const [show_count, setshow_count] = useState("10");
  const [page, setpage] = useState("1");
  const [total, settotal] = useState("1");
  const [word, setword] = useState(localStorage.getItem(window.location.pathname+'-no-accepted-default-search-word'));
  const [examination_area_id, set_selected_examination_area_id] = useState(
    "all"
  );
  const [examination_areas, set_examination_areas] = useState([]);
  const [data, setData] = useState([]);
  const handleSelected = selectedPage => {
    setpage(selectedPage);
    set_get_again(!get_again);
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/go-examination/send-groups-index",
      method: "GET",
      params: {
        token,
        show_count,
        page,
        examination_area_id,
        word,
        status: "0",
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        setIsLoading(false)
        setData(res?.data?.data?.data);
        set_examination_areas(res?.data?.filters?.examination_areas);
        settotal(res?.data?.data?.total);
      }
    });
  }, [get_again, page, show_count, examination_area_id, word]);

  const change_word = (word) => {
    setword(word);
    localStorage.setItem(window.location.pathname+'-no-accepted-default-search-word' , word);
  }

  return (
    <>
      

      <Row style={{ justifyContent: "space-between" }}>
        <Col xl={4}>
          <label htmlFor="">{t("The subject of the examination")}</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={e => {set_selected_examination_area_id(e); setpage(1)}}
            defaultValue="all"
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="all">{t("All")}</Option>
            {examination_areas?.map((element, index) => {
              return (
                <Option value={element?.id} key={index}>
                  {element?.name}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col xl={2}>
          <label htmlFor="">{t("Search")}</label>
          <Input allowClear style={{ width: '100%' }} defaultValue={word} onChange={(e) => {change_word(e?.target?.value); setpage(1)}} />
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
                <Th data-priority="3">{t("Group name")}</Th>
                <Th data-priority="3">{t("Subject name")}</Th>
                <Th data-priority="3">{t("Status")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ?.filter(data => data?.status == "0")?.map((element, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        {show_count == "all"
                          ? index + 1
                          : show_count * (page - 1) + index + 1}
                      </Td>
                      <Td>
                        <NavLink
                          to={`/go-examination/send-groups/${element?.id}`}
                        >
                          {element?.group?.name_uz ||
                            element?.group?.name_ru ||
                            element?.group?.name_en ||
                            element?.group?.name_qq ||
                            element?.group?.name_kiril}{" "}
                        </NavLink>
                      </Td>
                      <Td>{element?.examination_area?.name}</Td>
                      <Td style={{ width: "1px" }}>
                        <Badge
                          color={element?.status == 1 ? "success" : "warning"}
                          className="py-1 px-2 badge badge-pill"
                        >
                          {element?.status == "1" && "Tasdiqlangan"}
                          {element?.status == "0" && "Tasdiqlanmagan"}
                        </Badge>
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
    </>
  );
};

export default withTranslation()(NoAcceptedGroupsTable);
