import React from "react";
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Space, Table, Tag } from "antd";
import { Fade } from "react-awesome-reveal";
import styles from "./index.module.sass";

const LatestTranaction = ({ data }) => {
  // const columns = [
  //   {
  //     title: "#",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (text, record, index) => {
  //       return index + 1;
  //     },
  //   },
  //   {
  //     title: "F.I.O",
  //     dataIndex: "student_fio",
  //     key: "student_fio",
  //   },
  //   {
  //     title: "Raqam",
  //     dataIndex: "student_phone",
  //     key: "student_phone",
  //   },
  //   {
  //     title: "Passport",
  //     dataIndex: "student_passport",
  //     key: "student_passport",
  //   },
  //   {
  //     title: "To'g'ri javoblar",
  //     dataIndex: "correct_answers",
  //     key: "correct_answers",
  //     render: (text, record) => {
  //       return <span style={{ color: "green" }}>{text}</span>;
  //     },
  //   },
  //   {
  //     title: "Noto'g'ri javoblar",
  //     dataIndex: "incorrect_answers",
  //     key: "incorrect_answers",
  //     render: (text, record) => {
  //       return <span style={{ color: "red" }}>{text}</span>;
  //     },
  //   },
  // ];

  const users = data?.last_comes.reverse().slice(0, 3);

  return (
    <>
      <Fade delay={150} triggerOnce={true} direction={"up"}>
        <div className={styles.table}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "7px",
            }}
          >
            <p className="big-title" style={{ margin: 0 }}>
              Ohirgi kelganlar
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <a href="http://95.46.96.49/ti_api_doc.pdf">
                Api doc yuklab olish
              </a>

              <NavLink className="small-title" to="/last-visited">
                {"Ko'proq ko'rish"} <i className="mdi mdi-arrow-down ml-1"></i>
              </NavLink>
            </div>
          </div>
          <div className={styles.table__cards}>
            {users?.map((item, index) => {
              return (
                <div
                  className={styles.table__card}
                  key={index}
                  style={{
                    backgroundColor:
                      item?.incorrect_answers > 3 ? "#FFF5F8" : "#f5fff7",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      className="medium-title"
                      style={{
                        color:
                          item?.incorrect_answers > 3 ? "#F1416C" : "#41f15e",
                      }}
                    >
                      F.I.O
                    </p>
                    <p className="small-title">{item?.student_fio}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      className="medium-title"
                      style={{
                        color:
                          item?.incorrect_answers > 3 ? "#F1416C" : "#41f15e",
                      }}
                    >
                      Raqam
                    </p>
                    <p className="small-title">{item?.student_phone}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      className="medium-title"
                      style={{
                        color:
                          item?.incorrect_answers > 3 ? "#F1416C" : "#41f15e",
                      }}
                    >
                      Passport
                    </p>
                    <p className="small-title">{item?.student_passport}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      className="medium-title"
                      style={{
                        color:
                          item?.incorrect_answers > 3 ? "#F1416C" : "#41f15e",
                      }}
                    >
                      To'g'ri javoblar
                    </p>
                    <p className="small-title">{item?.correct_answers}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      className="medium-title"
                      style={{
                        color:
                          item?.incorrect_answers > 3 ? "#F1416C" : "#41f15e",
                      }}
                    >
                      Noto'g'ri javoblar
                    </p>
                    <p className="small-title">{item?.incorrect_answers}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <Table
          dataSource={data?.last_comes}
          columns={columns}
          style={{ marginTop: 20 }}
          pagination={{
            pageSize: 5,
          }}
          scroll={{
            x: 130,
          }}
        />
        <div>
          <h4>Api doc</h4>
          <a href="http://95.46.96.49/ti_api_doc.pdf">Api doc yuklab olish</a>
        </div> */}
      </Fade>
      {/* <Card>
                <CardBody>
                    <CardTitle className="mb-4">Ohirgi kelganlar</CardTitle>
                    <div className="table-responsive">
                        <table className="table table-centered table-nowrap mb-0">
                            <thead className="thead-light">
                            <tr>
                                <th >
                                    F.I.O
                                </th>
                                <th>Tel</th>
                                <th>Passport</th>
                                <th>To'g'ri javoblar</th>
                                <th>Noto'g'ri javoblar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.last_comes?.map((element, key) => (
                                <tr key={"_tr_" + key}>
                                    <td>
                                        {element?.student_fio}
                                    </td>
                                    <td>
                                    {element?.student_phone}
                                  </td>
                                  <td>
                                    {element?.student_passport}
                                  </td>
                                  <td>
                                    {element?.correct_answers}
                                  </td>
                                  <td>
                                    {element?.incorrect_answers}
                                  </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <h4>Api doc</h4>
                        <a href="http://95.46.96.49/ti_api_doc.pdf">Api doc yuklab olish</a>
                    </div>
                </CardBody>
            </Card> */}
    </>
  );
};

export default LatestTranaction;
