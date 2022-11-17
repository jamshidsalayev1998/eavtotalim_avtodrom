import React, { useContext, useEffect, useState } from "react";
import { Badge, Card, CardBody, Container } from "reactstrap";
import logoImg from "assets/images/logo-blue-big.png";
import { message, Form, Upload, Button, Row, Col } from "antd";
import {
  getComputerConfig,
  getComputerConfigNoAuth,
  setComputerConfig,
  setComputerConfigNoAuth,
} from "../../../../services/api_services/computer_config/config";
import { DesktopOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDesktop,
  AiOutlineEnter,
} from "react-icons/ai";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import { TbHandClick } from "react-icons/tb";
import { RiComputerFill, RiComputerLine } from "react-icons/ri";

const { Dragger } = Upload;

const UserComputerConfigPage = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState();
  const [errorData, setErrorData] = useState();
  const [reload, setReload] = useState(false);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      getConfig();
    })();
  }, [reload]);
  const getConfig = () => {
    (async () => {
      const res = await getComputerConfigNoAuth();
      console.log("res", res);
      setData(res?.data);
    })();
  };
  const onFinish = values => {
    let uploadedFile = values?.json_key?.fileList[0]?.originFileObj;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        let keyData = JSON.parse(fileReader.result);
        sendData(keyData?.key);
        setErrorData(null);
      } catch (e) {
        setErrorData("**Not valid JSON file!**");
      }
    };
    if (uploadedFile !== undefined) fileReader.readAsText(uploadedFile);
  };
  const sendData = key => {
    (async () => {
      const res = await setComputerConfigNoAuth(key);
      if (parseInt(res?.status) === 1) {
        message.success("Kalit saqlandi");
        localStorage.setItem("computer_key", res?.data?.computer_key);
        setReload(!reload);
      } else {
        message.error("Xatolik");
      }
    })();
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          position: "relative",
          display: "flex",
        }}
        className={"justify-content-center"}
      >
        <Link
          className="m-3 d-flex align-items-center justify-content-center border rounded text-white"
          style={{
            fontSize: "20px",
            width: "150px",
            backgroundColor: "#005ED0",
          }}
          to={"/login"}
        >
          <span className="p-1">
            <AiOutlineLeft />
            Login
          </span>
        </Link>
        <Row className={"w-100  justify-content-between p-5"}>
          <Card
            className={"w-100"}
            style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          >
            <CardBody
              className={
                "w-100 text-center  d-flex align-items-center justify-content-center"
              }
            >
              <Col xl={6} md={12} sm={24}>
                <Form
                  form={form}
                  name="basic"
                  className={"w-100"}
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label=""
                    name="json_key"
                    rules={[
                      {
                        required: true,
                        message: "Kalit faylini tanlang!",
                      },
                    ]}
                    className={"w-100"}
                  >
                    <Dragger
                      maxCount={1}
                      accept={".json"}
                      className={"w-100"}
                      {...props}
                      progress={true}
                    >
                      <p className="text-warning" style={{ fontSize: "36px" }}>
                        <BsFillFileEarmarkMedicalFill />
                      </p>
                      <h3 className="ant-upload-text">
                        {" "}
                        <strong>Kalit faylni yuklash</strong>
                      </h3>
                      <p className="ant-upload-hint">
                        Faylni biriktirish uchun uning ustiga bosing!{" "}
                        <TbHandClick style={{ fontSize: "24px" }} />
                      </p>
                    </Dragger>
                  </Form.Item>
                  {localStorage.getItem("computer_key") !== null ? (
                    <Link
                      htmlType="submit"
                      type={"primary"}
                      className={
                        "btn btn-warning w-100 d-flex justify-content-center align-items-center"
                      }
                      to={"/computer-test"}
                    >
                      Test sahifasiga o'tish
                      <RiComputerLine
                        style={{ marginLeft: "5px", fontSize: "20px" }}
                      />
                    </Link>
                  ) : (
                    <Button
                      htmlType="submit"
                      type={"primary"}
                      className={"btn btn-primary w-100"}
                    >
                      Kalitni saqlash
                    </Button>
                  )}
                </Form>
                {data ? (
                  <div
                    className={
                      "d-flex justify-content-center align-items-center"
                    }
                  >
                    <AiOutlineDesktop
                      className=""
                      style={{
                        fontSize: "200px",
                        color: "#bfbfbf",
                      }}
                    />
                    <h1
                      className="position-absolute"
                      style={{ color: "#bfbfbf" }}
                    >
                      <strong>{data?.order}</strong>
                    </h1>
                  </div>
                ) : (
                  "Kompyuterga kalit fayl yuklanmagan !!!"
                )}
              </Col>
            </CardBody>
          </Card>
        </Row>
        <Link
          className="m-3 d-flex align-items-center justify-content-center border rounded text-white"
          style={{
            fontSize: "20px",
            width: "150px",
            backgroundColor: "#005ED0",
          }}
          to={"/computer-test"}
        >
          <span className="p-1">
            Test <AiOutlineRight />
          </span>
        </Link>
      </div>
    </>
  );
};
export default UserComputerConfigPage;
