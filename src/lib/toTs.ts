export class ToTs {
  interObj: object = {};
  interStr: string = '';

  constructor(pb: any) {
    if (pb.messages && pb.messages.length > 0) {
      this.parse(pb.messages);
    }
  }

  // 处理外层
  parse(messages: any[]) {
    messages.forEach((message: any) => {
      this.interStr += `export interface ${message.name} {
    ${this.transform(message.fields)}
}
`;

      this.interObj = {
        ...this.interObj,
        [`${message.name}`]: `export interface ${message.name} {
    ${this.transform(message.fields)}
}
`
      };
    });
  }

  // 处理内容
  transform(fields: any[]): string {
    let str: string = '';
    fields &&
      fields.forEach((field, index) => {
        // ts的第一行不换行
        if (index === 0) {
          // 判断是不是数组
          if (field.repeated) {
            str += `${field.name} : ${this.transformType(field.type)}[]`;
          } else {
            str += `${field.name} : ${this.transformType(field.type)}`;
          }
        } else {
          // 判断是不是数组
          if (field.repeated) {
            str += `
    ${field.name} : ${this.transformType(field.type)}[]`;
          } else {
            str += `
    ${field.name} : ${this.transformType(field.type)}`;
          }
        }
      });
    return str;
  }

  // 处理类型
  transformType(type: string): string {
    let str: string = '';
    switch (type) {
      case 'int8':
      case 'int32':
      case 'int64':
        str = 'number';
        break;
      case 'string':
      case 'double ':
        str = 'string';
        break;
      case 'bool':
        str = 'boolean';
        break;
      default:
        str = type;
        break;
    }
    return str;
  }

  getObj() {
    return this.interObj;
  }

  getStr() {
    return this.interStr;
  }
}
