export const filter_by_language_update_data = (data) => {

    let new_data = [];
    let err_data = [];
    for (const [key, value] of Object.entries(data)) {
        const isValue = value !== '' && value !== null && value !== 'null';
        if (key === 'name_uz' && isValue) {
            new_data.push({ id: new_data.length + 1, fullName: data?.name_uz, shortName: data?.short_name_uz, description: data?.description_uz, setLang: 1 })
        } else if (key === 'name_kiril' && isValue) {
            new_data.push({ id: new_data.length + 1, fullName: data?.name_kiril, shortName: data?.short_name_kiril, description: data?.description_kiril, setLang: 2 })
        } else if (key === 'name_qq' && isValue) {
            new_data.push({ id: new_data.length + 1, fullName: data?.name_qq, shortName: data?.short_name_qq, description: data?.description_qq, setLang: 3 })
        } else if (key === 'name_ru' && isValue) {
            new_data.push({ id: new_data.length + 1, fullName: data?.name_ru, shortName: data?.short_name_ru, description: data?.description_ru, setLang: 4 })
        } else if (key === 'name_en' && isValue) {
            new_data.push({ id: new_data.length + 1, fullName: data?.name_en, shortName: data?.short_name_en, description: data?.description_en, setLang: 5 })
        }
    }

    for (let i = 0; i < new_data.length; i++) {
        err_data.push(
            {
                id: new_data[i]?.id,
                fullName: new_data[i]?.fullName !== "" || typeof new_data[i]?.fullName !== 'undefined' || new_data[i]?.fullName !== 'null' ? "" : "Iltimos maydonni to'ldiring",
                shortName: (new_data[i]?.shortName !== "" && typeof new_data[i]?.shortName !== 'undefined' && new_data[i]?.shortName !== 'null' && typeof new_data[i]?.shortName !== 'null') ? "" : "Iltimos maydonni to'ldiring"
            }
        )
    }

    return Promise.resolve({ new_data, err_data });
}
