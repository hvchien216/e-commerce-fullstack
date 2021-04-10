import {
  ChangePassordAction,
  CHANGE_PASSWORD,
  ForgotPasswordAction,
  FORGOT_PASSWORD,
  GetProfileAction,
  GetProfileFailAction,
  GetProfileSuccessAction,
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  IChangePassord,
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
  LOGIN,
  LoginAction,
  LogoutAction,
  LOG_OUT,
  REGISTER,
  RegisterAction,
  ResetPasswordAction,
  RESET_PASSWORD,
  UpdateProfileAction,
  UPDATE_PROFILE,
} from "./types";

export const login = (payload: ILogin): LoginAction => ({
  type: LOGIN,
  payload,
});

export const logout = (): LogoutAction => ({
  type: LOG_OUT,
});

export const register = (payload: IRegister): RegisterAction => ({
  type: REGISTER,
  payload,
});

export const getProfile = (
  func: () => void,
  isTriggerFunc: boolean
): GetProfileAction => ({
  type: GET_PROFILE,
  func,
  isTriggerFunc,
});

export const getProfileSuccess = (profile: any): GetProfileSuccessAction => ({
  type: GET_PROFILE_SUCCESS,
  payload: profile,
});

export const getProfileFail = (): GetProfileFailAction => ({
  type: GET_PROFILE_FAIL,
});

export const updateProfile = (payload: any): UpdateProfileAction => ({
  type: UPDATE_PROFILE,
  payload,
});

export const changePassoword = (
  payload: IChangePassord
): ChangePassordAction => ({
  type: CHANGE_PASSWORD,
  payload,
});

export const forgotPassword = (
  payload: IForgotPassword
): ForgotPasswordAction => ({
  type: FORGOT_PASSWORD,
  payload,
});
export const resetPassword = (
  token: string,
  payload: IResetPassword
): ResetPasswordAction => ({
  type: RESET_PASSWORD,
  token,
  payload,
});
