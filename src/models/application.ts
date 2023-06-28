import { Registry } from "@/config/base";

export type ApplicationInfo = {
  appid: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex?: number;
}

export class ApplicationSetModel {
  private LOCAL_STORAGE_KEY = "hope-application";
  private _list: ApplicationInfo[] = [];

  public init(): void {
    const dataArr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (dataArr?.length) {
      JSON.parse(dataArr)?.map((val: ApplicationInfo) => {
        this._list = (this._list || []).concat(val);
      })
    }
  }

  public get num(): number {
    return this._list?.length + 1 || 1;
  }

  public getApplication(appid: string): ApplicationInfo {
    if (!this._list?.length) this.init();
    return this._list.find(val => val.appid === appid)
  }

  public setApplication(data: ApplicationInfo): void {
    data.zIndex = this.num;
    if (this._list?.length) {
      this._list = this._list?.map(val => {
        if (val.appid === data.appid) { val = data } else { val.zIndex-- }
        return val;
      })
    } else {
      this._list = [data];
    }
    this.setlocalStorage('setApplication')
  }

  private setlocalStorage(soure: string): void {
    console.log("setlocalStoragesetloca >>> soure :", soure, this._list);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this._list));
  }
}


export class ApplicationModel {
  private _data = <ApplicationInfo>{};

  constructor(data?: ApplicationInfo) {
    this.setData(data);
  }

  public get data(): ApplicationInfo {
    return this._data;
  }
  public setData(data: ApplicationInfo): void {
    this._data = data;
  }


}