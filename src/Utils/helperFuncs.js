import { Th } from "react-super-responsive-table";
import moment from "moment";

export const capitalizeFirstLetter = (string = "") => {
  if(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  else{
    return '';
  }
};

export const formatDate = _ => {
  if (_) {
    const date = new Date(_);
    const formattedDate = date.toLocaleDateString();
    const time = _.split("T")[1]?.split(".")[0];
    

    return {
      formattedDate,
      time,
    };
  }
  return {
    formattedDate: "",
    time: "",
  };
};

export const TableHeader = ({ headers }) => {
  return headers?.map(title => {
    return (
      <Th key={title} style={{ fontWeight: "600" }}>
        {title}
      </Th>
    );
  });
};

export const formatRegion = region => {
  const name = region?.split(" ")[0];
  const type = region?.split(" ")[1];

  switch (type) {
    case "viloyati":
      return name + " v.";
    case "shahri":
      return name + " sh.";
    case "Respublikasi":
      return name + " R.";
    default:
      return "";
  }
};

export const formatDistrict = region => {
  const name = region?.split(" ")[0];
  const type = region?.split(" ")[1];

  switch (type) {
    case "tumani":
      return name + " tum.";
    case "shahri":
      return name + " sh.";
    default:
      return "";
  }
};

export const spotTheLang = langId => {
  const id = Number(langId);
  switch (id) {
    case 1:
      return "name_uz";
    case 2:
      return "name_ru";
    case 3:
      return "name_qq";
    case 4:
      return "name_en";
    case 5:
      return "name_kiril";
  }
};

export const findLang = id => {
  const _id = id.toString();
  switch (_id) {
    case "1":
      return "O'zbekcha";
    case "2":
      return "Ruscha";
    case "3":
      return "Qoraqalpoqcha";
    case "4":
      return "Inglizcha";
    case "5":
      return "Kirillcha";
    default:
      return;
  }
};

export const calculateAge = dob1 => {
  let today = new Date();
  let birthDate = new Date(dob1); // create a date object directly from dob1 argument
  let age_now = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
};

export const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const disabledDate = current => {
  return current && current > moment().endOf("day");
};

export const studentAge = () => {
  const year = new Date().getFullYear() - 6;
  return moment(year + "-01-01");
};

export const studentDisabledDate = current => {
  const year = new Date().getFullYear() - 6;
  return current && current > moment(year + "-12-31");
};

export const parentDisabledDate = current => {
  const year = new Date().getFullYear() - 22;
  return current && current > moment(year + "-12-31");
};

export const parentAge = () => {
  const year = new Date().getFullYear() - 22;
  return moment(year + "-01-01");
};

export const teacherDisabledDate = current => {
  const year = new Date().getFullYear() - 18;
  return current && current > moment(year + "-12-31");
};

export const teacherAge = () => {
  const year = new Date().getFullYear() - 18;
  return moment(year + "-01-01");
};
