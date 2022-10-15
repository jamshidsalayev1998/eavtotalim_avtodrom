import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next"



const QuestionCounter = () => {
    
    const { t } = useTranslation()

    const state = useSelector(state => state.QuestionCounterReducer)

    return (
        <>
            <h5>{t("Question")} {state.current}/{state.total}</h5>
        </>
    )
}


export default QuestionCounter;