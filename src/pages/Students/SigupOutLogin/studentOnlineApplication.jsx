import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { Form, Button, Divider, Spin, Input, message, Modal } from "antd";
import "./style.scss";
import { getCaptchaApi } from "services/api_services/online_applications/online_application_api";
import axios from "axios";
import { PATH_PREFIX_V2 } from "Utils/AppVariables";
import ReactInputMask from "react-input-mask";

const studentOnlineApplication = ({ captchaCode }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();
  const [captcha, setCaptcha] = useState([]);
  const [phone, setPhone] = useState("");

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
      const formData = new FormData();
      formData.append("phone", phoneParser(values.phone));
      formData.append("captcha[key]", values.key);
      formData.append("captcha[code]", values.code);

      const response = await axios.post(
        PATH_PREFIX_V2 + "/online-application/auth/send-code",
        formData
      );

      if (response?.data?.status === 1) {
        setLoader(false);
        message.success("Yuborildi");
      }
    } catch (error) {
      setLoader(false);
      message.error("xatolik");
    }
  };
  const onFinishFailed = error => {
    message.error("Xatolik");
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

  const [modal, contextHolder] = Modal.useModal();
  const countDown = () => {
    let secondsToGo = 5;
    const instance = modal.success({
      title: "This is a notification message",
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  return (
    <Spin spinning={loader}>
      <div
        className="registration-page"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Form
          form={form}
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
            <Input placeholder="rasmdagi xavfsizlik kodi" />
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
            <span style={{ color: "#bfbfbf" }}>Xavfsizlik kodi</span>
          </div>

          <Button
            onClick={countDown}
            type="primary"
            htmlType="submit"
            className="w-100"
          >
            {t("Yuborish")}
          </Button>
          {contextHolder}
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
      <div
        className="registration-page"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Form
          form={form}
          name="registration-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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

            <p>{t("Telefon raqamingizga borgan tekshiruv kodini kiritng!")}</p>
          </div>

          {/* telefon raqam */}
          <div className="text-center">
            <p>+99893...8496</p>
          </div>

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

          <Button
            onClick={countDown}
            type="primary"
            htmlType="submit"
            className="w-100"
          >
            {t("Yuborish")}
          </Button>
          {contextHolder}
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
    </Spin>
  );
};

export default studentOnlineApplication;
