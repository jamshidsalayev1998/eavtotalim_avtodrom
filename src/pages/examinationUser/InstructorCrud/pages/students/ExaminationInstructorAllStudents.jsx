import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Badge } from "reactstrap";
import {
  getAllStudents,
  instructorMyExaminationArea,
} from "../../../../../services/api_services/instructor_student_api";
import { message, Table } from "antd";
import StudentCarMargeModal from "./StudentCarMargeModal";

const ExaminationInstructorAllStudents = ({}) => {
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
      dataIndex: "student_fio",
      key: "student_fio",
    },
    {
      title: "Pasport",
      dataIndex: "student_passport",
    },
    {
      title: "Ta`lim turi",
      render: (index, element) => <>{element?.edu_type?.short_name_en}</>,
    },
    {
      title: "Haydaydigan moshinalar soni",
      render: (index, element) => (
        <>{element?.edu_type_car_access?.car_count}</>
      ),
    },
    {
      title: "Haydagan moshinalar soni",
      render: (index, element) => (
        <>{element?.final_practical_test_records_count}</>
      ),
    },
    {
      title: "Avtomobilga birlashtirish",
      className: "last-td",
      render: (index, element) => (
        <>
          <button
            className={"btn btn-outline-success"}
            onClick={() => selectStudent(element)}
          >
            <i className="fa fa-car" aria-hidden="true"></i>{" "}
            <i className={"fa fa-check"}></i>
          </button>
        </>
      ),
    },
  ];
  const getExaminationArea = async () => {
    const res = await instructorMyExaminationArea();
    setExaminationArea(res?.data);
  };
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let filters = [
        {
          fieldKey: "exam_result",
          value: "1",
        },
        {
          fieldKey: "practical_payment_status",
          value: 1,
        },
      ];
      let params = {
        merged_status: "unMerged",
        filters: JSON.stringify(filters),
      };
      const response = await getAllStudents(params);
      if (response?.data?.status == 1) {
        setData(response?.data?.data?.data);
      }
      if (response?.data?.status == 0) {
        message.error(response?.data?.message);
      }
      setIsLoading(false);
    })();
    getExaminationArea().then(r => {});
  }, [reload]);
  const selectStudent = element => {
    setSelectedStudent(element);
    setIsModalVisible(true);
  };

  return (
    <>
      <StudentCarMargeModal
        examinationArea={examinationArea}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        selectedStudent={selectedStudent}
        reload={reload}
        setReload={setReload}
      />
      <div className="page-content">
        <Container fluid>
          <Card>
            <div className="top-organizations d-flex justify-content-between">
              <h5 className="text-dark">Barcha topshiruvchilar</h5>
              <div className={"d-flex"}>
                {/*<button className={'btn btn-outline-success'} onClick={showAddModal}><i*/}
                {/*    className={'fa fa-plus'}></i> Qo`shish*/}
                {/*</button>*/}
              </div>
            </div>
            <div className="crypto-buy-sell-nav mt-3">
              <Table
                pagination={false}
                dataSource={data}
                columns={columns}
                bordered={true}
                scroll={{ x: true, y: 600 }}
                size="small"
                sticky
              />
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ExaminationInstructorAllStudents;
