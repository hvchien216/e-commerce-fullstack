import {
  clearToken,
  storedInfoUser,
  clearInfoUser,
  clearLocalStored,
} from "@utils/index";
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
        console.log("ruunnnnnn");
        draft.user = null;
        draft.isAuthenticated = false;
        clearToken();
        clearInfoUser();
        clearLocalStored();
        return;
    }
  });
};

export default authUserReducer;
