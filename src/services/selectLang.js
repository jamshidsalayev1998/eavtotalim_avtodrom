import MainContext from "Context/MainContext"
import { useContext } from "react"

export const selectLang = (e) => {
  const { i18 } = useContext(MainContext)
  if (i18 === "uz" && e?.name_uz !== null) {
    return e?.name_uz
  } else if (i18 === "ru" && e?.name_ru !== null) {
    return e?.name_ru
  } else if (i18 === "en" && e?.name_en !== null) {
    return e?.name_en
  } else if (i18 === "qq" && e?.name_qq !== null) {
    return e?.name_qq
  } else if (i18 === "kr" && e?.name_kiril !== null) {
    return e?.name_kiril
  } else {
    return e?.name_uz
  }
}

export const selectLangShort = (e) => {
  const { i18 } = useContext(MainContext)
  if (i18 === "uz" && e?.short_name_uz !== null) {
    return e?.short_name_uz
  } else if (i18 === "ru" && e?.short_name_ru !== null) {
    return e?.short_name_ru
  } else if (i18 === "en" && e?.short_name_en !== null) {
    return e?.short_name_en
  } else if (i18 === "qq" && e?.short_name_qq !== null) {
    return e?.short_name_qq
  } else if (i18 === "kr" && e?.short_name_kiril !== null) {
    return e?.short_name_kiril
  } else {
    return e?.short_name_uz
  }
}
export const selectQuestionLang = (e) => {
  const { i18 } = useContext(MainContext)
  if (i18 === "uz" && e?.short_name_uz !== null) {
    return e?.question_uz
  } else if (i18 === "ru" && e?.question_ru !== null) {
    return e?.question_ru
  } else if (i18 === "en" && e?.question_en !== null) {
    return e?.question_en
  } else if (i18 === "qq" && e?.question_qq !== null) {
    return e?.question_qq
  } else if (i18 === "kr" && e?.question_kiril !== null) {
    return e?.question_kiril
  } else {
    return e?.question_uz
  }
}
export const selectAnswerLang = (e) => {
  const { i18 } = useContext(MainContext)
  if (i18 === "uz" && e?.short_name_uz !== null) {
    return e?.answer_uz
  } else if (i18 === "ru" && e?.answer_ru !== null) {
    return e?.answer_ru
  } else if (i18 === "en" && e?.answer_en !== null) {
    return e?.answer_en
  } else if (i18 === "qq" && e?.answer_qq !== null) {
    return e?.answer_qq
  } else if (i18 === "kr" && e?.answer_kiril !== null) {
    return e?.answer_kiril
  } else {
    return e?.answer_uz
  }
}
