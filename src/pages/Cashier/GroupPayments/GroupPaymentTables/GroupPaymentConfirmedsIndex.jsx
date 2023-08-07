import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { DataLoader } from "pages/Loaders/Loaders";
import { Select, Input } from "antd";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import PaginationComponent from "react-reactstrap-pagination";
import { PATH_PREFIX } from "Utils/AppVariables";

const GroupPaymentConfirmedsIndex = ({}) => {
  const { Option } = Select;
  const { t } = useTranslation();
  const [get_again, set_get_again] = useState(false);

  const [show_count, setshow_count] = useState("10");
  const [page, setpage] = useState("1");
  const [total, settotal] = useState("1");
  const [word, setword] = useState(
    localStorage.getItem(
      window.location.pathname + "-no-allowed-default-search-word"
    )
  );
  const [organization_id, set_selected_organization_id] = useState(
    localStorage.getItem(
      window.location.pathname + "-no-allowed-default-organization-id"
    )
      ? localStorage.getItem(
          window.location.pathname + "-no-allowed-default-organization-id"
        )
      : "all"
  );
  const [group_id, set_selected_group_id] = useState(
    localStorage.getItem(
      window.location.pathname + "-no-allowed-default-group-id"
    )
      ? localStorage.getItem(
          window.location.pathname + "-no-allowed-default-group-id"
        )
      : "all"
  );
  const [organizations, set_organizations] = useState([]);
  const [groups, set_groups] = useState([]);
  const [data, setData] = useState([]);
  const handleSelected = selectedPage => {
    setpage(selectedPage);
    set_get_again(!get_again);
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // alert('sdsd')
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/come-examination/allow-groups",
      method: "GET",
      params: {
        token,
        show_count,
        page,
        organization_id,
        group_id,
        word,
        payment_status: "1",
        type: "first",
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        setIsLoading(false);
        setData(res?.data?.data?.data);
        set_organizations(res?.data?.filters?.organizations);
        set_groups(res?.data?.filters?.groups);
        settotal(res?.data?.data?.total);
      }
    });
  }, [get_again, page, show_count, organization_id, word, group_id]);

  const change_word = word => {
    setword(word);
    localStorage.setItem(
      window.location.pathname + "-no-allowed-default-search-word",
      word
    );
  };

  const change_organization_id = element_id => {
    set_selected_group_id("all");
    localStorage.setItem(
      window.location.pathname + "-no-allowed-default-group-id",
      "all"
    );
    set_groups([]);
    set_selected_organization_id(element_id);
    localStorage.setItem(
      window.location.pathname + "-no-allowed-default-organization-id",
      element_id
    );
  };

  const change_group = element_id => {
    set_selected_group_id(element_id);
    localStorage.setItem(
      window.location.pathname + "-no-allowed-default-group-id",
      element_id
    );
  };

  return (
    <>
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
            {organizations?.map((element, index) => {
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
              setpage(1);
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
                <Th data-priority="3">Guruh</Th>
                <Th data-priority="3">Kelish sanasi va vaqti</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((element, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      {show_count == "all"
                        ? index + 1
                        : show_count * (page - 1) + index + 1}
                    </Td>
                    <Td>
                      <NavLink
                        to={`/cashier/groups-payments/confirmed/${element?.id}`}
                      >
                        {element?.group?.name_uz ||
                          element?.group?.name_kiril ||
                          element?.group?.name_ru ||
                          element?.group?.name_qq ||
                          element?.group?.name_en}
                      </NavLink>
                    </Td>
                    <Td>
                      {element?.access_start_date} ({element?.access_start_time}
                      )
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

export default withTranslation()(GroupPaymentConfirmedsIndex);
