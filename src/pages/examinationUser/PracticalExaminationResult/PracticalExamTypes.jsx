import React, {useState} from "react";
import {useHistory} from "react-router";
import "../../examResults/style.scss"
import Image1 from "../../../assets/images/intalim-avtodrom/90 daraja burilish.jpg"
import Image2 from "../../../assets/images/intalim-avtodrom/Aylanma yo'l.jpg"
import Image3 from "../../../assets/images/intalim-avtodrom/Finish.jpg"
import Image4 from "../../../assets/images/intalim-avtodrom/Notekis yo'l.jpg"
import Image5 from "../../../assets/images/intalim-avtodrom/Parkovka.jpg"
import Image6 from "../../../assets/images/intalim-avtodrom/Piyodalar o'tish joyi.jpg"
import Image7 from "../../../assets/images/intalim-avtodrom/Sakkizsimon yo'l.jpg"
import Image8 from "../../../assets/images/intalim-avtodrom/Sirpanchiq yo'l.jpg"
import Image9 from "../../../assets/images/intalim-avtodrom/Start.jpg"
import Image10 from "../../../assets/images/intalim-avtodrom/Tartibga solingan chorraxa.jpg"
import Image11 from "../../../assets/images/intalim-avtodrom/Temir yo'l.jpg"
import Image12 from "../../../assets/images/intalim-avtodrom/Tonnel.jpg"
import Image13 from "../../../assets/images/intalim-avtodrom/Tor joyda qayrilib olish.jpg"
import Image14 from "../../../assets/images/intalim-avtodrom/Yo'lning balandlik va pastlik qismi (Estakada).jpg"
import Image15 from "../../../assets/images/intalim-avtodrom/Yo'lning egrilik qismi.jpg"
import Image16 from "../../../assets/images/intalim-avtodrom/Yo'lning yarim qiyaligi.jpg"
import {Modal} from 'antd';

const PracticalExamTypes = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const history = useHistory();

    let data = [
        {
            title: '90 daraja burilish',
            image: Image1,
        },
        {
            title: "Aylanma yo'l",
            image: Image2,
        },
        {
            title: 'Finish',
            image: Image3,
        },
        {
            title: "Notekis yo'l",
            image: Image4,
        },
        {
            title: 'Parkovka',
            image: Image5,
        },
        {
            title: "Piyodalar o'tish joyi",
            image: Image6,
        },
        {
            title: "Sakkizsimon yo'l",
            image: Image7,
        },
        {
            title: "Sirpanchiq yo'l",
            image: Image8,
        },
        {
            title: 'Start',
            image: Image9,
        },
        {
            title: 'Tartibga solingan chorraxa',
            image: Image10,
        },
        {
            title: "Temir yo'l",
            image: Image11,
        },
        {
            title: 'Tonnel',
            image: Image12,
        },
        {
            title: 'Tor joyda qayrilib olish',
            image: Image13,
        },
        {
            title: "Yo'lning balandlik va pastlik qismi (Estakada)",
            image: Image14,
        },
        {
            title: "Yo'lning egrilik qismi",
            image: Image15,
        },
        {
            title: "Yo'lning yarim qiyaligi",
            image: Image16,
        },
    ]
    return (
        <div className="page-content">
            <div className="head-items-bar d-flex justify-content-between">
                <div className="d-flex">
                   <span className="mr-3" style={{fontSize:'20px', cursor:'pointer',fontWeight:'bold'}} onClick={() => history.goBack()}>
                                    <i className="bx bx-arrow-back"> </i>
                                  </span>
                    <h4>{props?.location?.state?.fio}</h4>
                </div>
                {/*<h4>SomeThing</h4>*/}
                {/*<button className="btn btn-secondary" onClick={() => setIsModalVisible(true)}>Result Submit</button>*/}
            </div>
            <div className="mt-3">
                <div className="row">
                    {
                        data.map((element, index) => {
                            return (
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mb-1">
                                                <div className="col-5">
                                                    <img src={element?.image} className="w-100" alt=""/>
                                                </div>
                                                <div className="col-7 d-flex align-items-center">
                                                    <h5>{element?.title}</h5>
                                                </div>
                                            </div>
                                            <button className="btn btn-success accept_button">Qabul qilish</button>
                                            <button className="btn btn-info reject_button">Bekor qilish</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={() => setIsModalVisible(false)}
                   onCancel={() => setIsModalVisible(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
export default PracticalExamTypes