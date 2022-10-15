const { IS_EDUCATION, IS_EXAM, IS_PRINT, IS_USER, IS_ROOM, IS_REPORT, IS_FINAL_EXAM } = require("./actions")


const initialValues = {
    education: false,
    exam: false,
    print: false,
    report:false,
    user: false,
    room:false,
    exams:false,
}


export const sidebar_content = (state = initialValues, action) => {
    switch(action.type){
      case IS_EDUCATION:
          return {
              ...state,
              education:!state.education
          }
        case IS_EXAM:
            return {
                ...state,
                exam:!state.exam
            }
        case IS_PRINT:
            return {
                ...state,
                print:!state.print
            }
        case IS_USER:
            return {
                ...state,
                user:!state.user
            }
        case IS_ROOM:
            return {
                ...state,
                room:!state.room
            }

            case IS_REPORT:
                return {
                    ...state,
                    report:!state.report
                }
            case IS_FINAL_EXAM:
                return {
                    ...state,
                    exams:!state.exams
                }
        default:
            return state;
    }
}