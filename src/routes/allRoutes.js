import Dashboard from "../pages/Dashboard/index";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";
import ExamDashboard from "../pages/examinationUser/ExamDAshboard";
import ComeExaminationGroupIndex from "../pages/examinationUser/ComeExamination/GroupCome";
import ComeExaminationSendGroupStudents from "../pages/examinationUser/ComeExamination/GroupCome/indexStudent";
import AllowStudentsTable from "../pages/examinationUser/Allow/Alloweds";
import ShowNotAllowedStudentYet from "../pages/examinationUser/Allow/Alloweds/ShowNotAllowedStudentYet";
import ShowAllowedStudent from "../pages/examinationUser/Allow/Alloweds/ShowAllowedStudent";
import FinalExamDashboard from "../pages/FinalExam";
import UserNotificationsIndex from "../pages/UserNotifications/UserNotificationsIndex";
import UserNotificationsShow from "../pages/UserNotifications/UserNotificationsShow";
import UserFaqIndex from "../pages/Faq/UserFaqIndex";
import ExamResultIndex from "../pages/examinationUser/ExamResults/ExamResultIndex";
import ExamResultStudentShow from "../pages/examinationUser/ExamResults/ExamResultStudentShow";
import ExamResult from "pages/examResults";
import PracticalExaminationResultIndex from "../pages/examinationUser/PracticalExaminationResult/PracticalExaminationResultIndex";
import PracticalExamTypes from "../pages/examinationUser/PracticalExaminationResult/PracticalExamTypes";
import DisplayPageIndex from "../pages/examinationUser/DisplayPage/DisplayPageIndex";
import ReturnedsIndex from "../pages/examinationUser/ReSubmit/ReturnedsIndex";
import ResubmitAllowStudentsTable from "../pages/examinationUser/Allow/ReSubmit/ResubmitAllowStudentsTable";
import ResubmitShowNotAllowedStudentYet from "../pages/examinationUser/Allow/ReSubmit/ResubmitShowNotAllowedStudentYet";
import ResubmitShowAllowedStudent from "../pages/examinationUser/Allow/ReSubmit/ResubmitShowAllowedStudent";
import CashierIndex from "../pages/examinationUser/CashierCrud/CashierIndex";
import CashierDashboard from "../pages/Cashier/CashierDashboard";
import GroupPaymentsIndex from "../pages/Cashier/GroupPayments/GroupPaymentsIndex";
import GroupPaymentNotConfirmedShow from "../pages/Cashier/GroupPayments/GroupPaymentTables/GroupPaymentNotConfirmedShow";
import GroupPaymentConfirmedShow from "../pages/Cashier/GroupPayments/GroupPaymentTables/GroupPaymentConfirmedShow";
import StudentPaymentsIndex from "../pages/Cashier/StudentPayments/StudentPaymentsIndex";
import SeparatelyAllowStudentsIndex from "../pages/examinationUser/Allow/SeparatelyAllow/SeparatelyAllowStudentsIndex";
import AllowedSeparatelyAllowStudentShow from "../pages/examinationUser/Allow/SeparatelyAllow/SeparatelyAllowTables/AllowedSeparatelyAllowStudentShow";
import FinalAccessAdmin from "../pages/examinationUser/FinalAccessAdminCrud/FinalAccessAdmin";
import Administrator from "../pages/examinationUser/AdministratorCrud/Administrator";
import QueueFinalExam from "../pages/examinationUser/FinalAccessAdminCrud/Pages/QueueFinalExam";
import AllStudentsIndex from "../pages/examinationUser/AdministratorCrud/pages/AllStudents/AllStudentsIndex";
import QrCodeData from "../pages/examinationUser/AdministratorCrud/pages/AllStudents/QrCodeData";
import AddStudentToComes from "../pages/examinationUser/AdministratorCrud/pages/AllStudents/AddStudentToComes";
import ShowResubmitGroup from "../pages/examinationUser/AdministratorCrud/pages/ResubmitGroup/ShowResubmitGroup";
import QrCodeScannerPage from "../pages/Cashier/QrCodePaymentPages/QrCodeScannerPage";
import ExaminationPaymentTypesIndex from "../pages/examinationUser/ExaminationPaymentTypes/ExaminationPaymentTypesIndex";
import ExaminationAreaCarsIndex from "../pages/examinationUser/ExaminationAreaCars/ExaminationAreaCarsIndex";
import ExaminationAreaInstructorIndex from "../pages/examinationUser/InstructorCrud/ExaminationAreaInstructorIndex";
import ExaminationInstructorAllStudents from "../pages/examinationUser/InstructorCrud/pages/students/ExaminationInstructorAllStudents";
import ExaminationInstructorMergedStudents from "../pages/examinationUser/InstructorCrud/pages/students/ExaminationInstructorMergedStudents";
import ExamEndedStudentsIndex from "../pages/examinationUser/InstructorCrud/pages/ExamEdeds/ExamEndedStudentsIndex";
import ExaminationAreaSensorsIndex from "../pages/examinationUser/ExaminationAreaSensors/ExaminationAreaSensorsIndex";
import ShowPracticalExamResults from "../pages/examinationUser/InstructorCrud/pages/ExamEdeds/ShowPracticalExamResult";
import PracticalPaymentQrCodeScannerPage from "../pages/Cashier/QrCodePaymentPages/PracticalPaymentQrCodeScannerPage";
import StudentPractialPaymentsIndex from "../pages/Cashier/StudentPracticalPayments/StudentPractialPaymentsIndex";
import CertificateStudentsIndex from "../pages/examinationUser/AdministratorCrud/pages/Certificate/CertificateStudentsIndex";
import CertificateShow from "../pages/examinationUser/AdministratorCrud/pages/Certificate/CertificateShow";
import PracticalTestResultPage from "../pages/PracticalTestResult/PracticalTestResult";
import FinalAccessAdminQrCodeScanner from "../pages/examinationUser/FinalAccessAdminCrud/Pages/FinalAccessAdminQrCodeScanner";
import ExaminationAreaComputersIndex from "../pages/examinationUser/Computers/ExaminationAreaComputersIndex";
import ExaminationAreaConfigIndex from "../pages/examinationUser/ExaminationAreaConfig/ExaminationAreaConfigIndex";
import ComputerConfig from "../pages/examinationUser/Computers/Config/ComputerConfig";
import CarParamsIndex from "../pages/CarParams/CarParamsIndex";
import ComputerSettingsPage from "../pages/examinationUser/Computers/Config/ComputerSettingsPage";
import StudentPaymentShow from "../pages/Cashier/StudentPayments/StudentPaymentShow";
import PaymentReportIndex from "../pages/Cashier/StudentPayments/Report/PaymentReportIndex";
import EditStudents from "../pages/examinationUser/AdministratorCrud/pages/AllStudents/EditStudent";
import ExaminationAreaSensorShow from "../pages/examinationUser/ExaminationAreaSensors/ExaminationAreaSensorShow";
import ExamProcessStudents from "../pages/examinationUser/FinalAccessAdminCrud/Pages/ExamProcessStudents";
import ShowPracticalExamResultByRecord from "../pages/examinationUser/InstructorCrud/pages/ExamEdeds/ShowPracticalExamResultByRecord";
import InstructorMonitoringPage from "../pages/examinationUser/InstructorCrud/pages/MonitoringPages/InstructorMonitoringPage";
import ReportsIndexByOrganizations from "../pages/Reports/ByOrganization/ReportsIndexByOrganizations";
import OnlineApplicationIndex from "../pages/OnlineApplications/OnlineApplicationIndex";
import index from "pages/StudentOnlineApplication/Apply-docs";
// import PracticalTestResult from "../pages/PracticalTestResult/PracticalTestResult";

const userRoutes = [
  {
    path: "/",
    component: Dashboard,
  },
];

const authRoutes = [
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },
];

const examinationUserRoutes = [
  {
    path: "/",
    component: ExamDashboard,
  },
  {
    path: "/come-examination/come-groups",
    component: ComeExaminationGroupIndex,
  },
  {
    path: "/come-examination/come-groups/:id",
    component: ComeExaminationSendGroupStudents,
  },
  {
    path: "/come-examination/resubmit/allow-students",
    component: ResubmitAllowStudentsTable,
  },
  {
    path: "/come-examination/resubmit/no-allow-students/:id",
    component: ResubmitShowNotAllowedStudentYet,
  },
  {
    path: "/come-examination/resubmit/allowed-students/:id",
    component: ResubmitShowAllowedStudent,
  },
  {
    path: "/come-examination/allow-students",
    component: AllowStudentsTable,
  },
  {
    path: "/come-examination/allow-students/separately",
    component: SeparatelyAllowStudentsIndex,
  },
  {
    path: "/come-examination/allow-students/separately/:id",
    component: AllowedSeparatelyAllowStudentShow,
  },
  {
    path: "/come-examination/no-allow-students/:id",
    component: ShowNotAllowedStudentYet,
  },
  {
    path: "/come-examination/allowed-students/:id",
    component: ShowAllowedStudent,
  },
  {
    path: "/examination/result-groups",
    component: ExamResultIndex,
  },
  {
    path: "/examination/result-groups/:id",
    component: ExamResultStudentShow,
  },
  {
    path: "/result-exam",
    component: ExamResult,
  },
  {
    path: "/examination/practical-exam-results",
    component: PracticalExaminationResultIndex,
  },
  {
    path: "/examination/practical-exam-results/:id",
    component: PracticalExamTypes,
  },
  {
    path: "/examination/display-page-index",
    component: DisplayPageIndex,
  },
  {
    path: "/examination/resubmit",
    component: ReturnedsIndex,
  },
  {
    path: "/examination-director/cashier",
    component: CashierIndex,
  },
  {
    path: "/examination-director/final-access-admin",
    component: FinalAccessAdmin,
  },
  {
    path: "/examination-director/administrator",
    component: Administrator,
  },
  {
    path: "/examination-area/payment-types",
    component: ExaminationPaymentTypesIndex,
  },
  {
    path: "/examination-area/cars",
    component: ExaminationAreaCarsIndex,
  },
  {
    path: "/examination-area/sensors",
    component: ExaminationAreaSensorsIndex,
  },
  {
    path: "/examination-area/sensors/:id",
    component: ExaminationAreaSensorShow,
  },
  {
    path: "/examination-area/instructors",
    component: ExaminationAreaInstructorIndex,
  },
  {
    path: "/examination-director/computers",
    component: ExaminationAreaComputersIndex,
  },
  {
    path: "/examination-director/examination-area-config",
    component: ExaminationAreaConfigIndex,
  },
  {
    path: "/examination-administrator/all-students/add",
    component: AddStudentToComes,
  },
  {
    path: "/examination-administrator/all-students",
    component: AllStudentsIndex,
  },
  {
    path: "/examination-administrator/edit-students/:id",
    component: EditStudents,
  },
  {
    path: "/examination-administrator/certificate",
    component: CertificateStudentsIndex,
  },
  {
    path: "/examination-administrator/certificate/:id",
    component: CertificateShow,
  },
  {
    path: "/cashier/student-payments",
    component: StudentPaymentsIndex,
  },
  {
    path: "/cashier/student-payments/:id",
    component: StudentPaymentShow,
  },
  {
    path: "/cashier/student-payments-practical",
    component: StudentPractialPaymentsIndex,
  },
  {
    path: "/cashier/qr-code-scanner-page",
    component: QrCodeScannerPage,
  },
  {
    path: "/examination/queue-display",
    component: QueueFinalExam,
  },
  {
    path: "/examination-director/computer-config",
    component: ComputerConfig,
  },
  {
    path: "/examination-director/payment-report",
    component: PaymentReportIndex,
  },
  {
    path: "/examination-instructor/merged-students",
    component: ExaminationInstructorMergedStudents,
  },
  {
    path: "/examination-instructor/monitoring-page",
    component: InstructorMonitoringPage,
  },
  {
    path: "/examination-instructor/exam-ended-students/:id",
    component: ShowPracticalExamResults,
  },
  {
    path: "/examination-instructor/final-exam-results-by-record/:id",
    component: ShowPracticalExamResultByRecord,
  },
  {
    path: "/examination-instructor/exam-ended-students",
    component: ExamEndedStudentsIndex,
  },
  {
    path: "/examination-instructor/students",
    component: ExaminationInstructorAllStudents,
  },
  {
    path: "/examination-director/reports-by-organizations",
    component: ReportsIndexByOrganizations,
  },
  {
    path: "/examination-administrator/all-online-applications",
    component: OnlineApplicationIndex,
  },
  {
    path: "/final-access-admin/exam-process",
    component: ExamProcessStudents,
  },
];

const finalyExamination = [
  {
    path: "/",
    component: FinalExamDashboard,
  },
];
const all_user_routes = [
  {
    path: "/user/notifications",
    component: UserNotificationsIndex,
  },
  {
    path: "/user/notifications/:id",
    component: UserNotificationsShow,
  },
  {
    path: "/user/faq",
    component: UserFaqIndex,
  },
];
const cashierRoutes = [
  {
    path: "/examination-administrator/edit-students/:id",
    component: EditStudents,
  },
  {
    path: "/examination-administrator/all-students/add",
    component: AddStudentToComes,
  },
  {
    path: "/examination-administrator/all-students",
    component: AllStudentsIndex,
  },
  {
    path: "/",
    component: CashierDashboard,
  },
  {
    path: "/come-examination/come-groups",
    component: ComeExaminationGroupIndex,
  },
  {
    path: "/come-examination/come-groups/:id",
    component: ComeExaminationSendGroupStudents,
  },
  {
    path: "/cashier/groups-payments",
    component: GroupPaymentsIndex,
  },
  {
    path: "/cashier/groups-payments/not-confirmed/:id",
    component: GroupPaymentNotConfirmedShow,
  },
  {
    path: "/cashier/groups-payments/confirmed/:id",
    component: GroupPaymentConfirmedShow,
  },
  {
    path: "/cashier/student-payments",
    component: StudentPaymentsIndex,
  },
  {
    path: "/cashier/student-payments/:id",
    component: StudentPaymentShow,
  },
  {
    path: "/cashier/student-payments-practical",
    component: StudentPractialPaymentsIndex,
  },
  {
    path: "/cashier/qr-code-scanner-page",
    component: QrCodeScannerPage,
  },
  {
    path: "/cashier/qr-code-scanner-page-practical",
    component: PracticalPaymentQrCodeScannerPage,
  },
  {
    path: "/examination-administrator/all-online-applications",
    component: OnlineApplicationIndex,
  },
];
const finalAccessAdminRoutes = [
  {
    path: "/",
    component: CashierDashboard,
  },
  {
    path: "/come-examination/allow-students",
    component: AllowStudentsTable,
  },
  {
    path: "/come-examination/allowed-students/:id",
    component: ShowAllowedStudent,
  },
  {
    path: "/come-examination/allow-students/separately",
    component: SeparatelyAllowStudentsIndex,
  },
  {
    path: "/come-examination/allow-students/separately/:id",
    component: AllowedSeparatelyAllowStudentShow,
  },
  {
    path: "/come-examination/resubmit/allow-students",
    component: ResubmitAllowStudentsTable,
  },
  {
    path: "/come-examination/resubmit/no-allow-students/:id",
    component: ResubmitShowNotAllowedStudentYet,
  },
  {
    path: "/come-examination/resubmit/allowed-students/:id",
    component: ResubmitShowAllowedStudent,
  },
  {
    path: "/examination/result-groups",
    component: ExamResultIndex,
  },
  {
    path: "/examination/result-groups/:id",
    component: ExamResultStudentShow,
  },
  {
    path: "/examination/resubmit",
    component: ReturnedsIndex,
  },
  {
    path: "/examination/display-page-index",
    component: DisplayPageIndex,
  },
  {
    path: "/examination/queue-display",
    component: QueueFinalExam,
  },
  {
    path: "/come-examination/no-allow-students/:id",
    component: ShowNotAllowedStudentYet,
  },
  {
    path: "/final-access-admin/qr-code-scanner",
    component: FinalAccessAdminQrCodeScanner,
  },
  {
    path: "/final-access-admin/exam-process",
    component: ExamProcessStudents,
  },
  {
    path: "/examination-director/computers",
    component: ExaminationAreaComputersIndex,
  },
];
const administratorRoutes = [
  {
    path: "/examination-administrator/edit-students/:id",
    component: EditStudents,
  },
  {
    path: "/examination/queue-display",
    component: QueueFinalExam,
  },
  {
    path: "/",
    component: ExamDashboard,
  },
  {
    path: "/come-examination/come-groups",
    component: ComeExaminationGroupIndex,
  },
  {
    path: "/come-examination/come-groups/:id",
    component: ComeExaminationSendGroupStudents,
  },
  {
    path: "/examination/resubmit",
    component: ReturnedsIndex,
  },
  {
    path: "/examination-administrator/all-students",
    component: AllStudentsIndex,
  },
  {
    path: "/examination-administrator/all-students/print-qr-code",
    component: QrCodeData,
  },
  {
    path: "/examination-administrator/all-students/add",
    component: AddStudentToComes,
  },
  {
    path: "/come-examination/resubmit/no-allow-students/:id",
    component: ShowResubmitGroup,
  },
  {
    path: "/examination-administrator/certificate",
    component: CertificateStudentsIndex,
  },
  {
    path: "/examination-administrator/certificate/:id",
    component: CertificateShow,
  },
  {
    path: "/examination-administrator/all-online-applications",
    component: OnlineApplicationIndex,
  },
];

const instructorRoutes = [
  {
    path: "/",
    component: ExamDashboard,
  },
  {
    path: "/examination-instructor/students",
    component: ExaminationInstructorAllStudents,
  },
  {
    path: "/examination-instructor/merged-students",
    component: ExaminationInstructorMergedStudents,
  },
  {
    path: "/examination-instructor/exam-ended-students",
    component: ExamEndedStudentsIndex,
  },
  {
    path: "/examination-instructor/exam-ended-students/:id",
    component: ShowPracticalExamResults,
  },
  {
    path: "/examination-test-result",
    component: PracticalTestResultPage,
  },
  {
    path: "/examination-instructor/car-params",
    component: CarParamsIndex,
  },
  {
    path: "/examination-instructor/final-exam-results-by-record/:id",
    component: ShowPracticalExamResultByRecord,
  },
];

const onlineStudentApplicationRoutes = [
  {
    path: "/",
    component: index,
  },
  {
    path: "/examination-administrator/all-students",
    component: AllStudentsIndex,
  },
];

export {
  userRoutes,
  authRoutes,
  finalyExamination,
  examinationUserRoutes,
  all_user_routes,
  cashierRoutes,
  finalAccessAdminRoutes,
  administratorRoutes,
  instructorRoutes,
  onlineStudentApplicationRoutes,
};
