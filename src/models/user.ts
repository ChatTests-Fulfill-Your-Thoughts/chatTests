import { getUuid } from "@/utils/common.methods";

export type UserInfo = {
  uid: string;
  avatar?: string;
  nick: string;
  openai_key?: string;
};

export class UserModel {
  private _data = <UserInfo>{};

  public get data(): UserInfo {
    this._data = {
      uid: getUuid(),
      avatar: "https://img1.baidu.com/it/u=2636207049,2642504006&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1687021200&t=d4a865f9a48ee9625a6f0a94c34f0469",
      nick: "with hope",
      openai_key: localStorage.getItem("openai_key"),
    };
    return this._data;
  }

  public setData(info: UserInfo): void {
    this._data = info;
  }

  public setOpenKey(key: string): void {
    localStorage.setItem("openai_key", key);
    this._data.openai_key = key;
  }
}
