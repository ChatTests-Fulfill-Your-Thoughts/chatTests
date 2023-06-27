import { appRef } from "@/models/app.ref";
import { BaseServices } from "./base.services";
import { ChatMessage } from "@/models/@types";

export class ChatService extends BaseServices {
  private static _ins: ChatService = new ChatService();
  public static get ins(): ChatService {
    return this._ins ? this._ins : (this._ins = new ChatService());
  }

  /**
   * 发送消息, 以流数据形式返回
   */
  public message(message: ChatMessage[], chunk: (data: string) => void, end: (data: string) => void): void {
    const url = "https://www.gaosijiaoyu.cn/message";
    const data = { message, user_key: appRef.user.data.openai_key };
    return this.stream(url, data, chunk, end);
  }
}

export const chatService: ChatService = ChatService.ins;
