import { getUuid } from "@/utils/common.methods";

export type UserInfo = {
  uid: string;
  avatar?: string;
  nick: string;
};
export type AiInfo = {
  uid: string;
  avatar?: string;
  nick: string;
};

export class UserModel {
  private _data = <UserInfo>{};
  private _ai = <AiInfo>{};

  public get data(): UserInfo {
    this._data = {
      uid: getUuid(),
      avatar: "https://img1.baidu.com/it/u=2636207049,2642504006&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1687021200&t=d4a865f9a48ee9625a6f0a94c34f0469",
      nick: "with hope",
    };
    return this._data;
  }

  public setData(info: UserInfo): void {
    this._data = info;
  }

  public get ai(): AiInfo {
    this._ai = {
      uid: getUuid(),
      avatar: "https://img1.baidu.com/it/u=3613958228,3522035000&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
      nick: "AI",
    };
    return this._ai;
  }
  public setAiData(info: AiInfo): void {
    this._ai = info;
  }
}
