import React from 'react';
import { Modal, Button } from 'antd';
import { ModalProps, ModalFuncProps } from 'antd/lib/modal';


declare interface IProps extends ModalProps {
    cancelType?: "default" | "primary" | "ghost" | "dashed" | "danger" | "link"
    children?: any
}

export default (props: IProps) => {
    const { onCancel, onOk, okText, okButtonProps, okType, cancelText, cancelButtonProps, cancelType } = props;

    const footerHandle = () => (<>
        <Button
            type={okType || "primary"}
            {...okButtonProps}
            onClick={(e) => onOk && onOk(e)}
        >{okText || "确定"}</Button>
        <Button
            type={cancelType || "default"}
            {...cancelButtonProps}
            onClick={(e) => onCancel && onCancel(e)}
        >{cancelText || "取消"}</Button>
    </>)


    return (
        <Modal
            centered={true}
            width={720}
            footer={
                footerHandle()
            }
            {...props}
        >
            {props.children}
        </Modal>
    )
}

declare interface IpropsConfirm extends ModalFuncProps {
    cancelType?: "danger" | "default" | "primary" | "ghost" | "dashed" | "link"
}
export const Confirm = (props: IpropsConfirm) => {
    const { onOk, onCancel, okText, okType, cancelType, cancelText, okButtonProps, cancelButtonProps } = props;
    return Modal.confirm({
        ...props,
        centered: true,
        okType: cancelType || "default",
        okText: cancelText || "取消",
        okButtonProps: {
            ...cancelButtonProps,
            type: cancelType || "default"
        },
        onOk() {
            onCancel && onCancel();
        },
        cancelText: okText || '确定',
        cancelButtonProps: {
            ...okButtonProps,
            type: okType || "primary"
        },
        onCancel() {
            onOk && onOk();
        },
        autoFocusButton: "cancel"
    })
};

export const DeleteConfirm = (props: IpropsConfirm) => {
    Confirm({
        title: "删除提醒",
        content: '此操作将永久删除, 是否继续?',
        okType: "danger",
        ...props
    })
}