import React, { PureComponent } from "react";
import _ from "lodash";
import { alertNotification } from "@utils/index";

const messageErr: any = {
  token_invalid: "Token không hợp lệ",
  bad_request: "Yêu cầu không hợp lệ",
  access_denied: "Không đủ quyền để truy cập",
  user_had_existed: "Tài khoản đã tồn tại",
  sendmail_fail: "Gửi mail thất bại",
  user_is_not_exist: "Tài khoản không tồn tại",
  user_account_wrong_password: "Mật khẩu không đúng",
  user_account_not_existed: "Tài khoản không tồn tại",
  cant_update_profile: "Cập nhật thông tin thất bại",
  password_invalid: "Mật khẩu không hợp lệ",
  sth_went_wrong: "Chức năng đang bảo trì...",
  email_is_required: "Vui lòng nhập email",
  order_not_found: "Không tìm thấy đơn hàng",
};

export default class ServerError extends PureComponent {
  static fMsg = undefined;

  static getServerError(res: any) {
    if (`${res}` === "TypeError: Failed to fetch") {
      return "Đang bảo trì...";
    }

    let serverErrorMessage = messageErr[res?.error_code];
    return serverErrorMessage;
  }
  // return {
  // message: getString(res, 'message'),
  // localizedMessage: errorCode
  // }
}

// }

export const showError = (error: string) => {
  console.log(error);
  if (!error) return;
  alertNotification(error, "error");
};
