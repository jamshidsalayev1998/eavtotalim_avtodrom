import { Button, Col, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import {
  getOrganizations,
  getVisitorTypes,
} from "services/api_services/administrator_students_api";
import { getEduTypesForAll } from "services/api_services/edu_types_api";
import ApplyModal from "./ApplyModal";
import data from "./data";
import "./style.scss";
import {indexOnlineApplicationNew} from "../../../services/api_services/online_applications/online_application_api";

const index = () => {
  // states
  const [modalOpen, setModalOpen] = useState(false);
  const [visitorTypes, setVisitorTypes] = useState([]);
  const [eduTypes, setEduTypes] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [reload, setReload] = useState(false);

  // modal props datas
  const getApplication = () => {
    (async () => {
      let params = {};
      const response = await indexOnlineApplicationNew(params);
      // setApplications(response?.data);
      let ddd = [];
      ddd.push(response?.data);
      setApplications(ddd);
      console.log('iki' , response)
    })();
  };
  const getVisitorTypesFunction = () => {
    (async () => {
      let params = {};
      const response = await getVisitorTypes(params);
      setVisitorTypes(response?.data);
    })();
  };
  const getEduTypesFunction = () => {
    (async () => {
      let params = {};
      const response = await getEduTypesForAll(params);
      setEduTypes(response?.data?.data);
    })();
  };
  const getOrganizationsFunction = () => {
    (async () => {
      const orgResp = await getOrganizations({ show_count: "all" });
      if (orgResp) {
        setOrganizations(orgResp?.data);
      }
    })();
  };

  useEffect(() => {
    getApplication();
    getVisitorTypesFunction();
    getEduTypesFunction();
    getOrganizationsFunction();
  }, [reload]);

  // modal control
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 40,
      align: "center",
    },
    {
      title: "F.I.SH",
      width: 350,
      render: (text, record, index) => <>{record?.final_access_student?.student_fio}</>,
    },
    {
      title: "Test markazi",
      width: 300,
      render: (text, record, index) => <>{record?.final_access_student?.examination_area?.name}</>,
    },
    {
      title: "Topshiruvchi turi",
      width: 350,
      render: (text, record, index) => <>{record?.final_access_student?.visitor_type?.name}</>,
    },
    {
      title: "Ta`lim turi",
      dataIndex: "edutype",
      render: (text, record, index) => <>{record?.final_access_student?.edu_type?.name_for_exam}</>,
    },
    {
      title: "Holati ",
      align: "center",
      render: (text, record, index) => <>{record?.final_access_student?.general_status_data?.name}</>,
    },
    {
      title: "Amallar",
      align: "center",
      key: "address",
      width: 120,
    },
  ];
  return (
    <div className="page-content apply">
      <Card className="mb-3">
        <div className="apply-header">
          <div>Ariza topshirish</div>
          <Button type="primary" onClick={handleOpenModal}>
            <i className="fas fa-plus-circle mr-1"></i>Ariza yarating
          </Button>
        </div>
      </Card>
      {/* ARIZALAR JADVALI */}
      <Card>
        <Table
          className="table-responsive table-hover"
          dataSource={applications}
          columns={columns}
          scroll={{ x: true, y: 600 }}
          pagination={{ position: ["bottomRight"] }}
          size="small"
          sticky
        />
      </Card>

      {/* HUJJAT TOPSHIRISH MODALI */}
      <ApplyModal
          reload={reload}
          setReload={setReload}
        visitorTypes={visitorTypes}
        open={modalOpen}
        onClose={handleCloseModal}
        organizations={organizations}
      />
    </div>
  );
};

export default index;
