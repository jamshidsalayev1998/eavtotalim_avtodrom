import { ADD_DEFAULT_DATA, ADD_SUBJECT, REMOVE_SUBJECT } from "./actions";

export const manage_subjects = (state = [], action) => {
    switch (action.type) {
        case ADD_SUBJECT:
            return [
                ...state,
                action.data
            ]
        case REMOVE_SUBJECT:
            return [
                ...state.filter(e => e.id !== action.id)
            ]
        default:
            return state;
    }
}