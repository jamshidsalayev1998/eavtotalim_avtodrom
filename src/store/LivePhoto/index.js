import { SAVE_IMAGE,PASSPORT_IMAGE } from "./actionType";

let initialValue = {
  livePhoto: null,
  passportRhoto:null,
};


const LivePhoto = (state = initialValue, action) => {
  switch (action.type) {
    case SAVE_IMAGE:
      return {
        ...state,
        livePhoto: action.data,
      };
      case PASSPORT_IMAGE:
        return {
          ...state,
          passportRhoto: action.data,
        };
    default:
      return state;
  }
};



export default LivePhoto;
