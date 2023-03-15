import React, { useContext, useEffect, useState } from "react";
import faceShape from "assets/images/face-recognition/face-id-animation.png";
import {
  checkByComputerKey,
  faceRecognition,
  loginByComputerKey,
} from "../../../../services/api_services/auth/login_computer_api";
import { PATH_PREFIX_FILE } from "../../../../Utils/AppVariables";
import { Button, message, Result, notification, Alert } from "antd";
import MainContext from "../../../../Context/MainContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AiOutlineEnter, AiFillCheckCircle } from "react-icons/ai";
import { BsFillFileEarmarkMedicalFill, BsFillWebcamFill } from "react-icons/bs";
import Webcam from "react-webcam";
import "./style.css";
import { MdOutlinePortrait } from "react-icons/md";
import { BiCameraHome, BiErrorCircle, BiGlassesAlt } from "react-icons/bi";
import { TbHandClick } from "react-icons/tb";
import GoBackWithText from "components/Common/GoBackWithText";
import defaultLogo from "assets/images/logo-blue-big.png";
import { Card } from "reactstrap";

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
  const [visible, setVisible] = useState(false);
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
          setPicture("");
          setVisible(true);
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
          setPicture("");
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setPicture("");
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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
          setVisible(true);
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

  navigator.mediaDevices
    .enumerateDevices()
    .then(devices => {
      const cameras = devices.filter(device => device.kind === "videoinput");
      if (cameras.length === 0) {
        notification.open({
          message: (
            <span className="text-danger d-flex justify-content-start align-items-center">
              <i class="bx bxs-webcam text-dark"></i>
              <span className="px-1">Kamera mavjud emas</span>
            </span>
          ),
          description: "Yuzni aniqlash uchun kamera qurilmasi ulanmagan",
          placement: "top",
        });
      } else {
        notification.open({
          message: (
            <span className="text-success d-flex justify-content-start align-items-center">
              <i class="bx bxs-webcam text-dark"></i>
              <span className="px-1">Kamera bog'andi</span>
            </span>
          ),
          description: "Kamera muvaffaqiyatli ulandi",
          placement: "top",
        });
      }
    })
    .catch(error => {
      notification.open({
        message: (
          <span className="text-danger d-flex justify-content-start align-items-center">
            <i class="bx bxs-webcam text-dark"></i>
            <span className="px-1">Kameraga ulanishda xatolik</span>
          </span>
        ),
        description: "Qurilmaga ulanishda xatolik",
        placement: "top",
      });
    });

  return (
    <div className="face-id-wrapper" onKeyDown={handleKeyBtn} tabIndex={"1"}>
      <div className="face-id">
        <div className="d-flex align-items-start">
          <GoBackWithText
            contentTitle={
              <span className={`${computer ? "" : ""} px-3 py-3 computer-test`}>
                {computer?.examination_area?.logo ? (
                  <img
                    style={{ width: "150px" }}
                    src={PATH_PREFIX_FILE + computer?.examination_area?.logo}
                    alt=""
                  />
                ) : (
                  <img style={{ width: "150px" }} src={defaultLogo} alt="" />
                )}
              </span>
            }
          />
          {/* computer order */}
          <div className={"computer-order"}>
            {computerKey && computer ? (
              <Card className={"computer"}>
                <h1>{computer ? computer?.order : ""}</h1>
              </Card>
            ) : (
              <Card className={"computer"}>
                <strong className="text-warning">Tanlanmagan!</strong>
              </Card>
            )}
          </div>
        </div>

        {/* face recognition */}
        {computerKey && computer ? (
          <div className={"web-camera"}>
            <div className={picture ? "scanning" : " camera-frame"}>
              {/*take picture*/}

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

              <p className="d-none">Yuz tekshirilmoqda...</p>
            </div>

            <div
              className=" camera-info"
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
                      Yuzni tekshirish
                    </span>{" "}
                    tugmasini bosing.
                  </span>
                  <TbHandClick style={{ fontSize: "21px" }} />
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={"button-check-face"}>
          {computerKey && computer ? (
            <button
              className={"btn d-flex text-white justify-content-center"}
              onClick={
                faceRecognitionKey ? loginByComputer : takePictureAndRecognition
              }
              style={{
                backgroundColor: "#005ED0",
                minWidth: "800px",
              }}
              autoFocus
            >
              <span style={{ fontSize: "36px" }}>
                {faceRecognitionKey ? "Testni boshlash" : "Yuzni tekshirish"}
              </span>{" "}
              <span
                className={"functional_key ml-3 "}
                style={{ width: "auto" }}
              >
                Enter <AiOutlineEnter />
              </span>
            </button>
          ) : (
            <Card className="upload-key">
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
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      fontSize: "16px",
                    }}
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
            </Card>
          )}
        </div>

        {visible && (
          <Alert
            style={{
              borderRadius: "8px",
              position: "absolute",
              bottom: "14px",
              left: "14px",
              right: "14px",
              margin: "auto",
            }}
            message="Yuzni tanishda xatolik sodir bo'lsa, kompyuterga biriktirilgan o'quvchi ma'lumotlarini tekshirib qayta urinib ko'ring!!!"
            type="warning"
            showIcon
          />
        )}
      </div>
    </div>
  );
};
export default ComputerSettingsPage;
