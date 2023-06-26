import axios, { AxiosResponse, ResponseType } from "axios";
import { NetStatusCode, config, StatusResp, RespResultCode } from "./config";

export interface ErrorInfo {
  status: NetStatusCode;
  errMsg: string;
  code: number;
}

export type BaseRespInfo = {
  code: RespResultCode;
  data: any;
  message: string;
};

export class BaseServices {
  constructor() { }

  private header(ContentType: string = 'application/json'): any {
    // const token = appContext.global.token;
    return {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": ContentType,
      // token,
    };
  }
  /**
   * 网络请求统一处理
   * @param url 地址
   * @param data 参数
   * @param ContentType 格式
   * @param responseType  ResponseType 返回格式
   * @returns
   */
  public request<T>(uri: string, data: Object, ContentType: string = "application/json", responseType?: ResponseType, method: "POST" | "OPTIONS" | "GET" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT" = "POST", headers?: any): Promise<T> {
    headers = this.header(ContentType);
    const url = uri;
    console.log(data);
    return new Promise<T>((resolve, reject) => {
      axios({ url, method, data, headers, responseType })
        .then((response: AxiosResponse) => {
          if (this.checkResp(response)) {
            resolve(response.data as T);
          } else {
            reject(response);
          }
        })
        .catch((err) => {
          console.error("request error", err);
          reject(err);
        });
    });
  }
  public get<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      axios
        .get(url)
        .then((res: any) => {
          if (this.checkResp(res.data?.status)) {
            resolve(res.data as T);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 流数据请求
   * @param url 
   * @param data 
   * @param onDataReceived 流数据接收中
   * @param end            流数据结束时 
   * @param method 
   */
  public stream(url: string, data: Object, onDataReceived: (data: string) => void, end?: (data: string) => void,
    method: "POST" | "OPTIONS" | "GET" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT" = "POST"): void {
    let res = '';
    fetch(url, { method, headers: this.header(), body: JSON.stringify({ ...data }) }).then(function (response) {
      var reader = response.body.getReader();
      function read() {
        return reader.read().then(function (result) {
          if (result.done) {
            // 流数据结束时
            if (end) end(res);
            return;
          }
          let chunk = result.value;
          // 创建一个 TextDecoder 对象，并指定要使用的字符编码为 UTF-8
          var decoder = new TextDecoder('utf-8');
          // 使用 TextDecoder 对象将 Uint8Array 数据解码为字符串
          res += decoder.decode(chunk);
          onDataReceived(res);
          // 继续读取下一个块
          return read();
        });
      }
      return read();
    }).catch(function (error) {
      console.log(error);
      if (end) end(error);
    });
  }

  private checkResp(res: AxiosResponse<BaseRespInfo>): boolean {
    if (res.status === 200) {
      // 因源服务器无法统一，故接口逻辑应该独立判断
      // const { code, message } = res.data;
      // // if (data.token) AppContext.instance.setGlobal({ token: data.token });  // 更新token
      // if (code !== RespResultCode.Success) {
      //   if ([RespResultCode.TokenEmpty, RespResultCode.TokenExpire, RespResultCode.TokenMiss].includes(code)) {
      //     localStorage.removeItem("token");
      //     router.replace("/login");
      //   }
      //   return false;
      // }
      return true;
    }
    return false;
  }
}
