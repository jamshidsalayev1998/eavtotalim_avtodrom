import React, { useContext } from "react";
import { Card, CardBody } from "reactstrap";
import i18n from "i18n";
import styles from "./style.module.scss";
import axios from "axios";
import MainContext from "Context/MainContext";
import usFlag from "assets/images/flags/us.jpg";
import uz from "assets/images/flags/uz.png";
import qq from "assets/images/flags/qq.jpg";
import russia from "assets/images/flags/russia.jpg";
import { useHistory } from "react-router";
import { PATH_PREFIX } from "Utils/AppVariables";
const DefaultLanguagePage = () => {
  const { setIsStudent } = useContext(MainContext);

  const history = useHistory();

  const languagesList = [
    {
      label: "O'zbekcha (lotin)",
      flag: uz,
      val: "uz",
    },
    {
      label: "Ўзбекча (кирилл)",
      flag: uz,
      val: "kiril",
    },
    {
      label: "Русский",
      flag: russia,
      val: "ru",
    },
    {
      label: "Qaraqalpaqsha",
      flag: qq,
      val: "qq",
    },

    {
      label: "English",
      flag: usFlag,
      val: "en",
    },
  ];

  const SubmitDefaultLanguage = lang => {
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("app_lang", lang);

    axios({
      url: PATH_PREFIX + "/change-lang-for-user",
      method: "POST",
      params: {
        token: token,
      },
      data: formdata,
    }).then(response => {
      if (response?.data?.status) {
        i18n.changeLanguage(lang);
        localStorage.setItem("I18N_LANGUAGE", lang);
        setIsStudent(true);
        history.push("/");
      }
    });
  };

  return (
    <div className={styles.defaultlang_page}>
      <div>
        {languagesList?.map(element => {
          return (
            <Card
              className={styles.defaultlang_box}
              key={element.val}
              onClick={() => SubmitDefaultLanguage(element.val)}
            >
              <CardBody>
                <img
                  src={element.flag}
                  alt="not found"
                  className="mr-2"
                  height="14"
                  style={{ width: "20px" }}
                />
                <span className="align-middle">{element.label}</span>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DefaultLanguagePage;
