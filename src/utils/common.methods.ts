/** uuid */
export function getUuid(len: number = 17) {
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .slice(0, len);
}

/**
 * 文件流 转 Base64
 * @param file
 * @returns
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e: any) => {
      resolve(String(e.target.result));
    };
  });
}

/** 格式化时间  去除时间戳的时分秒 */
export function formatDateHMS(timeStamp: string | number): number {
  const stamp = String(timeStamp).length === 11 ? Number(timeStamp) * 1000 : timeStamp;
  const date = timestampToTime(stamp, "/");
  return new Date(date).getTime();
}

export const weekName: string[] = ["日", "一", "二", "三", "四", "五", "六"];
export function getWeekName(index: number, prefix: string = "周"): string {
  return prefix + weekName[index];
}
export function timestampToWeek(timeStamp: string | number, prefix: string = "周"): string {
  const stamp = String(timeStamp).length === 13 ? Number(timeStamp) : Number(timeStamp) * 1000;
  const day = new Date(stamp).getDay();
  return getWeekName(day, prefix);
}

/** FormatDate  */
export function FormatDate(timeStamp: string | number, fmt: string = "yyyy-MM-dd hh:mm:ss") {
  const date = new Date(timeStamp);
  var o: any = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }

  return fmt;
}

/** 写入网页标题 */
export function setDocumentTitle(title: string): void {
  document.title = title;
}

/** 按指定格式格式化时间 yyyy-MM-dd hh:mm:ss */
export function formatTime(date: Date, format: string = "yyyy-MM-dd hh:mm:ss"): string {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
  };
  if (/(y+)/.test(format)) {
    //根据y的长度来截取年
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }
  return format;
}

/**
 * 格式化时间戳
 * @param timeStamp 时间戳
 * @param connector zh为中文，默认为 / ，可自定义传入连接符
 * @returns
 */
export function timestampToTime(timeStamp: string | number, connector: string = "/"): string {
  const stamp = String(timeStamp).length < 13 ? Number(timeStamp) * 1000 : timeStamp;
  const date = new Date(stamp);
  if (connector === "zh") {
    const Y = date.getFullYear() + "年";
    const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "月";
    const D = date.getDate() + "日";
    return Y + M + D;
  } else {
    const Y = date.getFullYear() + connector;
    const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + connector;
    const D = date.getDate();
    return Y + M + D;
  }
}

/**
 * 图片地址转 Base64
 * @param url
 * @param outputFormat
 * @returns
 */
export function imageUrlToBase64(url: string, outputFormat: string = "image/jpg"): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    var canvas: any = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    console.log(canvas);
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL(outputFormat);
      canvas = null;
      resolve(dataURL);
    };
    img.onerror = (err) => {
      reject(err)
    }
  });
}

/**
 * Base64 转 文件流
 * @param dataurl
 * @param filename
 * @returns
 */
export function base64toFile(dataurl: string, filename: string = "file"): File {
  const arr: any = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split("/")[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
}

// 获取assets静态资源
export function getImageUrl(url: string): string {
  return new URL(url.toString(), import.meta.url).href;
}

/**
 * 浏览器url参数转json
 * @returns
 */
export function searchToJson<T>(param: string): T {
  var newObj: any = new Object() as T;
  var strs = param.split("&");
  for (var i = 0; i < strs.length; i++) {
    newObj[strs[i].split("=")[0]] = strs[i].split("=")[1] || "";
  }
  return newObj;
}

/**
 * 按指定关键字段 去重数组
 * @param arr
 * @param key
 * @returns
 */
export function deduplication<T>(arr: T[], key: string = "uid"): T[] {
  let obj: any = {};
  return arr.filter((val: any) => (obj[val[key]] ? "" : (obj[val[key]] = true)));
}

/** 校验手机号码 */
export function regExpMobil(value: string): boolean {
  const regExp = new RegExp("^1[3578]\\d{9}$");
  return regExp.test(value);
}

/** 校验邮箱 */
export function regExpEmail(value: string): boolean {
  const regExp = new RegExp("^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$");
  return regExp.test(value);
}

/** 校验密码强度  必须包含数字、英文字母、特殊符号且大于等于6位 */
export function regExpPassword(value: string): boolean {
  var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{6,}$/;
  return regExp.test(value);
}

/** 校验 传入参数是否为图片链接 */
export function regExpImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    var ImgObj = new Image();
    ImgObj.src = src;
    ImgObj.onload = () => resolve(true);
    ImgObj.onerror = () => resolve(false);
  });
}

/** 校验 传入地址链接可访问性 */
export function regURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/** 写入粘贴板 */
export function clipboardWriteText(text: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => resolve(true));
    } else {
      // 创建text area
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // 使text area不在viewport，同时设置不可见
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy") ? resolve(true) : resolve(false);
      textArea.remove();
    }
  });
}
