import { Ref, ref } from "vue";
import { ThemeEnum } from "./app.context";
import { UserModel } from "./user";
import { LoreModel } from "./lore";

class AppRef {
  private static _ins: Ref = ref(new AppRef());
  public theme: ThemeEnum = ThemeEnum.Dark;
  private _user: UserModel = new UserModel();
  private _lore: LoreModel = new LoreModel();

  constructor() {}

  public static get ins(): AppRef {
    return this._ins?.value ? this._ins.value : (this._ins.value = new AppRef());
  }

  /** 用户类 */
  public get user(): UserModel {
    return this._user;
  }

  /** 知识答题 */
  public get lore(): LoreModel {
    return this._lore;
  }
}
/** 全局响应式 状态管理池 */
export const appRef: AppRef = AppRef.ins;
