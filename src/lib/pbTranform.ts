import { parse } from 'protocol-buffers-schema-ts/lib/parse';
import { ToTs } from './toTs';
import { ToJson } from './toJson';

class PbTranform {
  // 解析的pb对象
  pb: object = {};
  // 解析的pb对象
  ts: object = {};
  // 类型字符串
  interStr: string = '';
  // json 字符串
  jsonStr: string = '';
  // 解析报错
  errorType: boolean = false;
  // 错误信息
  errorMsg: string = '输入proto文件格式不正确，无法解析';

  constructor(pb: string) {
    // 检测解析pb错误
    try {
      this.pb = parse(pb).toJSON();
    } catch (error) {
      this.errorType = true;
    }
  }

  // 解析pb
  parseTsStr(): string {
    if (!this.errorType) {
      // 1. 记录
      this.interStr = new ToTs(this.pb).getStr();
      return this.interStr;
    } else {
      return this.errorMsg;
    }
  }

  // 解析pb
  parseTs(): any {
    if (!this.errorType) {
      // 1. 记录
      this.ts = new ToTs(this.pb).getObj();
      return this.ts;
    } else {
      return this.errorMsg;
    }
  }

  // 解析成json
  parseJsonStr(): string {
    if (!this.errorType) {
      this.jsonStr = new ToJson(this.pb).getStr();
      return this.jsonStr;
    } else {
      return this.errorMsg;
    }
  }

  // 解析成json
  parseJson(): any {
    if (!this.errorType) {
      return new ToJson(this.pb).getJson();
    } else {
      return this.errorMsg;
    }
  }
}

export { PbTranform, ToJson, ToTs };
