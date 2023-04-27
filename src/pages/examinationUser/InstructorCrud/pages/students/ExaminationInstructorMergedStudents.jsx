import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Badge } from "reactstrap";
import {
  examinationAreaInstructorStudentCarUnMerge,
  getAllStudents,
  instructorMyExaminationArea,
} from "../../../../../services/api_services/instructor_student_api";
import { message, Table, Popconfirm } from "antd";
import StudentCarMargeModal from "./StudentCarMargeModal";
import { NavLink } from "react-router-dom";

const ExaminationInstructorMergedStudents = ({}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reload, setReload] = useState(false);
  const [examinationArea, setExaminationArea] = useState();
  const columns = [
    {
      title: "№",
      render: (text, record, index) => index + 1,
      width: 40,
      align: "center",
    },
    {
      title: "F.I.O",
      render: (index, element) => (
        <>
          {" "}
          <NavLink
            to={{
              pathname: `/examination-instructor/exam-ended-students/${element?.id}`,
              state: {
                edu_type_id: element?.edu_type_id,
                student_fio: element?.student_fio,
                car_edu_type_id:
                  element?.merged_data?.examination_car?.edu_type_id,
              },
            }}
          >
            {element?.student_fio}
          </NavLink>{" "}
        </>
      ),
    },
    {
      title: "Pasport",
      dataIndex: "student_passport",
    },
    {
      title: "Avtomobil (turi / raqami / DPS ID)",
      render: (index, element) => (
        <>
          {element?.merged_data?.examination_car?.name} /{" "}
          {element?.merged_data?.examination_car?.number} /{" "}
          {element?.merged_data?.examination_car?.gps_id}
        </>
      ),
    },
    {
      title: "Bekor qilish",
      className: "",
      render: (index, element) => (
        <>
          <Popconfirm
            title={"Biriktirilgan avtomobilni bekor qilasizmi"}
            placement={"left"}
            cancelText={"Yopish"}
            okText={"Bekor qilish"}
            onConfirm={() => unMerge(element)}
          >
            <button className={"btn btn-outline-danger"}>
              <i className="fa fa-car" aria-hidden="true" />{" "}
              <i className={"fa fa-times"} />
            </button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const unMerge = element => {
    if (element) {
      (async () => {
        const iii = {
          student_id: element?.id,
          key: examinationArea?.key,
          car_id: element?.merged_data?.examination_car?.gps_id,
          token: "",
        };
        const response = await examinationAreaInstructorStudentCarUnMerge(iii);
        if (parseInt(response?.data?.status) === 1) {
          message.success(response?.data?.message);
          setReload(!reload);
        }
        if (parseInt(response?.data?.status) === 0) {
          message.error(response?.data?.message);
        }
      })();
    }
  };
  const getExaminationArea = async () => {
    const res = await instructorMyExaminationArea();
    setExaminationArea(res?.data);
  };
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let filters = [
        // {
        //     fieldKey:'status',
        //     value:1
        // }
      ];
      let params = {
        merged_status: "merged",
        filters: JSON.stringify(filters),
      };
      const response = await getAllStudents(params);
      if (parseInt(response?.data?.status) === 1) {
        setData(response?.data?.data?.data);
      }
      if (parseInt(response?.data?.status) === 0) {
        message.error(response?.data?.message);
      }
      setIsLoading(false);
    })();
    getExaminationArea().then(r => {});
  }, [reload]);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <div className="top-organizations d-flex justify-content-between">
              <h5 className="text-dark">Avtomobilga biriktirilganlar</h5>
              <div className={"d-flex"}>
                {/*<button className={'btn btn-outline-success'} onClick={showAddModal}><i*/}
                {/*    className={'fa fa-plus'}></i> Qo`shish*/}
                {/*</button>*/}
              </div>
            </div>

            <Table
              pagination={false}
              dataSource={data}
              columns={columns}
              bordered={true}
              scroll={{ x: true, y: 600 }}
              size="small"
              sticky
            />
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ExaminationInstructorMergedStudents;
