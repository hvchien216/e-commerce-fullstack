import { PureComponent } from "react";

export default class RegisterStore extends PureComponent {
  static store: any = undefined;

  static dispatch(action: any) {
    return this.store.dispatch(action());
  }
}
