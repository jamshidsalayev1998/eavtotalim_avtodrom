import React, {Fragment, useContext, useEffect, useState} from "react";
import logoImg from "assets/images/logo-blue-big.png";
import {
    checkByComputerKey, faceRecognition,
    loginByComputerKey,
} from "../../../../services/api_services/auth/login_computer_api";
import {PATH_PREFIX_FILE} from "../../../../Utils/AppVariables";
import {Button, Empty, message, Result} from "antd";
import MainContext from "../../../../Context/MainContext";
import {useHistory} from "react-router";
import {Link, NavLink} from "react-router-dom";
import {
    AiOutlineLeft,
    AiOutlineDesktop,
    AiOutlineEnter,
} from "react-icons/ai";
import {BsFillFileEarmarkMedicalFill} from "react-icons/bs";
import Webcam from 'react-webcam'

const WebcamComponent = () => <Webcam/>
const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: 'user',
}

const ComputerSettingsPage = () => {
    const [computerKey, setComputerKey] = useState(
        localStorage.getItem("computer_key")
    );
    const [computer, setComputer] = useState(undefined);
    const history = useHistory();
    const [faceRecognitionKey, setFaceRecognitionKey] = useState(localStorage.getItem('face_recognition_key'))
    const [picture, setPicture] = useState('')
    const [loadingRecognition , setLoadingRecognition] = useState(false);
    const webcamRef = React.useRef(null)
    const faceRecognitionFunction = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setPicture(pictureSrc)
         if (computer && computerKey) {
            (async () => {
                const data = new FormData();
                data.append("computer_key", computerKey);
                data.append("image", pictureSrc);
                const resp = await faceRecognition(data);
                if (parseInt(resp?.status) === 1) {
                    if (resp?.face_recognition_key) {
                        setFaceRecognitionKey(resp?.face_recognition_key)
                        localStorage.setItem('face_recognition_key',resp?.face_recognition_key)
                    }
                } else if (parseInt(resp?.status) === 0) {
                    message.error(resp?.message);
                    setPicture('')
                }
            })();
        }
    })
    console.log('pic', picture)

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
                data.append("face_recognition_key", localStorage.getItem('face_recognition_key'));
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
                } else if (parseInt(resp?.status) === 3 || parseInt(resp?.status) === 2) {
                    message.error('Yuz orqali identifikatsiya qiling')
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
            if (faceRecognitionKey){
                loginByComputer();

            }
            else{
                takePictureAndRecognition();
            }
        }
    };
    const takePictureAndRecognition = () => {
        faceRecognitionFunction();
    }


    return (
        <div onKeyDown={handleKeyBtn} tabIndex={"1"}>
            <div
                style={{
                    width: "100vw",
                    minHeight: "100vh",
                    position: "relative",
                    backgroundColor: "#fff",
                }}
            >
                <div className={"d-flex justify-content-end "}>
                    <div className={" w-100 d-flex justify-content-between px-1"}>
                        {/* company logo */}
                        <div>
              <span className={`${computer ? "" : ""} px-3 py-3 computer-test`}>
                {computer?.examination_area?.logo ? (
                    <img
                        style={{width: "200px"}}
                        src={PATH_PREFIX_FILE + computer?.examination_area?.logo}
                        alt=""
                    />
                ) : (
                    ""
                )}
              </span>
                        </div>

                        {/* computer order */}
                        <div className={"d-flex justify-content-center align-items-center"}>
                            {computerKey && computer ? (
                                <div
                                    className={"d-flex justify-content-center align-items-center"}
                                >
                                    <AiOutlineDesktop
                                        style={{fontSize: "200px", color: "#bfbfbf"}}
                                    />
                                    <h1
                                        className={`${
                                            computer ? "rounded" : ""
                                        } px-5 position-absolute`}
                                        style={{color: "#bfbfbf"}}
                                    >
                                        {computer ? computer?.order : ""}
                                    </h1>
                                </div>
                            ) : (
                                <div
                                    className={"d-flex justify-content-center align-items-center"}
                                >
                                    <AiOutlineDesktop
                                        className="text-warning"
                                        style={{fontSize: "200px"}}
                                    />
                                    <span
                                        className={`${
                                            computer ? "rounded" : ""
                                        } px-5 position-absolute text-secondary`}
                                    >
                    <strong>Tanlanmagan!!!</strong>
                  </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={"d-flex justify-content-center align-items-center"}>
                    <div>
                        <div className={"text-center"}>
                            <img src={logoImg} style={{width: "50%"}} alt=""/>
                        </div>
                        <div className={"text-center"}>
                            {/*take picture*/}
                            <div>
                                <div className={'p-2'}>
                                    {picture == '' ? (
                                        <Webcam
                                            style={{borderRadius: '20px'}}
                                            audio={false}
                                            height={400}
                                            ref={webcamRef}
                                            width={400}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={videoConstraints}
                                        />
                                    ) : (
                                        <img style={{borderRadius: '20px'}} src={picture}/>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={"text-center mt-2  d-flex justify-content-center"}>
                            {computerKey && computer ? (
                                <button
                                    className={
                                        " w-50 py-1 btn d-flex text-white justify-content-center"
                                    }
                                    onClick={faceRecognitionKey ? loginByComputer : takePictureAndRecognition}
                                    style={{backgroundColor: "#005ED0", borderRadius: "10px"}}
                                    autoFocus
                                >
                                    <span style={{fontSize: "35px"}}>{
                                        faceRecognitionKey ? 'Testni boshlash' :'Boshlash'
                                    }</span>{" "}
                                    <span
                                        className={"functional_key ml-3 "}
                                        style={{width: "auto"}}
                                    >
                                        Enter <AiOutlineEnter/>
                                      </span>
                                </button>
                            ) : (
                                <div>
                                    <Result
                                        className="p-0"
                                        status="warning"
                                        title={
                                            <span className="text-danger">
                        Kompyuterga kalit fayl yuklanmagan !!!
                      </span>
                                        }
                                        extra={
                                            <Button type="dashed" danger>
                                                <Link to={"/computer-config-settings"}>
                                                    Kalitni yuklash{" "}
                                                    <BsFillFileEarmarkMedicalFill
                                                        className="font-size-18 text-warning"/>
                                                </Link>
                                            </Button>
                                        }
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                <Link
                    className="fixed-bottom m-3 d-flex align-items-center"
                    style={{fontSize: "20px", width: "120px"}}
                    to={"/login"}
                >
                    <AiOutlineLeft/>
                    <span className="p-1">Login</span>
                </Link>
            </div>
        </div>
    );
};
export default ComputerSettingsPage;
