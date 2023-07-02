import { LocalStorageInfo } from "./@types";
import { NotifyOption, NotifyType, appNotify } from "./app.notify";

export type ApplicationInfo = {
  appid: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex?: number;
};


/**
 * 设计思想
 * 
 */
export class ApplicationSetModel {
  private LOCAL_STORAGE_KEY = "hope-application";
  private _data = <LocalStorageInfo<ApplicationInfo>>{};

  public init(): void {
    const dataStr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this._data = dataStr ? JSON.parse(dataStr) : {};
  }

  public get current(): string {
    return this._data.current;
  }

  public setCurrent(appid: string): void {
    this._data.current = appid;
    this.setlocalStorage("setCurrent");
  }

  public get num(): number {
    const index = this._data.list?.length + 1 || 1;
    console.log(index);
    return index;
  }

  public getApplication(appid: string): ApplicationInfo {
    if (!this._data.list?.length) this.init();
    return this._data.list.find((val) => val.appid === appid);
  }

  public get applications(): ApplicationInfo[] {
    if (!this._data.list?.length) this.init();
    return this._data.list;
  }

  /** 应用初始化注册 */
  public register(data: ApplicationInfo): void {
    if (this._data.list?.some((val) => val.appid === data.appid)) {
      return;
    } else {
      data.zIndex = this.num;
      this._data.list = (this._data.list || []).concat(data);
    }
    this.setlocalStorage("应用初始化注册");
  }

  public setApplication(data: ApplicationInfo): void {
    if (this._data.list?.some((val) => val.appid === data.appid)) {
      this._data.list = this._data.list?.map((val) => {
        if (val.appid === data.appid) {
          val = data;
        }
        if (this._data.current !== data.appid) {
          if (val.appid === data.appid) {
            val.zIndex = this.num;
          } else {
            val.zIndex > 0 ? val.zIndex-- : null;
          }
        }
        return val;
      });
    } else {
      this._data.list = (this._data.list || []).concat(data);
    }
    this._data.current = data.appid;
    this.setlocalStorage("setApplication");
    appNotify.send(NotifyType.ApplicationRenew, NotifyOption.Empty);
  }

  private setlocalStorage(soure: string): void {
    console.log("setlocalStoragesetloca >>> soure :", soure, this._data);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this._data));
    appNotify.send(NotifyType.Application, NotifyOption.Init);
  }
}

// export class ApplicationModel {
//   private _data = <ApplicationInfo>{};

//   constructor(data?: ApplicationInfo) {
//     this.setData(data);
//   }

//   public get data(): ApplicationInfo {
//     return this._data;
//   }
//   public setData(data: ApplicationInfo): void {
//     this._data = data;
//   }
// }
