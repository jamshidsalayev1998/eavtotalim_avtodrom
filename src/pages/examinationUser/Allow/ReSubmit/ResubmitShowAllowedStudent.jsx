import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Container } from "reactstrap";
import axios from "axios";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { DataLoader } from "pages/Loaders/Loaders";
import { Table } from "antd";
import Swal from "sweetalert2";
import ResubmitFinalTestPrintComponent from "./ResubmitFinalTestPrintComponent";
import { PATH_PREFIX } from "Utils/AppVariables";

const ResubmitShowAllowedStudent = ({}) => {
  let match = useRouteMatch("/come-examination/resubmit/allowed-students/:id");
  const history = useHistory();
  const { t } = useTranslation();
  const [get_again, set_get_again] = useState(false);
  const [element_id, set_element_id] = useState(match?.params?.id);
  // const [data, setData] = useState("");
  const [group, setGroup] = useState("");
  const [students, setStudents] = useState([]);
  const [selected_students, setSelectedStudents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selected_keys, set_selected_keys] = useState([]);
  const location = useLocation();
  useEffect(() => {
    // alert('sdsd')
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/come-examination/allow-groups/" + element_id,
      method: "GET",
      params: {
        token,
        status: 2,
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        let a = [];
        setGroup(res?.data?.group);
        setIsLoading(false);
        res?.data?.data?.map((item, index) => {
          a.push(item?.id);
        });
        set_selected_keys(a);
        setSelectedStudents(a);
        setStudents(res?.data?.data);
      }
    });
  }, [get_again]);
  const columns = [
    {
      title: "F.I.O",
      dataIndex: "fio",
    },
    {
      title: "Pasport",
      dataIndex: "passport",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
    },
  ];
  const data = students;
  const rowSelection = {
    selectedRowKeys: selected_keys,
    onChange: selectedRowKeys => {
      setSelectedStudents(selectedRowKeys);
      set_selected_keys(selectedRowKeys);
    },
    getCheckboxProps: record => ({
      // disabled: true,
    }),
  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const allow_final_test = () => {
    const form_data = new FormData();
    form_data.append("students", selected_keys ? selected_keys : []);
    form_data.append("group_id", group?.group?.id);
    const token = localStorage.getItem("token");
    if (selected_keys?.length > 0) {
      swalWithBootstrapButtons
        .fire({
          title: "Testga ruxsat berilsinmi?",
          text: "Jami " + selected_keys?.length + " ta o'quvchi",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ruxsat berish!",
          cancelButtonText: "Bekor qilish!",
          reverseButtons: true,
        })
        .then(result => {
          if (result.isConfirmed) {
            axios({
              url: PATH_PREFIX + "/come-examination/allow-group-to-exam",
              method: "POST",
              params: {
                token,
              },
              data: form_data,
            }).then(res => {
              if (res?.data?.status == "1") {
                swalWithBootstrapButtons.fire(
                  "Ruxsat berildi!",
                  "O'quvchilarga testga ruxsat berildi",
                  "success"
                );
              }
              if (res?.data?.status == "0") {
                swalWithBootstrapButtons.fire(
                  "Xatolik",
                  res?.data?.message,
                  "error"
                );
              }
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            result.dismiss === Swal.DismissReason.cancel;

            // swalWithBootstrapButtons.fire(
            //   "Cancelled",
            //   "Your imaginary file is safe :)",
            //   "error"
            // );
          }
        });
    }
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <div className="top_links_page_title">
                  <span className="mr-3" onClick={() => history.goBack()}>
                    <i className="bx bx-arrow-back"> </i>
                  </span>
                  <h5 className="text-dark">
                    {" "}
                    <b>"{location?.state?.groupName}"</b> guruhidan testga
                    ruhsat berilgan o'quvchilarga login parol berish
                  </h5>
                </div>
                <div style={{ display: "flex" }}>
                  <span className="ml-2 mr-2">
                    <b>{selected_keys?.length}</b> ta
                  </span>

                  <ResubmitFinalTestPrintComponent group={group} />
                  {/* <button className="btn btn-success"><i className="fa fa-print"></i> Parollarni chop etish </button> */}
                </div>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                {isLoading && <DataLoader />}
                {!isLoading && (
                  <>
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                    />
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(ResubmitShowAllowedStudent);
