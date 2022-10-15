import { spotTheLang } from "../Utils/helperFuncs";

export const groupAddValues = (values, group_id, otherYear, writedNames, education_price) => {
  const data = new FormData();
  writedNames?.map((name, index) => {
    let nameVal = values[`name ${index}`];
    if (name.id && nameVal) {
      const lang = spotTheLang(name.id);
      data.append(lang, nameVal);
      let short_name = values[`short_name ${index}`];
      if (short_name) {
        data.append(`short_${lang}`, short_name);
      }
    }
  });

  let semestrs = [];

  if (!otherYear) {
    data.append("edu_year_id", values.edu_year_id);
  } else {
    data.append("edu_year_name", values.edu_year_name);
    for (let i = 1; i < 4; i++) {
      if (values[`${i} semestr`]?.length) {
        let start = values[`${i} semestr`][0];
        let end = values[`${i} semestr`][1];
        if (start && end) {
          semestrs.push({
            starting_date: start.format("DD-MM-YYYY"),
            ending_date: end.format("DD-MM-YYYY"),
          });
        }
      }
    }
  }
  if (semestrs.length) {
    data.append("quarters", JSON.stringify(semestrs));
  }
  if (group_id) {
    data.append("group_id", group_id);
  }

  if (education_price) {
    data.append("education_price", values.education_price);
  }

  data.append("lang_id", values.lang_id);
  data.append("edu_starting_date", values.edu_starting_date);
  data.append("edu_ending_date", values.edu_ending_date);
  data.append("edu_type_id", values.edu_type_id);

  return data;
};




