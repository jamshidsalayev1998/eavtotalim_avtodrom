import React, { useState, useEffect } from "react";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import {
  PATH_PREFIX,
} from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import { Select } from "antd";
import Swal from "sweetalert2";
import GoExaminationAddGroupTable from "./addGroupTable";
const GoExaminationAddGroup = props => {
  const { Option } = Select;
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const [examination_areas, setExaminationAreas] = useState([]);
  const [students, setStudents] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [get_again, set_get_again] = useState(false);

  const [show_count, setshow_count] = useState("10");
  const [page, setpage] = useState("1");

  const [selected_students, setSelectedStudents] = useState([]);
  const [selected_group_id , set_selected_group_id] = useState('');
  const [
    selected_examination_area_id,
    set_selected_examination_area_id,
  ] = useState("");


  //errors

  const [group_error , setGroupError] = useState('');
  const [examination_area_error , setExaminationAreaError] = useState('');

  // sort with values by database
  useEffect(() => {
    // alert('sdsd')
    const token = localStorage.getItem("token");
    // setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/go-examination/get-groups-and-examinations",
      method: "GET",
      params: {
        token,
        show_count,
        page,
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        setGroups(res?.data?.data);
        setExaminationAreas(res?.data?.examination_areas);
        setIsLoading(false);
      }
    });
  }, [get_again, page, show_count]);

  const get_students_from_group = group_id => {
    const token = localStorage.getItem("token");
    if (group_id != "" || group_id != "all") {
      setIsLoading(true);
      axios({
        url: PATH_PREFIX + "/go-examination/get-students-index",
        method: "GET",
        params: {
          token,
          group_id,
        },
      }).then(res => {
        if (res?.data?.status == "1") {
          setStudents(res?.data?.data);
          set_selected_group_id(group_id);
          setIsLoading(false);
        }
      });
    }
  };

  const send_to_examination = () => {
    const token = localStorage.getItem("token");
    if (selected_students.length > 0 && selected_examination_area_id != '' && selected_group_id != '') {
      const form_data = new FormData();
      form_data.append('students' , JSON.stringify(selected_students));
      form_data.append('group_id' , selected_group_id);
      form_data.append('examination_area_id' , selected_examination_area_id);
      Swal.fire({
        title: "Jo`natilsinmi?",
        text:
          "O`quvchilar yakuniy test uchun jo`natiladi. Imtihon oluvchi subyekt vaqt bilan tasdiqlagandan keyin habar beriladi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Bekor qilish",
        confirmButtonText: "Jo`natish!",
      }).then(result => {
        if (result.isConfirmed) {
          setIsLoading(true);
          axios({
            url:PATH_PREFIX+'/go-examination/send-students-to-examination-by-group',
            method:'POST',
            params:{
              token
            },
            data:form_data
          }).then(res => {
            if(res?.data?.status == '1'){
              setSelectedStudents([]);

              Swal.fire({
                icon: "success",
                title: res?.data?.message,
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                set_get_again(!get_again)
                set_selected_group_id('');
                set_selected_examination_area_id('');
                setIsLoading(false)
                history.push('/go-examination/send-groups')
              });
            }
          })
        }
      });
    }
    else{
      if(selected_examination_area_id == ''){
        setExaminationAreaError('Subyektni tanlang')
      }
      if(selected_group_id == ''){
        setGroupError('Guruhni tanlang')
      }
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
                  <span className="mr-3 mt-3" onClick={() => history.goBack()}>
                    <i className="bx bx-arrow-back"> </i>
                  </span>
                  <span>Imtihonga jo'natilgan guruhlar </span>
                </div>
                <button
                  onClick={send_to_examination}
                  disabled={selected_students?.length > 0 ? false : true}
                  className="btn btn-success"
                >
                  {" "}
                  <i className="fas fa-walking"></i> Jo'natish{" "}
                </button>
              </div>
              <Row>
                <Col xl={4}>
                  <label htmlFor="">Guruh <span style={{color:'red'}}>{group_error}</span> </label>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Grurhni tanlang"
                    optionFilterProp="children"
                    onChange={e => get_students_from_group(e)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {groups?.map((element, index) => {
                      return (
                        <Option value={element?.id} key={index}>
                          {element?.name_uz ||
                            element?.name_ru ||
                            element?.name_qq ||
                            element?.name_en ||
                            element?.name_kiril}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col xl={4}>
                  <label htmlFor="">Imtihon oluvchi subyekt <span style={{color:'red'}}>{examination_area_error}</span></label>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Imtihon oluvchi"
                    optionFilterProp="children"
                    onChange={e => set_selected_examination_area_id(e)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {examination_areas?.map((element, index) => {
                      return (
                        <Option value={element?.id} key={index}>
                          {element?.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col cl={4}></Col>
              </Row>
              <div className="crypto-buy-sell-nav mt-3">
                {isLoading && <DataLoader />}
                {!isLoading && (
                  <GoExaminationAddGroupTable
                    students={students}
                    selected_students={selected_students}
                    setSelectedStudents={setSelectedStudents}
                    
                  />
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(GoExaminationAddGroup);
