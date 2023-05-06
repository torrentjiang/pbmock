declare type Rules = {
    deafultRules: {
        type: string,
        message: string
    }[],
    customRules: string
};

export declare interface FormTypeItem {
    label: string,
    type: string,
    placeholder: string,
    defaultValue: string,
    dataBaseKeyName: string,
    rules: Rules
}

export declare interface Input extends FormTypeItem {}

export declare interface Select extends FormTypeItem {}

export declare interface DatePicker extends FormTypeItem {}

export declare interface TimePicker extends FormTypeItem {}

export declare interface DateTimePicker extends FormTypeItem {}

export declare interface MonthPicker extends FormTypeItem {}

export declare interface Range extends FormTypeItem {}

export declare interface Radio extends FormTypeItem {}

export declare interface Checkbox extends FormTypeItem {}

export declare interface Upload extends FormTypeItem {}