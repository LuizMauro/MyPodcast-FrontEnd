import { combineReducers } from "redux";

import auth from "./auth/reducer";
import user from "./user/reducer";
import ctg from "./categoria/reducer";
import podcast from "./podcast/reducer";
import comentario from "./comentario/reducer";
import publicidade from "./publicidade/reducer";

export default combineReducers({
  auth,
  user,
  ctg,
  podcast,
  comentario,
  publicidade,
});
