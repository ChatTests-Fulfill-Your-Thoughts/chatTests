export type SystemInfo = {
  viewWidth: number;
  viewHeight: number;
  taskbarHeight: number;
};

export class SystemModel {
  private _data = <SystemInfo>{};

  constructor() {}

  public init(): void {
    const { clientWidth, clientHeight } = document.documentElement;
    this._data = {
      viewWidth: clientWidth,
      viewHeight: clientHeight - 50,
      taskbarHeight: 50,
    };
  }

  public get data(): SystemInfo {
    return this._data;
  }
}
