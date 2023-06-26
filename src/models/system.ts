
export type SystemInfo = {
  viewWidth: number;
  viewHeight: number;
}

export class SystemModel {
  private _data = <SystemInfo>{};

  constructor() { }

  public init(): void {
    const { clientWidth, clientHeight } = document.documentElement;
    this._data = {
      viewWidth: clientWidth, viewHeight: clientHeight
    }
  }

  public get data(): SystemInfo {
    return this._data;
  }
}