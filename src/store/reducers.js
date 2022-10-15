import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
import contentReducer from './ContentStore/contentReducer';
import { sidebar_content } from "./sidebar/sidebar_content";
import {manage_subjects} from './subjects/subjects';
import Calendar from './calendar/reducer';
import {QuestionCounterReducer}from './QuestionCounter/index';
import LivePhoto from "./LivePhoto/index";

const rootReducer = combineReducers({
  Layout,
  content_state: contentReducer,
  sidebar_content,
  manage_subjects,
  Calendar,
  QuestionCounterReducer,
  LivePhoto
});

export default rootReducer;
