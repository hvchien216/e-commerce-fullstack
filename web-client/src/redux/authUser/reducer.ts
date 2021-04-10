import { clearToken, storedInfoUser, clearInfoUser } from "@utils/index";
import produce from "immer";
import { AnyAction } from "redux";
import { GET_PROFILE_SUCCESS, LOGIN, LOG_OUT } from "./types";

interface AuthUserState {
  user: any;
  isAuthenticated: boolean;
}

const initialState: AuthUserState = {
  user: null,
  isAuthenticated: false,
};

const authUserReducer = (state = initialState, action: AnyAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
        storedInfoUser(action.payload);
        draft.user = action.payload;
        draft.isAuthenticated = true;
        return;

      case LOG_OUT:
        draft.user = null;
        draft.isAuthenticated = false;
        clearToken();
        clearInfoUser();
        return;
    }
  });
};

export default authUserReducer;
