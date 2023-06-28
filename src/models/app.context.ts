import { ApplicationSetModel } from "./application";
import { SystemModel } from "./system";

export enum ThemeEnum {
  Light = "light",
  Dark = "dark",
}

export type GlobalInfo = {
  token?: string;
  Theme: ThemeEnum;
};

export type ConfigInfo = {
  relationUrl: string;
};

class AppContext {
  private static _ins: AppContext = new AppContext();
  private _global = <GlobalInfo>{};
  private _config = <ConfigInfo>{};
  private _system: SystemModel = new SystemModel();
  private _applicationSet: ApplicationSetModel = new ApplicationSetModel();

  constructor() { }

  public static get ins(): AppContext {
    return this._ins ? this._ins : (this._ins = new AppContext());
  }

  public get global(): GlobalInfo {
    if (!this._global.token) {
      this._global.token = localStorage.getItem("token");
    }
    return this._global;
  }
  public setGlobal({
    token = this._global.token,
  }: {
    token?: string;
  } = {}) {
    if (token) {
      this._global.token = token;
      localStorage.setItem("token", token);
    }
  }

  /** 静态配置文件 */
  public get config(): ConfigInfo {
    return this._config;
  }
  public setConfig(info: ConfigInfo): void {
    this._config = info;
  }

  /** system 设备基础信息 */
  public get system(): SystemModel {
    return this._system;
  }

  /** 应用集 */
  public get applicationSet(): ApplicationSetModel {
    return this._applicationSet;
  }
}
/** 全局 非响应式数据 管理 */
export const appContext: AppContext = AppContext.ins;
