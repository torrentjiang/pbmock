import {Modal} from 'antd';

declare type Conf = {
    title: string,
    okText?: string,
    cancelText?: string
};

export default (conf?: Conf): Promise<boolean> => {
    conf = Object.assign({
        title: '是否确认删除',
        okText: '确认',
        cancelText: '取消',
    }, conf || {});
    return new Promise(res => {
        Modal.confirm({
            ...conf,
            onCancel() {
                res(false);
            },
            onOk() {
                res(true);
            }
        });
    });
};