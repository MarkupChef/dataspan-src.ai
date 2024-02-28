import { Modal as AntdModal, ModalProps } from 'antd';
import { FC, useState } from 'react';

const Modal: FC<ModalProps> = ({ children, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AntdModal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} {...props}>
        {children}
      </AntdModal>
    </>
  );
};

export default Modal;
