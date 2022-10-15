import {CHANGE_COUNTER, TOTAL_COUNT} from './action';

const initialState = {
    total:0,
    current:0
}

export const QuestionCounterReducer = (state = initialState, action) => {
    switch(action.type){
        case TOTAL_COUNT:
            return {
                ...state,
                total:action.total
            }
        case CHANGE_COUNTER:
            return {
                ...state,
                current:action.current
            }
        default:
            return state
    }
}


