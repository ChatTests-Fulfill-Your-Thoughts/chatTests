export enum NotifyType {
  /** 用户 */
  UserInfo = "userInfo",
  /** 应用 */
  Application = "application",
  /** 点击应用 */
  ApplicationClick = "applicationClick",
  /** 壁纸 */
  Wallpaper = "wallpaper",
}

export enum NotifyOption {
  Empty = "empty",
  Init = "init",
  Reply = "reply",
  Updated = "updated",
  Clear = "clear",
  Delete = "delete",
  Click = "click",
}

export class Observer {
  private callback: Function;
  private context: any = null;

  public constructor(fun: Function, ctx: string) {
    this.callback = fun;
    this.context = ctx;
  }

  public notify(opt: NotifyOption, msg: string): void {
    this.callback.call(this.context, opt, msg);
  }

  public compare(ctx: any): boolean {
    return this.context == ctx;
  }
}

export class AppNotify {
  private static _ins: AppNotify;
  private listerners: Map<NotifyType, Observer[]>;
  constructor() {
    this.listerners = new Map<NotifyType, Observer[]>();
  }

  public static get ins(): AppNotify {
    return this._ins ? this._ins : (this._ins = new AppNotify());
  }
  public addListener(notify: NotifyType, callback: Function, ctx: any): void {
    const key = notify;
    if (!this.listerners.has(key)) {
      this.listerners.set(key, []);
    }
    const list = this.listerners.get(key);
    if (!list) return;
    for (const item of list) {
      if (item.compare(ctx)) return;
    }
    list.push(new Observer(callback, ctx));
  }

  public removeListener(notify: NotifyType, ctx: any): void {
    const key = notify;
    if (!this.listerners.has(key)) return;
    const list = this.listerners.get(key);
    if (!list) return;
    for (let i = 0; i < list.length; i++) {
      if (list[i].compare(ctx)) {
        list.splice(i, 1);
        break;
      }
    }
    if (list.length < 1) this.listerners.delete(key);
  }
  public send(notify: NotifyType, opt: NotifyOption, msg?: string) {
    const key = notify;
    if (!this.listerners.has(key)) return;
    const list = this.listerners.get(key);
    if (!list) return;
    for (const item of list) {
      item.notify(opt, msg);
    }
  }
}

/** 全局观察者 */
export const appNotify: AppNotify = AppNotify.ins;
