export const studentAddValues = (
  values,
  relatives,
  studentPhoto,
  documentCopy,
  studentId,
  relativeIds,
  docType,
  edu_types,
  studentLivePhoto,
  passportLivePhoto
) => {


  const data = new FormData();
  const birthday = values?.birthday?.format("YYYY-MM-DD") || "";
  const document_given_date =
    values.document_given_date?.format("YYYY-MM-DD") || "";
  const passport_given_date =
    values.passport_given_date?.format("YYYY-MM-DD") || "";
  const _relatives = [];
  if (relatives.father) {
    let father = {
      relative_type_id: 1,
      first_name: values.father_name,
      last_name: values.father_lastname,
      middle_name: values.father_middlename,
      birthday: values.father_birthday?.format("YYYY-MM-DD"),
      phone: values.father_phone,
    };
    if (relativeIds?.father) {
      father.id = relativeIds.father;
    }
    _relatives.push(father);
  }
  if (relatives.mother) {
    let mother = {
      relative_type_id: 2,
      first_name: values.mother_name,
      last_name: values.mother_lastname,
      middle_name: values.mother_middlename,
      birthday: values.mother_birthday?.format("YYYY-MM-DD"),
      phone: values.mother_phone,
    };
    if (relativeIds?.mother) {
      mother.id = relativeIds.mother;
    }
    _relatives.push(mother);
  }
  if (relatives.other) {
    let other = {
      relative_type_id: 3,
      first_name: values.other_name,
      last_name: values.other_lastname,
      middle_name: values.other_middlename,
      birthday: values.other_birthday?.format("YYYY-MM-DD"),
      phone: values.other_phone,
    };
    if (relativeIds?.other) {
      other.id = relativeIds.other;
    }
    _relatives.push(other);
  }
  if (studentId) {
    data.append("student_id", studentId);
  }
  data.append("amount", values.payment);
  data.append("pay_type_id", values.pay_type_id);
  data.append("first_name", values.first_name);
  data.append("last_name", values.last_name);
  data.append("middle_name", values.middle_name);
  data.append("birthday", birthday);
  data.append("relatives", JSON.stringify(_relatives));
  data.append("region_id", values.region_id);
  data.append("area_id", values.area_id);
  data.append("address", values.address);
  data.append("gender", values.gender);
  data.append("phone1", values.phone1);
  data.append("phone2", values.phone2);
  data.append("email", values.email);
  data.append("document_type_id", values.document_type_id);
  data.append("citizenship_id", values.citizenship_id);
  data.append("social_status_id", values.social_status_id);
  data.append("is_low_security", values.is_low_security);
  if (values.edu_type_id == 'undefined' || values.edu_type_id == undefined) {
    values.edu_type_id = edu_types[0]?.id;
  }
  data.append("medical_sertificate", values.medical_sertificate);
  data.append("edu_type_id", values.edu_type_id);
  data.append("edu_lang_id", values.edu_lang_id);
  data.append("constant_address", values.constant_address);
  data.append("constant_region_id", values.constant_region_id);
  data.append("constant_area_id", values.constant_area_id);
  if (docType == 1) {
    if (values.passport_seria) {
      data.append("passport_seria", values.passport_seria);
    }
    if (values.passport_number) {
      data.append("passport_number", values.passport_number);
    }
    data.append("passport_jshir", values.passport_jshir);
    data.append("passport_given_place", values.passport_given_place);
    data.append("passport_given_date", passport_given_date);
  }
  if (docType == 2) {
    if (values.deed_number) {
      data.append("deed_number", values.deed_number);
    }
    data.append("document_seria", values.document_seria);
    data.append("document_number", values.document_number);
    data.append("document_given_date", document_given_date);
    data.append("document_given_place", values.document_given_place);
  }
  data.append("additional_information", values.additional_information);
  if (documentCopy.photo) {
    data.append("document_copy", documentCopy.photo);
  }
  if (studentPhoto.photo) {
    data.append("image", studentPhoto.photo);
  }
  if (studentLivePhoto) {
    data.append("live_image", studentLivePhoto);
  }
  // if (passportLivePhoto) {
  //   data.append("live_passport_image", passportLivePhoto);
  // }
  return data;
};
