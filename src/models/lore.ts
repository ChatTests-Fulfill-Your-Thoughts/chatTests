import { getUuid } from "@/utils/common.methods";
import { LocalStorageInfo, SiderMenuEnum } from "./@types";

export type LoreInfo = {
  uid: string;
  subject?: string;
  questions?: LoreQuestionInfo[];
};

export type LoreQuestionInfo = {
  uid: string;
  question: string;
  answers: string[];
  analyze?: string;
};

export class LoreModel {
  private LOCAL_STORAGE_KEY = "hope-lore";
  private _data = <LocalStorageInfo<LoreInfo>>{};

  constructor() {}

  public setData(): void {
    const dataStr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this._data = dataStr ? JSON.parse(dataStr) : {};
  }

  /** 新增科目 */
  public addSubject(): void {
    const subject = "新科目" + getUuid(5);
    const uid = getUuid();
    const item: LoreInfo = { uid, subject };
    this._data.list = (this._data.list || []).concat(item);
    this.setlocalStorage("add");
  }

  public removeSubject(uid: string): void {
    this._data.list = this._data.list?.filter((val) => val.uid !== uid);
    this._data.current = this._data.list[0]?.uid || "";
    this.setlocalStorage("removeSubject");
  }

  public get currSubject(): LoreInfo {
    const { current, list } = this._data;
    return list?.find((val) => val.uid === current);
  }

  public setCurr(uid: string): void {
    this._data.current = uid;
    this.setlocalStorage("setCurr");
  }

  public addQuestion(question: string, answers: string[], analyze?: string): void {
    const { current, list } = this._data;
    const uid = getUuid();
    const item: LoreQuestionInfo = { uid, question, answers, analyze };
    this._data.list = list?.map((val) => {
      if (val.uid === current) {
        val.questions = (val.questions || []).concat(item);
      }
      return val;
    });
    this.setlocalStorage("addQuestion");
  }

  /** 清空 */
  public clear(): void {
    this._data = {};
    this.setlocalStorage("clear");
  }
  private setlocalStorage(soure: string): void {
    console.log("setlocalStoragesetloca >>> soure :", soure, this._data);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this._data));
  }
}
