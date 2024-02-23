import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Badge } from "reactstrap";
import {
  getAllStudents,
  instructorMyExaminationArea,
} from "../../../../../services/api_services/instructor_student_api";
import { message, Table } from "antd";
import StudentCarMargeModal from "./StudentCarMargeModal";
import { useQuery } from "react-query";

const ExaminationInstructorAllStudents = ({}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reload, setReload] = useState(false);
  const [examinationArea, setExaminationArea] = useState();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      // let filters = [
      //   {
      //     fieldKey: "exam_result",
      //     value: "1",
      //   },
      //   {
      //     fieldKey: "practical_payment_status",
      //     value: 1,
      //   },
      // ];
      // let params = {
      //   merged_status: "unMerged",
      //   filters: JSON.stringify(filters),
      // };
      // setData(contributors?.data?.data?.data);
      // const response = await getAllStudents(params);
      // if (response?.data?.status == 1) {
      // }
      // if (response?.data?.status == 0) {
      //   message.error(response?.data?.message);
      // }
      setIsLoading(false);
    })();
    getExaminationArea().then(r => {});
  }, [reload]);

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

  const { data: contributors } = useQuery("contributorsData", () =>
    getAllStudents(params)
  );

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
      title: <div className="text-center">F.I.O</div>,
      dataIndex: "student_fio",
      key: "student_fio",
      render: (text, row) => <p className="small-title">{row?.student_fio}</p>,
    },
    {
      title: <div className="text-center">Passport</div>,
      dataIndex: "student_passport",
      align: "center",
      render: (text, row) => (
        <p className="small-title">{row?.student_passport}</p>
      ),
    },
    {
      title: <div className="text-center">Ta'lim turi</div>,
      align: "center",
      render: (text, row) => (
        <p className="small-title">{row?.edu_type?.short_name_en}</p>
      ),
    },
    {
      title: "Haydaydigan moshinalar soni",
      align: "center",
      render: (text, row) => (
        <p className="small-title">{row?.edu_type_car_access?.car_count}</p>
      ),
    },
    {
      title: "Haydagan moshinalar soni",
      align: "center",
      render: (text, row) => (
        <p className="small-title">{row?.final_practical_test_records_count}</p>
      ),
    },
    {
      title: "Avtomobilga birlashtirish",
      align: "center",
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
      <div className="content-layout">
        <Card>
          {isLoading ? (
            <div>
              <h1>Loading</h1>
            </div>
          ) : (
            <>
              <p className="big-title" style={{ margin: 0 }}>
                Barcha topshiruvchilar
              </p>
              <Table
                dataSource={contributors?.data?.data?.data}
                columns={columns}
                style={{
                  marginTop: 20,
                  height: "calc(100vh - 190px)",
                }}
                pagination={{
                  pageSize: 10,
                }}
                scroll={{
                  x: 1200,
                  y: "60vh",
                }}
              />
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default ExaminationInstructorAllStudents;
