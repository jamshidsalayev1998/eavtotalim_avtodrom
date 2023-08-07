const {
  IS_EXAM_PROCESS,
  IS_TEST_PROCESS_SETTINGS,
  IS_REPORTS,
  IS_USERS,
  IS_SETTINGS,
  IS_CONTRACT
} = require("./actions");

const initialValues = {
  exam_process: false,
  test_process_settings: true,
  reports: true,
  users: true,
  settings: true,
  contract: false
};

export const sidebar_content = (state = initialValues, action) => {
  switch (action.type) {
    case IS_EXAM_PROCESS:
      return {
        ...state,
        exam_process: !state.exam_process,
      };
    case IS_TEST_PROCESS_SETTINGS:
      return {
        ...state,
        test_process_settings: !state.test_process_settings,
      };
    case IS_REPORTS:
      return {
        ...state,
        reports: !state.reports,
      };
    case IS_CONTRACT: return {
      ...state,
      contract:  !state.contract
    }
    case IS_USERS:
      return {
        ...state,
        users: !state.users,
      };
    case IS_SETTINGS:
      return {
        ...state,
        settings: !state.settings,
      };
    default:
      return state;
  }
};
