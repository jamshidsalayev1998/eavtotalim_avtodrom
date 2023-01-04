import React, { Fragment, useContext, useEffect, useState } from "react";
import logoImg from "assets/images/logo-blue-big.png";
import faceShape from "assets/images/face-recognition/face-id-animation.png";
import faceShapeSuccess from "assets/images/face-recognition/face-shape-success.png";
import faceShapeDanger from "assets/images/face-recognition/face-shape-danger.png";
import {
  checkByComputerKey,
  faceRecognition,
  loginByComputerKey,
} from "../../../../services/api_services/auth/login_computer_api";
import { PATH_PREFIX_FILE } from "../../../../Utils/AppVariables";
import {
  Button,
  Empty,
  message,
  Result,
  notification,
  Space,
  Alert,
} from "antd";
import MainContext from "../../../../Context/MainContext";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
  AiOutlineLeft,
  AiOutlineDesktop,
  AiOutlineEnter,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import Webcam from "react-webcam";
import "./style.css";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { MdOutlinePortrait } from "react-icons/md";
import { BiCameraHome, BiErrorCircle, BiGlassesAlt } from "react-icons/bi";
import { TbHandClick } from "react-icons/tb";

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 600,
  height: 600,
  facingMode: "user",
};

const ComputerSettingsPage = () => {
  const [computerKey, setComputerKey] = useState(
    localStorage.getItem("computer_key")
  );
  const [computer, setComputer] = useState(undefined);
  const history = useHistory();
  const [faceRecognitionKey, setFaceRecognitionKey] = useState(
    localStorage.getItem("face_recognition_key")
  );
  const [picture, setPicture] = useState("");
  const [loadingRecognition, setLoadingRecognition] = useState(false);
  const webcamRef = React.useRef(null);
  const faceRecognitionFunction = React.useCallback(() => {
    setLoadingRecognition(true);
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    if (computer && computerKey) {
      (async () => {
        const data = new FormData();
        data.append("computer_key", computerKey);
        data.append("image", pictureSrc);
        const resp = await faceRecognition(data);
        if (parseInt(resp?.result_code) === 1) {
          if (resp?.response_id) {
            setFaceRecognitionKey(resp?.response_id);
            localStorage.setItem("face_recognition_key", resp?.response_id);
            // message.success(resp?.result_note);
            notification.open({
              message: (
                <span className="text-success d-flex justify-content-start align-items-center">
                  <AiFillCheckCircle />{" "}
                  <span className="px-1">Ma'lumotlar tasdiqlandi</span>
                </span>
              ),
              description: "Imtihonga kirish mumkin",
            });
            setLoadingRecognition(false);
            loginByComputer();
          }
        } else if (parseInt(resp?.result_code) === 2) {
          // message.error("Pasrtpo malumotlari noto'g'ri kiritilgan");
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Xatolik yuz berdi</span>
              </span>
            ),
            description: "Pasport ma'lumotlari noto'g'ri kiritilgan",
          });
        } else if (parseInt(resp?.result_code) === 3) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Xatolik yuz berdi</span>
              </span>
            ),
            description: "Yuz ma'lumoti yorug'lik darajasi past",
          });
        } else if (parseInt(resp?.result_code) === 4) {
          // message.error('Pasport malumotlari bilan mos tushmadi');
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">Xatolik</span>
              </span>
            ),
            description: "Pasport ma'lumotlari bilan mos tushmadi",
          });
        } else if (parseInt(resp?.result_code) === 5) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">Xatolik</span>
              </span>
            ),
            description: "Bog'langan qurilma ishlashida xatolik",
          });
        } else if (parseInt(resp?.result_code) === 6) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">Xatolik</span>
              </span>
            ),
            description: "Bunday foydalanuvchi mavjud emas!",
          });
        } else if (parseInt(resp?.result_code) === 7) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Rasmni olishda xatolik</span>
              </span>
            ),
            description: "Olingan rasm tekshirish uchun yaroqsiz",
          });
        } else if (parseInt(resp?.result_code) === 9) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Ma'lumot vaqtida xatolik</span>
              </span>
            ),
            description: "Vazifani bajarish muddati tugadi",
          });
        } else if (parseInt(resp?.result_code) === 10) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">Xatolik</span>
              </span>
            ),
            description: "Navbatdagi vazifani kutish vaqti tugadi",
          });
        } else if (parseInt(resp?.result_code) === 11) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">So'rovni yuborishda xatolik</span>
              </span>
            ),
            description: "Qaytadan xarakat qilib ko'ring!",
          });
        } else if (parseInt(resp?.result_code) === 14) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Yuzni aniqlashda xatolik</span>
              </span>
            ),
            description: "Yuzni aniqlashda muammolik",
          });
        } else if (parseInt(resp?.result_code) === 17) {
          // message.error('Yuzingizni kameraga to`g`ri tuting');
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">Xatolik</span>
              </span>
            ),
            description: "Yuzingizni kameraga to`g`ri tuting",
          });
        } else if (parseInt(resp?.result_code) === 18) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">So'rovda xatolik</span>
              </span>
            ),
            description: "Jarayonni davom ettirib bo'lmaydi",
          });
        } else if (parseInt(resp?.result_code) === 19) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Yuzni tanishda xatolik</span>
              </span>
            ),
            description: "Yuzni tanish so'rovini davom ettirib bo'lmaydi",
          });
        } else if (parseInt(resp?.result_code) === 20) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Olingan rasmda xatolik</span>
              </span>
            ),
            description: "Olingan rasm sifati past",
          });
        } else if (parseInt(resp?.result_code) === 21) {
          // message.error("Yuzingiz kameraga to'liq ko'rinsin");
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">Xatolik</span>
              </span>
            ),
            description: "Yuzingiz kameraga to`iq ko`rinsin",
          });
        } else if (parseInt(resp?.result_code) === 22) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Bir necha yuzlar aniqlandi</span>
              </span>
            ),
            description: "Olingan rasmda bir necha yuz aniqlandi",
          });
        } else if (parseInt(resp?.result_code) === 23) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Rasm rangida xatolik</span>
              </span>
            ),
            description: "Talab qilinadigan rasm rangli bo'lishi kerak",
          });
        } else if (parseInt(resp?.result_code) === 24) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Yuzda taqinchoqlar aniqlandi</span>
              </span>
            ),
            description: "Ko'zingizda qoraytirilgan ko'zoynaklar aniqlandi",
          });
        } else if (parseInt(resp?.result_code) === 25) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Rasm sifatida xatolik</span>
              </span>
            ),
            description: "Olingan rasm tekshirish uchun mos emas",
          });
        } else if (parseInt(resp?.result_code) === 26) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">Xatolik</span>
              </span>
            ),
            description: "Ko'zlar yumiq yoki to'silgan",
          });
        } else if (parseInt(resp?.result_code) === 27) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle /> <span className="px-1">Xatolik</span>
              </span>
            ),
            description: "Boshingizni to'g'ri tuting",
          });
        } else if (parseInt(resp?.result_code) === 28) {
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <span className="px-1">Yuzni aniqlashda xatolik</span>
              </span>
            ),
            description: "Yuzni aniqlab bo'lmadi",
          });
        } else if (parseInt(resp?.status) === 0) {
          // message.error(resp?.message);
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <spa className="px-1" n>
                  Xatolik
                </spa>
              </span>
            ),
            description: resp?.message,
          });
        } else {
          // message.error("Mos emas");
          setPicture("");
          notification.open({
            message: (
              <span className="text-danger d-flex justify-content-start align-items-center">
                <BiErrorCircle />{" "}
                <spa className="px-1" n>
                  Xatolik
                </spa>
              </span>
            ),
            description: "Mos emas",
          });
        }
      })();
    }
  });

  const {
    setAuth,
    setRole,
    setRegion_id,
    setCategory_id,
    setUserType,
    setIsStudent,
    additional,
    setAdditional,
  } = useContext(MainContext);
  useEffect(() => {
    checkCompKey();
    // camera.startCamera();
  }, []);

  const loginByComputer = () => {
    if (computer && computerKey) {
      (async () => {
        const data = new FormData();
        data.append("computer_key", computerKey);
        data.append(
          "face_recognition_key",
          localStorage.getItem("face_recognition_key")
        );
        const resp = await loginByComputerKey(data);
        if (parseInt(resp?.status) === 1) {
          if (resp?.access_token) {
            const token = resp.access_token;
            localStorage.setItem("token", token);
            localStorage.setItem("user_profile_name", resp?.user?.name);
            setAuth(true);
            setRole(String(resp?.user?.role));
            setRegion_id(String(resp?.user?.profession?.region_id));
            setUserType(String(resp?.user?.online));
            history.push("/");
          }
        } else if (parseInt(resp?.status) === 0) {
          message.error(resp?.message);
        } else if (
          parseInt(resp?.status) === 3 ||
          parseInt(resp?.status) === 2
        ) {
          message.error("Yuz orqali identifikatsiya qiling");
          setFaceRecognitionKey("");
          localStorage.removeItem("face_recognition_key");
        }
      })();
    }
  };

  const checkCompKey = () => {
    if (computerKey) {
      (async () => {
        const resp = await checkByComputerKey(computerKey);
        if (parseInt(resp?.status) === 1) {
          setComputer(resp?.data);
        }
      })();
    }
  };
  const handleKeyBtn = event => {
    event.preventDefault();
    if (event?.keyCode === 13) {
      if (faceRecognitionKey) {
        loginByComputer();
      } else {
        takePictureAndRecognition();
      }
    }
  };
  const takePictureAndRecognition = () => {
    faceRecognitionFunction();
  };

  return (
    <div onKeyDown={handleKeyBtn} tabIndex={"1"}>
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          position: "relative",
          background: "#fff",
        }}
      >
        {/* company logo */}
        <div className={"d-flex justify-content-end"}>
          <div className={"w-100 d-flex justify-content-between px-1"}>
            {/* company logo */}
            <div>
              <span className={`${computer ? "" : ""} px-3 py-3 computer-test`}>
                {computer?.examination_area?.logo ? (
                  <img
                    style={{ width: "150px" }}
                    src={PATH_PREFIX_FILE + computer?.examination_area?.logo}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
        </div>

        {/* computer order */}
        <div className={"d-flex justify-content-end align-items-center"}>
          {computerKey && computer ? (
            <div className={"d-flex justify-content-center align-items-center"}>
              <AiOutlineDesktop
                className="text-success"
                style={{ fontSize: "200px", color: "#bfbfbf" }}
              />
              <h1
                className={`${
                  computer ? "rounded" : ""
                } px-5 position-absolute text-success`}
                style={{ color: "#bfbfbf", fontSize: "70px" }}
              >
                {computer ? computer?.order : ""}
              </h1>
            </div>
          ) : (
            <div className={"d-flex justify-content-center align-items-center"}>
              <AiOutlineDesktop
                className="text-warning"
                style={{ fontSize: "200px" }}
              />
              <span
                className={`${
                  computer ? "rounded" : ""
                } px-5 position-absolute text-secondary`}
              >
                <strong className="text-warning">Tanlanmagan!!!</strong>
              </span>
            </div>
          )}
        </div>

        {/* face recognition */}
        {computerKey && computer ? (
          <div
            className={"d-flex justify-content-center align-items-center"}
            style={{ height: "400px" }}
          >
            <div
              className={picture ? "scanning" : "border"}
              style={{ width: "400px", height: "400px" }}
            >
              {/*take picture*/}
              <div>
                <div style={{ position: "relative" }}>
                  <div
                    className={"face-shape-box  "}
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: "220px",
                      height: "220px",
                      zIndex: "100000",
                    }}
                  >
                    <img
                      src={faceShape}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  {computerKey && computer && picture == "" ? (
                    <>
                      <Webcam
                        style={{ borderRadius: "4px", width: "100%" }}
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        mirrored={true}
                      />
                    </>
                  ) : (
                    <img style={{ borderRadius: "4px" }} src={picture} />
                  )}
                </div>
              </div>
              <p className="d-none">Yuz tekshirilmoqda...</p>
            </div>

            <div
              className="border p-3 justify-content-between"
              style={{
                width: "400px",
                height: "400px",
              }}
            >
              <div>
                <h4
                  style={{
                    color: "#1F1F1F",
                    textAlign: "center",
                  }}
                >
                  Yuzni tanish paneli
                </h4>
                <p className="d-flex justify-content-between align-items-center">
                  <span>1. Yuzingizni panel ichidagi shaklda tuting </span>
                  <MdOutlinePortrait style={{ fontSize: "22px" }} />
                </p>
                <p className="d-flex justify-content-between align-items-center">
                  <span>2. Ko'zaynaklaringiz bo'lsa ularni yechib qo'ying</span>
                  <BiGlassesAlt style={{ fontSize: "22px" }} />
                </p>
                <p className="d-flex justify-content-between align-items-center">
                  <span>3. Kameraga qarang</span>{" "}
                  <BiCameraHome style={{ fontSize: "22px" }} />
                </p>
                <p className="d-flex justify-content-between align-items-center">
                  <span>
                    4. Pastdagi{" "}
                    <span className="text-white bg-primary p-1 rounded">
                      Tekshirish
                    </span>{" "}
                    tugmasini bosing.
                  </span>
                  <TbHandClick style={{ fontSize: "21px" }} />
                </p>
              </div>

              <Alert
                style={{ borderRadius: "8px", marginTop: "30px" }}
                message="Yuzni tanishda xatolik sodir bo'lsa, kompyuterga biriktirilgan o'quvchi ma'lumotlarini tekshirib qayta urinib ko'ring!!!"
                type="warning"
                showIcon
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={"text-center mt-2  d-flex justify-content-center"}>
          {computerKey && computer ? (
            <button
              className={"py-1 btn d-flex text-white justify-content-center"}
              onClick={
                faceRecognitionKey ? loginByComputer : takePictureAndRecognition
              }
              style={{
                backgroundColor: "#005ED0",
                minWidth: "800px",
              }}
              autoFocus
            >
              <span style={{ fontSize: "34px" }}>
                {faceRecognitionKey ? "Testni boshlash" : "Tekshirish"}
              </span>{" "}
              <span
                className={"functional_key ml-3 "}
                style={{ width: "auto" }}
              >
                Enter <AiOutlineEnter />
              </span>
            </button>
          ) : (
            <div
              style={{
                border: "1px solid #FFE58F",
                backgroundColor: "#FFFBE6",
                borderRadius: "8px",
              }}
              className="p-3"
            >
              <Result
                className="p-0"
                status="warning"
                title={
                  <span className="text-warning">
                    Kompyuterga kalit fayl yuklanmagan !!!
                  </span>
                }
                extra={
                  <Button
                    style={{ width: "100%", borderRadius: "8px" }}
                    type="dashed"
                    danger
                  >
                    <Link to={"/computer-config-settings"}>
                      Kalitni yuklash{" "}
                      <BsFillFileEarmarkMedicalFill className="font-size-18 text-warning" />
                    </Link>
                  </Button>
                }
              />
            </div>
          )}
        </div>

        <Link
          className="fixed-bottom m-3 d-flex align-items-center"
          style={{ fontSize: "24px", width: "100px" }}
          to={"/login"}
        >
          <FaArrowLeft style={{ fontSize: "20px", width: "100px" }} />
          <span className="p-1">Qaytish</span>
        </Link>
      </div>
    </div>
  );
};
export default ComputerSettingsPage;
