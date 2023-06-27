import { getUuid } from "@/utils/common.methods";
import { ChatMessage, LocalStorageInfo, SiderMenuEnum } from "./@types";

export type LoreInfo = {
  uid: string;
  subject: string; // 科目。领域
  range: string;   // 范围
  questions?: LoreQuestionInfo[];
};

export type LoreQuestionInfo = {
  uid: string;
  topic: string;
  A: string;
  B: string;
  C: string;
  D: string;
  correct: number; // 正确答案
  analyze?: string;
};

export class LoreModel {
  private LOCAL_STORAGE_KEY = "hope-lore";
  private _data = <LocalStorageInfo<LoreInfo>>{};

  private _subject: string = '学前教育' || ' 软件设计师';
  private _range: string = '综合素质' || '面向对象技术、软件工程、项目管理、数据结构和算法基础、计算机体系结构、信息安全&网络、程序设计语言&编译器、操作系统、数据库系统知识产权与标准化、相关领域英语材料完型填空'

  constructor() { }

  public setData(): void {
    const dataStr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this._data = dataStr ? JSON.parse(dataStr) : {};
  }

  /** 新增科目 */
  public addSubject(subject: string = this._subject, range: string = this._range): void {
    const uid = getUuid();
    const item: LoreInfo = { uid, subject, range };
    this._data.list = (this._data.list || []).concat(item);
    this._data.current = uid;
    this.setlocalStorage("add");
  }

  public removeSubject(uid: string): void {
    this._data.list = this._data.list?.filter((val) => val.uid !== uid);
    this._data.current = this._data.list[0]?.uid || "";
    this.setlocalStorage("removeSubject");
  }

  public get currSubject(): LoreInfo {
    if (!this._data?.current) { this.addSubject() }
    const { current, list } = this._data;
    return list?.find((val) => val.uid === current);
  }

  public setCurr(uid: string): void {
    this._data.current = uid;
    this.setlocalStorage("setCurr");
  }

  public addQuestion(item: LoreQuestionInfo): void {
    const { current, list } = this._data;
    item.uid = getUuid();
    this._data.list = list?.map((val) => {
      if (val.uid === current) {
        val.questions = (val.questions || []).concat(item);
      }
      return val;
    });
    this.setlocalStorage("addQuestion");
  }

  public get newQuestionPrompt(): ChatMessage[] {
    const { subject, range, questions } = this.currSubject;
    const exclude: string = questions?.reduce((prev, curr) => prev + curr.topic, '')
    return [
      {
        role: "system",
        content: `你是一个备考专家，需要为用户提供出单选题的服务，并排除用###符号分割的题干。
        每个题目需要有以下几个要素：
        1. 题干；
        2. A选项；
        3. B选项；
        4. C选项；
        5. D选项；
        6. 正确选项的数字表示(1代表A，2代表B，3代表C，4代表D)；
        7. 解析，50字以上，不超过200个词；
        以JSON格式提供你的输出，包含以下键：topic(题干)，A(选项内容)，B(选项内容)，C(选项内容)，D(选项内容)correct(正确选项数字)，analyze(解析)

        举例输出JSON 如下：
        {
          "topic": "以下关于好的软件设计原则的叙述中，不正确的是（）。",
          "A": "模块化",
          "B": "集中化",
          "C": "提高模块独立性",
          "D": "提高抽象层次",
          "correct": 2,
          "analyze": "好的软件设计原则是指为了提高软件可维护性、可读性、可扩展性、可重用性等而遵循的一些设计原则或思想。其中，常见的设计原则包括模块化、提高模块独立性、提高抽象层次等。模块化是指将整个软件系统划分为若干个功能模块，每个模块具有完整的功能结构，便于开发和维护。提高模块独立性则是指让每个模块尽可能独立，降低模块之间的耦合度，从而提高系统的可扩展性和可维护性。提高抽象层次则是指使用抽象的设计方式，将问题抽象成更加通用、高层次的概念或模块，使得系统变得更加灵活和可扩展。而集中化则不是一个好的软件设计原则。过于集中的设计可能会导致系统的单点故障、性能瓶颈等问题，降低了系统的可靠性和可扩展性。"
        }`,
      },
      {
        role: "user",
        content: '请随机给出一个' + subject + '的题目，范围是' + range + '; 排除已经出过的题目 ###' + exclude + '###',
      },
    ] as ChatMessage[]
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
