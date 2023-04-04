import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  IS_EXAM_PROCESS,
  IS_TEST_PROCESS_SETTINGS,
  IS_REPORTS,
  IS_USERS,
  IS_SETTINGS,
} from "store/sidebar/actions";
import MainContext from "Context/MainContext";
import { useSelector, useDispatch } from "react-redux";

const ExaminationUserLinks = props => {
  const { t } = useTranslation();

  const layout = useSelector(state => state.Layout);

  const { role, user_type } = useContext(MainContext);
  const dispatch = useDispatch();
  const sidebarState = useSelector(state => state.sidebar_content);

  const toggleMenuBox = action_type => {
    dispatch({ type: action_type });
  };

  if (layout.leftMenu) {
    return (
      <React.Fragment>
        <div
          id="sidebar-menu"
          style={
            layout?.leftMenu
              ? { position: "fixed", height: "90vh", overflow: "auto" }
              : null
          }
        >
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/" className="waves-effect">
                <i className="fas fa-home" />
                <span>{t("Home")}</span>
              </Link>
            </li>
            <li>
              <Link to="/come-examination/come-groups" className="waves-effect">
                <i className="fas fa-layer-group" />
                <span>{t("Guruh bo`yicha keluvchilar")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/come-examination/allow-students"
                className="waves-effect"
              >
                <i className="fas fa-clipboard-check" />
                <span>{t("Testga ruhsat berish (Guruhlar bo`yicha)")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/come-examination/allow-students/separately"
                className="waves-effect"
              >
                <i className="fas fa-clipboard-check" />
                <span>{t("Testga ruxsat berish (O`quvchilar bo`yicha)")}</span>
              </Link>
            </li>
            <li>
              <Link to="/examination/result-groups" className="waves-effect">
                <i className="fas fa-poll-h" />
                <span>{t("Test natijasi")}</span>
              </Link>
            </li>
            {/*<li className="" name="asosiy">*/}
            {/*    <Link to="/examination/resubmit" className="waves-effect">*/}
            {/*        <i className="fa fa-retweet"/>                    {/*        <span>{t("Qayta topshirish")}</span>*/}
            {/*    </Link>*/}
            {/*</li>*/}
            <li className="" name="asosiy">
              <Link to="/examination-director/cashier" className="waves-effect">
                <i className="fa fa-money-bill" />
                <span>{t("Kassirlar")}</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-director/final-access-admin"
                className="waves-effect"
              >
                <i className="fa fa-user" />
                <span>{t("Testga ruxsat beruvchi admin")}</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-director/administrator"
                className="waves-effect"
              >
                <i className="fa fa-users" />
                <span>{t("Administrator")}</span>
              </Link>
            </li>

            <li className="" name="asosiy">
              <Link
                to="/examination-area/payment-types"
                className="waves-effect"
              >
                <i className="fa fa-credit-card" />
                <span>{t("To`lov turlari")}</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link to="/examination-area/instructors" className="waves-effect">
                <i className="fa fa-male" />
                <span>{t("Instruktorlar")}</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link to="/examination-area/cars" className="waves-effect">
                <i className="fa fa-car" />
                <span>{t("Avtomobillar")}</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link to="/examination-area/sensors" className="waves-effect">
                <i className="fa fa-camera-retro" />
                <span>{t("Sensorlar")}</span>
              </Link>
            </li>

            <li className="" name="asosiy">
              <Link
                to="/examination/display-page-index"
                className="waves-effect"
              >
                <i className="fa fa-desktop" />
                <span>{t("E`lon sahifasi")}</span>
              </Link>
            </li>

            <li className="" name="asosiy">
              <Link
                to="/examination-administrator/all-students"
                className="waves-effect"
              >
                <i className="fas fa-poll-h" />
                <span>{t("Barcha keluvchilar")}</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link to="/cashier/student-payments" className="waves-effect">
                <i className="fas fa-home" />
                <span>O`quvchilarga to`lovni tasdiqlash (Nazariy)</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/cashier/student-payments-practical"
                className="waves-effect"
              >
                <i className="fas fa-home" />
                <span>O`quvchilarga to`lovni tasdiqlash (Amaliy)</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-administrator/certificate"
                className="waves-effect"
              >
                <i className="fas fa-poll-h" />
                <span>{t("Sertifikatlar")}</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-director/examination-area-config"
                className="waves-effect"
              >
                <i className="fa fa-desktop" />
                <span>{t("Sozlamalar")}</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link to="/examination/queue-display" className="waves-effect">
                <i className="fas fa-poll-h" />
                <span>Navbat</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-director/payment-report"
                className="waves-effect"
              >
                <i className="fas fa-poll-h" />
                <span>To'lovlar hisoboti </span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-instructor/merged-students"
                className="waves-effect"
              >
                <i className="fas fa-layer-group" />
                <span>Avtomobilga biriktirilganlar</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-director/reports-by-organizations"
                className="waves-effect"
              >
                <i className="fas fa-layer-group" />
                <span>Avtomaktablar bo'yicha hisobot</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-administrator/all-online-applications"
                className="waves-effect"
              >
                <i className="fas fa-layer-group" />
                <span>Online arizalar</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {/* ASOSIY SAHIFA */}
            <li className="" name="asosiy">
              <Link to="/" className="waves-effect">
                <i className="fas fa-home" />
                <span>{t("Bosh sahifa")}</span>
              </Link>
            </li>
            {/* IMTIHON JARAYONI */}
            <li
              className="main_link_sidebar"
              name="exam_process"
              onClick={() => toggleMenuBox(IS_EXAM_PROCESS)}
            >
              {t("Imtihon jarayoni")}
              <i
                className="fas fa-chevron-right"
                style={
                  sidebarState.exam_process
                    ? { transform: "rotate(0deg)" }
                    : { transform: "rotate(90deg)" }
                }
              ></i>
            </li>
            {
              <div
                className={
                  sidebarState.exam_process
                    ? "panel-collapse panel-close"
                    : "panel-collapse"
                }
              >
                <li className="" name="asosiy">
                  <Link
                    to="/come-examination/come-groups"
                    className="waves-effect"
                  >
                    <i className="fas fa-layer-group" />
                    <span>{t("Guruh bo`yicha keluvchilar")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/come-examination/allow-students"
                    className="waves-effect"
                  >
                    <i className="fas fa-clipboard-check" />
                    <span>{t("Testga ruhsat berish (Guruhlar bo`yicha)")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/come-examination/allow-students/separately"
                    className="waves-effect"
                  >
                    <i className="fas fa-clipboard-check" />
                    <span>
                      {t("Testga ruxsat berish (O`quvchilar bo`yicha)")}
                    </span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-administrator/all-students"
                    className="waves-effect"
                  >
                    <i className="fas fa-poll-h" />
                    <span>{t("Barcha keluvchilar")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link to="/cashier/student-payments" className="waves-effect">
                    <i className="fas fa-home" />
                    <span>O`quvchilarga to`lovni tasdiqlash (Nazariy)</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/cashier/student-payments-practical"
                    className="waves-effect"
                  >
                    <i className="fas fa-home" />
                    <span>O`quvchilarga to`lovni tasdiqlash (Amaliy)</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-instructor/exam-ended-students"
                    className="waves-effect"
                  >
                    <i className="fas fa-layer-group" />
                    <span>Amaliy topshirganlar</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-administrator/all-online-applications"
                    className="waves-effect"
                  >
                    <i className="fas fa-layer-group" />
                    <span>Online arizalar</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/final-access-admin/exam-process"
                    className="waves-effect"
                  >
                    <i className="fas fa-poll-h"></i>
                    <span>Test topshirish jarayonidagilar</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-instructor/monitoring-page"
                    className="waves-effect"
                  >
                    <i className="fas fa-layer-group" />
                    <span>Monitoring sahifasi</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-administrator/certificate"
                    className="waves-effect"
                  >
                    <i className="fas fa-poll-h" />
                    <span>{t("Sertifikatlar")}</span>
                  </Link>
                </li>
              </div>
            }

            {/* TEST JARAYONI SOZLAMALARI */}
            <li
              className="main_link_sidebar"
              name="test_process_settings"
              onClick={() => toggleMenuBox(IS_TEST_PROCESS_SETTINGS)}
            >
              {t("Test jarayoni sozlamalari")}
              <i
                className="fas fa-chevron-right"
                style={
                  sidebarState.test_process_settings
                    ? { transform: "rotate(0deg)" }
                    : { transform: "rotate(90deg)" }
                }
              ></i>
            </li>
            {
              <div
                className={
                  sidebarState.test_process_settings
                    ? "panel-collapse panel-close"
                    : "panel-collapse"
                }
              >
                <li className="" name="asosiy">
                  <Link
                    to="/examination/display-page-index"
                    className="waves-effect"
                  >
                    <i className="fa fa-desktop" />
                    <span>{t("E`lon sahifasi")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination/queue-display"
                    className="waves-effect"
                  >
                    <i className="fas fa-poll-h" />
                    <span>Navbat</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-instructor/students"
                    className="waves-effect"
                  >
                    <i className="fas fa-layer-group"></i>
                    <span>Barcha topshiruvchilar</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-instructor/merged-students"
                    className="waves-effect"
                  >
                    <i className="fas fa-layer-group" />
                    <span>Avtomobilga biriktirilganlar</span>
                  </Link>
                </li>
              </div>
            }

            {/* HISOBOTLAR */}
            <li
              className="main_link_sidebar"
              name="reports"
              onClick={() => toggleMenuBox(IS_REPORTS)}
            >
              {t("Hisobotlar")}
              <i
                className="fas fa-chevron-right"
                style={
                  sidebarState.reports
                    ? { transform: "rotate(0deg)" }
                    : { transform: "rotate(90deg)" }
                }
              ></i>
            </li>
            {
              <div
                className={
                  sidebarState.reports
                    ? "panel-collapse panel-close"
                    : "panel-collapse"
                }
              >
                <li className="" name="asosiy">
                  <Link
                    to="/examination/result-groups"
                    className="waves-effect"
                  >
                    <i className="fas fa-poll-h" />
                    <span>{t("Test natijasi")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-director/payment-report"
                    className="waves-effect"
                  >
                    <i className="fas fa-poll-h" />
                    <span>To'lovlar hisoboti </span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-director/reports-by-organizations"
                    className="waves-effect"
                  >
                    <i className="fas fa-layer-group" />
                    <span>Avtomaktablar bo'yicha hisobot</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link to="pages-404" className="waves-effect">
                    <i className="fas fa-layer-group" />
                    <span>Ta'lim turi bo'yicha hisobot</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link to="pages-404" className="waves-effect">
                    <i className="fas fa-layer-group" />
                    <span>Ta'lim turi umumiy</span>
                  </Link>
                </li>
              </div>
            }

            {/* FOYDALANUVCHILAR */}
            <li
              className="main_link_sidebar"
              name="users"
              onClick={() => toggleMenuBox(IS_USERS)}
            >
              {t("Foydalanuvchilar")}
              <i
                className="fas fa-chevron-right"
                style={
                  sidebarState.users
                    ? { transform: "rotate(0deg)" }
                    : { transform: "rotate(90deg)" }
                }
              ></i>
            </li>
            {
              <div
                className={
                  sidebarState.users
                    ? "panel-collapse panel-close"
                    : "panel-collapse"
                }
              >
                <li className="" name="asosiy">
                  <Link
                    to="/examination-director/cashier"
                    className="waves-effect"
                  >
                    <i className="fa fa-money-bill" />
                    <span>{t("Kassirlar")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-director/final-access-admin"
                    className="waves-effect"
                  >
                    <i className="fa fa-user" />
                    <span>{t("Testga ruxsat beruvchi admin")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-director/administrator"
                    className="waves-effect"
                  >
                    <i className="fa fa-users" />
                    <span>{t("Administrator")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-area/instructors"
                    className="waves-effect"
                  >
                    <i className="fa fa-male" />
                    <span>{t("Instruktorlar")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-director/examination-area-config"
                    className="waves-effect"
                  >
                    <i className="fa fa-desktop" />
                    <span>{t("Profil")}</span>
                  </Link>
                </li>
              </div>
            }

            {/* SOZLAMALAR */}
            <li
              className="main_link_sidebar"
              name="settings"
              onClick={() => toggleMenuBox(IS_SETTINGS)}
            >
              {t("Sozlamalar")}
              <i
                className="fas fa-chevron-right"
                style={
                  sidebarState.settings
                    ? { transform: "rotate(0deg)" }
                    : { transform: "rotate(90deg)" }
                }
              ></i>
            </li>
            {
              <div
                className={
                  sidebarState.settings
                    ? "panel-collapse panel-close"
                    : "panel-collapse"
                }
              >
                <li className="" name="asosiy">
                  <Link
                    to="/examination-area/payment-types"
                    className="waves-effect"
                  >
                    <i className="fa fa-credit-card" />
                    <span>{t("To'lov turlari")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link to="/examination-area/cars" className="waves-effect">
                    <i className="fa fa-car" />
                    <span>{t("Avtomobillar")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link
                    to="/examination-director/computers"
                    className="waves-effect"
                  >
                    <i className="fa fa-desktop" />
                    <span>{t("Kompyuterlar")}</span>
                  </Link>
                </li>

                <li className="" name="asosiy">
                  <Link to="/examination-area/sensors" className="waves-effect">
                    <i className="fa fa-camera-retro" />
                    <span>{t("Sensorlar")}</span>
                  </Link>
                </li>
              </div>
            }
          </ul>
        </div>
      </React.Fragment>
    );
  }
};

export default ExaminationUserLinks;
