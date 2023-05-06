export class ToJson {
  // 原始数据数组
  messageArr: any[] = [];
  // 转化message为json对象数组
  jsonArr: any[] = [];
  // 重复出现的数据类型数组
  repeatArr: string[] = [];
  // json对象
  jsonObj: object = {};
  // 返回的json字符串
  jsonStr: string = '';

  constructor(pb: any) {
    // 处理message
    if (pb.messages && pb.messages.length > 0) {
      this.messageArr = pb.messages;
      this.parse();
      this.replicArr();
      this.jsonArr.forEach(item => {
        this.jsonObj = { ...this.jsonObj, ...item };
      });
      this.jsonStr = JSON.stringify(this.jsonObj);
      // this.jsonStr = JSON.stringify(this.jsonArr) || "";
    }
  }

  // 外层解析
  parse(type?: string): any {
    // 1. 处理message对象
    let obj: any = {};
    this.messageArr &&
      this.messageArr.forEach(message => {
        let item: any = {};
        // 转化成json格式对象
        if (type) {
          if (type === message.name) {
            // 轮询赋值
            obj = this.transform(message);
            // 记录每一个重复使用的类型, 后期删去
            this.repeatArr.push(type);
          }
        } else {
          item[message.name] = this.transform(message);
          // 2. 处理json数组
          this.jsonArr.push(item);
        }
      });
    return obj;
  }

  replicArr() {
    // 1. 重复出现的数据去重
    this.distinct(this.repeatArr);
    for (let i = 0; i < this.jsonArr.length; i++) {
      const json = this.jsonArr[i];
      for (let j = 0; j < this.repeatArr.length; j++) {
        const repeat = this.repeatArr[j];
        if (json[repeat]) {
          this.jsonArr.splice(i, 1);
          i--;
        }
      }
    }
  }

  // 数组去重
  distinct(arr: any[]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          arr.splice(j, 1);
          j--;
        }
      }
    }
  }

  // 解析成对象
  transform(message: { fields: any[]; name: string }) {
    let obj: any = {};
    message.fields &&
      message.fields.forEach(field => {
        // 排除自调用，否则程序会崩盘
        if (message.name != field.type) {
          // repeated 表示数据是个数组
          if (field.repeated) {
            obj[field.name] = [this.transformType(field.type)];
          } else {
            obj[field.name] = this.transformType(field.type);
          }
        }
      });
    return obj;
  }

  // 转化类型
  transformType(type: string): any {
    let obj: any;
    switch (type) {
      case 'int8':
      case 'int32':
      case 'int64':
        obj = 0;
        break;
      case 'string':
      case 'double ':
        obj = '';
        break;
      case 'bool':
        obj = false;
        break;
      default:
        obj = this.parse(type);
        break;
    }
    return obj;
  }

  getStr(): string {
    return this.jsonStr;
  }

  getJson(): any {
    return this.jsonObj;
  }
}
