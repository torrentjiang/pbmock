
declare interface subForm {
    name: string,
    type: 'list' | 'item' | undefined,
    formFieldList: Col[],
    subFormInfo: {
        pageId: string,
        isActive: 0 | 1
    }
}

export declare interface PageConf {
    apiHosts: string,
    canRedirect: 0 | 1,
    subFieldCalcName: string,
    formLayoutType: 'vertical' | 'inline',
    iframe: string,
    mainTable: string,
    pageType: 'form' | 'list'
    formOption: {
        formFieldList: Col[],
        subFormList: subForm[],
        iframe: string,
        mainTable: string,
        pageType: string
    }
}

export declare interface Col {
    comment: string,
    id: number,
    length: number,
    name: string,
    notNull: boolean,
    primary: boolean,
    tableId: number,
    type: string,
    [x: string]: any
}

export declare interface Table {
    id?: number,
    isMain: boolean,
    isMapping?: boolean,
    mainTable: string,
    moduleId: number,
    name: string,
    relation: string,
    cols: FormItem[],
    [x: string]: any
}

export declare interface FormPage {
    moduleId: number,
    pageConfig: PageConf,
    pageId: number,
    pageName: string,
    pageType: number,
    pageTables: Table[]
}

declare interface FormItemOptionsDefault {
    optionType: 'default',
    defaultOptions: {
        value: string,
        key: string
    }[],
}

declare interface FormItemOptionsApi {
    optionType: 'api',
    customUrl: string,
    dataPath: string
}

declare interface RulesDefault {
    defaultRules: string[]
}

declare interface RulesCustom {
    customRules: {
        reg: string,
        message: string
    }}

export declare interface FormItem extends Col {
    id: number,
    canEdit: boolean,
    exceptScences: Array<'add' | 'edit' | 'detail'>,
    fieldType: string,
    label: string,
    placeholder: string,
    defaultValue: string,
    name: string,
    options: FormItemOptionsDefault | FormItemOptionsApi,
    relateKey: string,
    rules: RulesDefault | RulesCustom
    [x: string]: any,
}
