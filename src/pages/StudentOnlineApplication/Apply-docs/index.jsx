import { Button, Col, Empty, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { getVisitorTypes } from "services/api_services/administrator_students_api";
import { getEduTypesForAll } from "services/api_services/edu_types_api";
import ApplyModal from "./ApplyModal";
import "./style.scss";
import { indexOnlineApplicationNew } from "../../../services/api_services/online_applications/online_application_api";
import {
  getOrganizationsWithoutAuth,
  getTestCnterWithoutAuth,
} from "services/api_services/organization_info";

const index = () => {
  // states
  const [modalOpen, setModalOpen] = useState(false);
  const [visitorTypes, setVisitorTypes] = useState([]);
  const [eduTypes, setEduTypes] = useState([]);
  const [testCenters, setTestCenters] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [reload, setReload] = useState(false);

  // modal props datas
  const getApplication = () => {
    (async () => {
      let params = {};
      const response = await indexOnlineApplicationNew(params);
      if (response?.data) {
        setApplications(response?.data?.final_access_student);
      }
    })();
  };
  console.log("applications", applications);

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
  const getTestCentersFunction = () => {
    (async () => {
      const orgResp = await getTestCnterWithoutAuth();
      if (orgResp) {
        setTestCenters(orgResp?.data);
      }
    })();
  };
  const getOrganizationsFunction = () => {
    (async () => {
      const res = await getOrganizationsWithoutAuth();
      if (res) {
        setOrganizations(res?.data);
      }
    })();
  };

  useEffect(() => {
    getApplication();
    getVisitorTypesFunction();
    getEduTypesFunction();
    getTestCentersFunction();
    getOrganizationsFunction();
  }, [reload]);

  // modal control
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
        <table>
          <tr key="">
            <th>Topshiruvchi turi</th>
            <th>Ta'lim turi</th>
            <th>Imtihon olish markazi</th>
            <th>Holati</th>
          </tr>

          <tbody>
            <tr key="">
              <td>{applications?.visitor_type?.name}</td>
              <td>{applications?.edu_type?.short_name}</td>
              <td>{applications?.examination_area?.name}</td>
              <td>{applications?.general_status_data?.name}</td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* HUJJAT TOPSHIRISH MODALI */}
      <ApplyModal
        reload={reload}
        setReload={setReload}
        visitorTypes={visitorTypes}
        open={modalOpen}
        onClose={handleCloseModal}
        testCenters={testCenters}
        organizations={organizations}
      />
    </div>
  );
};

export default index;
