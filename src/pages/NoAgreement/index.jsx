import React from "react"
import { TELEGRAM_PATH } from "Utils/AppVariables";

const NoAgreement = ({message}) => {
  return(
    <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh", width: "100%" }}>
      <h4 className="mb-3  text-secondary text-center">
        {message != undefined?message:'Bu amalni bajarish uchun tashkilotingiz biz bilan shartnoma qilishi lozim!'} <br />
        <a target="_blank" href={TELEGRAM_PATH}>Buning uchun buyerga kiring!</a>
      </h4>
    </div>
  )
}
export default NoAgreement;