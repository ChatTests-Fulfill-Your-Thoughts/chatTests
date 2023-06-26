export const config = {
  httpHost: "https://www.13042332817.top/",
  cwjiaoyu: " https://www.cwjiaoyu.cn/",

  httpHostTest: "http://192.168.1.41:9180", // 本地

  version: "1.0",
};
export enum Uri {
  FileApi_Share = "fileApi/share/",

}

export enum Method {
  Add = "add",
  Delete = "delete",
  Updated = "updated",
  List = "list",
  Get = "get",
  Token = "token",
  Register = "register",
  ForgotPassword = "forgotpassword",
  Login = "login",
  LoginOut = "loginOut",
  Password = "password",
  Code = "code",
  Upload_File = "upload_file",

}

export enum RespResultCode {
  Success = 0,
  Error = 1,
  TokenEmpty = 2,
  TokenExpire = 3,
  TokenMiss = 4,
}

export enum NetStatusCode {
  Success = 200,
  Error = 500,
}

export interface StatusResp {
  code: RespResultCode;
  error: string;
  token: string;
}

export interface StatusInfo {
  code: number;
  error: string;
}

export type RespInfo<T> = {
  info: T;
  list: T[];
  total?: number;
  page?: number;
  status: StatusInfo;
};

