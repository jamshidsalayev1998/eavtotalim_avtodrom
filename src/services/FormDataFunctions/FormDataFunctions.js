export const dynamicValueFormData = (value) => {
    const formdata = new FormData();
    switch(value?.setLang){
        case 1:
            formdata.append("name_uz", value.fullName);
            formdata.append("short_name_uz", value.shortName);
            formdata.append("description_uz", value.description);
        case 2:
            formdata.append("name_kiril", value.fullName);
            formdata.append("short_name_kiril", value.shortName);
            formdata.append("description_kiril", value.description);
        case 3:
            formdata.append("name_qq", value.fullName);
            formdata.append("short_name_qq", value.shortName);
            formdata.append("description_qq", value.description);
        case 4:
            formdata.append("name_ru", value.fullName);
            formdata.append("short_name_ru", value.shortName);
            formdata.append("description_ru", value.description);
        case 5:
            formdata.append("name_en", value.fullName);
            formdata.append("short_name_en", value.shortName);
            formdata.append("description_en", value.description);
    }

    return formdata;
}