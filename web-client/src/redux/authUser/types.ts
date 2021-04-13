export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
}

export interface IChangePassord {
  prevPassword: string;
  newPassword: string;
}

export interface IForgotPassword extends Omit<ILogin, "password"> {}

export interface IResetPassword extends Omit<ILogin, "email"> {}

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const LOG_OUT = "LOG_OUT";

export interface LoginAction {
  type: typeof LOGIN;
  payload: ILogin;
}

export interface LogoutAction {
  type: typeof LOG_OUT;
}

export interface RegisterAction {
  type: typeof REGISTER;
  payload: IRegister;
}

export interface GetProfileAction {
  type: typeof GET_PROFILE;
  func: () => void;
  isTriggerFunc: boolean;
}

export interface GetProfileSuccessAction {
  type: typeof GET_PROFILE_SUCCESS;
  payload: any;
}

export interface GetProfileFailAction {
  type: typeof GET_PROFILE_FAIL;
}

export interface UpdateProfileAction {
  type: typeof UPDATE_PROFILE;
  payload: any;
}

export interface ChangePassordAction {
  type: typeof CHANGE_PASSWORD;
  payload: IChangePassord;
}

export interface ForgotPasswordAction {
  type: typeof FORGOT_PASSWORD;
  payload: IForgotPassword;
}

export interface ResetPasswordAction {
  type: typeof RESET_PASSWORD;
  token: string;
  payload: IResetPassword;
}

export type AuthUserActionTypes =
  | LoginAction
  | RegisterAction
  | GetProfileAction
  | UpdateProfileAction
  | ChangePassordAction
  | ForgotPasswordAction
  | ResetPasswordAction
  | LogoutAction
  | GetProfileSuccessAction
  | GetProfileFailAction;
