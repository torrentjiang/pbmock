import {FormItem, Table} from './form';

export declare interface List {
    clip: number,
    formPageId: number,
    listOption: {
        cols: Table['cols'],
        ops: {
            type: 'detail' | 'edit'
        }[]
    },
    mainTable: string,
    needIntialList: boolean,
    pageType: 'form' | 'list',
    searchFormOption: {
        formFieldList: FormItem[],
        interfaceUrl: string,
        layoutType: 'horizontal' | 'vertical'
    },
    selectOptions: {
        [x: string]: any
    },
    tableHeadOps: {
        type: 'add' | 'export'
    }[]
}