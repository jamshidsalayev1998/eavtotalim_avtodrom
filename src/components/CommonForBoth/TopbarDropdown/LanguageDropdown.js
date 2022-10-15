import React, { useContext, useEffect, useState } from "react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import { get, map } from "lodash"
import { withTranslation } from "react-i18next"
import axios from 'axios';
//i18n
import i18n from "../../../i18n"
import languages from "common/languages"
import { PATH_PREFIX } from "Utils/AppVariables";
import MainContext from "Context/MainContext";

const LanguageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const { setI18 } = useContext(MainContext);
  const [selectedLang, setSelectedLang] = useState("")
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE")
    setSelectedLang(currentLanguage)
  }, [])

  const changeLanguageAction = lang => {
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append('app_lang', lang)
    axios({
      url: PATH_PREFIX + "/change-lang-for-user",
      method: "POST",
      params: {
        'token': token
      },
      data: formdata
    }).then((response) => {
      i18n.changeLanguage(lang)
      setI18(lang)
      localStorage.setItem("I18N_LANGUAGE", lang)
      setSelectedLang(lang)
    })
  }

  const toggle = () => {
    setMenu(!menu)
  }

  return (
    <>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect" tag="button">
          <img
            src={get(languages, `${selectedLang}.flag`)}
            alt="intalim"
            height="16"
            className="mr-1"
          />
          <span className="align-middle">
            {get(languages, `${selectedLang}.label`)}
          </span>
        </DropdownToggle>
        <DropdownMenu className="language-switch" right>
          {map(Object.keys(languages), key => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${selectedLang === key ? "active" : "none"
                }`}
            >
              <img
                src={get(languages, `${key}.flag`)}
                alt="inta'lim"
                className="mr-1"
                height="12"
                style={{ width: '18.28px' }}
              />
              <span className="align-middle">
                {get(languages, `${key}.label`)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default withTranslation()(LanguageDropdown)
