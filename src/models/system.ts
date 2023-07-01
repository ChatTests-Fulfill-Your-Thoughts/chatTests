export type SystemInfo = {
  viewWidth: number;
  viewHeight: number;
  taskbarHeight: number;
  wallpaper?: string;
};

export class SystemModel {
  private _data = <SystemInfo>{};

  constructor() {}

  public init(): void {
    const { clientWidth, clientHeight } = document.documentElement;

    let wallpaper = localStorage.getItem("wallpaper") || "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN";
    this._data = {
      viewWidth: clientWidth,
      viewHeight: clientHeight - 50,
      taskbarHeight: 50,
      wallpaper,
    };
  }

  public get data(): SystemInfo {
    return this._data;
  }

  public setWallpaper(wallpaper: string): void {
    localStorage.setItem("wallpaper", wallpaper);
    this._data.wallpaper = wallpaper;
  }
}
