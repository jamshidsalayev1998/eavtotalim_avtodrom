export const teacherAddValues = (
  values,
  documentCopy,
  teacherPhoto,
  diplomCopy,
  selectedLessons,
  status,
  teacher_id
) => {
  const data = new FormData();
  const birthday = values.birthday?.format("YYYY-MM-DD") || "";
  const passport_given_date =
    values.passport_given_date?.format("YYYY-MM-DD") || "";
  const diplomGivenDate = values.diplom_given_date?.format("YYYY-MM-DD") || "";
  data.append("first_name", values.first_name);
  data.append("last_name", values.last_name);
  data.append("middle_name", values.middle_name);
  data.append("birthday", birthday);
  data.append("region_id", values.region_id);
  data.append("area_id", values.area_id);
  data.append("address", values.address);
  data.append("gender", values.gender);
  data.append("phone1", values.phone1);
  data.append("phone2", values.phone2);
  data.append("email", values.email);
  data.append("status", status ? 1 : 0);
  data.append("citizenship_id", values.citizenship_id);
  data.append("passport_seria", values.passport_seria);
  data.append("passport_number", values.passport_number);
  data.append("passport_given_date", passport_given_date);
  data.append("passport_jshir", values.passport_jshir);
  data.append("passport_given_place", values.passport_given_place);
  data.append("constant_region_id", values.constant_region_id);
  data.append("constant_area_id", values.constant_area_id);
  data.append("constant_address", values.constant_address);
  if (documentCopy.uploaded) {
    data.append("passport_copy", documentCopy.photo);
  }
  data.append("education_degree_id", values.education_degree_id);
  data.append("specialization", values.specialization);
  data.append("institution_name", values.institution_name);
  data.append("diplom_seria", values.diplom_seria);
  data.append("diplom_number", values.diplom_number);
  data.append("diplom_given_date", diplomGivenDate);
  data.append("teacher_type_id", values?.teacher_type_id);
  const lessons = selectedLessons?.map(lesson => {
    return lesson.id;
  });
  if (lessons.length) {
    data.append("lessons", JSON.stringify(lessons));
  }
  if (values.edu_types?.length) {
    data.append("edu_types", JSON.stringify(values.edu_types));
  }
  const langs = values.langs?.filter(el => (el ? true : false));
  if (langs.length) {
    data.append("langs", JSON.stringify(langs));
  }
  if (documentCopy.photo) {
    data.append("document_copy", documentCopy.photo);
  }
  if (teacherPhoto.photo && teacherPhoto.uploaded) {
    data.append("image", teacherPhoto.photo);
  }
  if (diplomCopy.diplom.photo && diplomCopy.diplom.uploaded) {
    data.append("diplom_copy", diplomCopy.diplom.photo);
  }
  if (diplomCopy.application.photo && diplomCopy.application.uploaded) {
    data.append("diplom_application_copy", diplomCopy.application.photo);
  }
  if (teacher_id) {
    data.append("teacher_id", teacher_id);
  }

  return data;
};
