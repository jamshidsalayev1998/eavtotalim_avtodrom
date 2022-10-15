import { ADD_CONTENT_ITEM, GLOBAL_REFRESH } from "../ActionTypes/actionTypes";

const initialState = {
        refresh:false,
        name:"Bekzod", 
        age:25
    }



const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_REFRESH:
           return { 
                ...state,
                refresh:!state.refresh
            }
        default:
            return state;
    }
}

export default contentReducer;