import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { Form, Button, Divider, Spin, Input, message, Modal } from "antd";
import "./style.scss";
import { getCaptchaApi } from "services/api_services/online_applications/online_application_api";
import axios from "axios";
import ReactInputMask from "react-input-mask";
import API_V2 from "api/index_v2";

const studentOnlineApplication = ({ captchaCode }) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();
  const [captcha, setCaptcha] = useState([]);
  const [phone, setPhone] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);
  const [showDiv1, setShowDiv1] = useState(true);
  const [showDiv2, setShowDiv2] = useState(false);

  // sms waiting time counter

  // phone mask
  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const phoneParser = value => {
    // Remove all non-digit characters from the input value
    const digits = value.replace(/\D/g, "");
    return digits;
  };

  // get captcha
  useEffect(() => {
    getCaptchaFunction();
  }, []);

  const getCaptchaFunction = () => {
    (async () => {
      let params = {};
      const res = await getCaptchaApi(params);
      setCaptcha(res?.data);
    })();
  };

  const onFinish = async values => {
    try {
      setLoader(true);
      formRef.current.resetFields(["code"]);
      const formData = new FormData();
      formData.append("phone", phoneParser(values.phone));
      formData.append("captcha[key]", values.key);
      formData.append("captcha[code]", values.code);

      const response = await API_V2.post(
        "/online-application/auth/send-code",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response?.data?.data?.status == 1) {
        setShowDiv1(false);
        setShowDiv2(true);
        message.success("Yuborildi");
      } else if (response?.data?.status == 0) {
        form.setFields([
          { name: ["phone"], errors: [...error?.response.data?.errors?.phone] },
        ]);
      }
    } catch (error) {
      if (!error?.response?.status) {
        setErrorMessage("Serverda uzulish!");
      } else if (error?.response?.status == 400) {
        setErrorMessage("Foydalunvchi yoki xafvsizlik kod xato!");
      } else if (error?.response?.status == 422) {
        form.setFields([
          { name: ["phone"], errors: [...error?.response.data?.errors?.phone] },
        ]);
      } else {
        setErrMsg("Tizimga kirishda xatolik!");
      }
      message.error("Telefon raqamni yuborishda xatolik!");
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const onFinish2 = async values => {
    try {
      setLoader(true);
      const formSmsData = new FormData();
      formSmsData.append("phone", phoneParser(values.phone));
      formSmsData.append("code", values.code);

      const response = await API_V2.post(
        "/online-application/auth/check-code",
        formSmsData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const onFinishFailed = error => {
    message.error(error.response.data.message);
  };

  // decode capatcha base64
  function decodeBase64Image(captchaCode) {
    if (!captchaCode) {
      return null;
    }
    const decodedString = atob(captchaCode);
    const bytes = new Array(decodedString.length);

    for (let i = 0; i < decodedString.length; i++) {
      bytes[i] = decodedString.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(bytes)], { type: "image/png" });
    const url = URL.createObjectURL(blob);

    return url;
  }

  // set captcha image
  const captchaImage = captcha?.image;
  const imageUrl = decodeBase64Image(captchaImage);

  // set captcha key
  useEffect(() => {
    form.setFieldsValue({
      key: captcha?.key,
    });
  }, [captcha]);

  return (
    <Spin spinning={loader}>
      {showDiv1 && (
        <div
          className="registration-page"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <Form
            form={form}
            ref={formRef}
            name="registration-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <div className="registration-image">
              <RiAccountPinCircleLine
                style={{ color: "#005ed0", fontSize: "24px" }}
              />
              <Divider orientation="center" className="text-dark font-size-18">
                {t("Online ro'yxatdan o'tish")}
              </Divider>
              <p>
                {t(
                  "Login parolni olish uchun tizimga telefon raqamingizni kiritng!"
                )}
              </p>
            </div>
            {/* telefon raqam */}
            <Form.Item
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: `${t("Telefon raqamingizni kiriting!")}`,
                },
              ]}
              name={"phone"}
              label={"Telefon raqamingiz"}
            >
              <ReactInputMask
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998("
                className="registration-form-number ant-input"
                mask="+\9\9\8(99) 999 99 99"
                maskChar="_"
              />
            </Form.Item>
            {/* capcha rasm kodi */}
            <Form.Item
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: `${t(
                    "Rasmda ko'rsatilgan xavfsizlik kodini kiriting!"
                  )}`,
                },
              ]}
              name={"code"}
              label={"Xavfsizlik kodi"}
              className="m-0 p-0"
            >
              <Input
                placeholder="rasmdagi xavfsizlik kodi"
                onChange={e => {
                  setIsFormComplete(!!phone && !!e.target.value);
                }}
              />
            </Form.Item>
            {/* captcha key */}
            <Form.Item
              style={{ width: "100%" }}
              name={"key"}
              label={"kaptcha kaliti"}
              className="m-0 p-0 d-none"
            >
              <Input placeholder="captcha key" />
            </Form.Item>
            {/* capcha image */}
            <div className="d-flex justify-content-around align-items-center my-3">
              <img src={imageUrl} alt="captcha" />
              <span style={{ color: "#bfbfbf" }}>
                Xavfsizlik kodi{" "}
                <i
                  class="fas fa-redo-alt"
                  style={{ cursor: "pointer" }}
                  onClick={getCaptchaFunction}
                ></i>
              </span>
            </div>
            <Button
              onClick={getCaptchaFunction}
              type="primary"
              htmlType="submit"
              className="w-100"
              disabled={!isFormComplete}
            >
              {t("Yuborish")}
            </Button>

            <Button
              onClick={() => history.goBack()}
              className="registration-form-back my-3 p-0 m-0"
              type="link"
            >
              <i class="fas fa-arrow-left mr-1"> </i>
              <span>qaytish</span>
            </Button>
          </Form>
        </div>
      )}

      {/* sms code page */}
      {showDiv2 && (
        <div
          className="registration-page"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <Form
            form={form2}
            name="registration-form"
            initialValues={{ remember: true }}
            onFinish={onFinish2}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <div className="registration-image">
              <div>
                <i
                  class="bx bx-message-detail bx-tada"
                  style={{ color: "#005ed0", fontSize: "24px" }}
                ></i>
              </div>

              <p className="font-size-16 text-dark">
                {t("Telefon raqamingizga borgan tekshiruv kodini kiritng!")}
              </p>
            </div>

            {/* telefon raqam */}
            <div className="text-center text-secondary">
              <span></span> <p>{phone}</p>
            </div>
            <Form.Item
              style={{ width: "100%" }}
              name={"phone"}
              className="m-0 p-0 d-none"
            >
              <Input placeholder="telefon raqam" />
            </Form.Item>

            {/* sms kodi */}
            <Form.Item
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: `${t(
                    "Rasmda ko'rsatilgan xavfsizlik kodini kiriting!"
                  )}`,
                },
              ]}
              name={"code"}
            >
              <Input placeholder="sms kodni kiriting" />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-100">
              {t("Yuborish")}
            </Button>
          </Form>
        </div>
      )}
    </Spin>
  );
};

export default studentOnlineApplication;
