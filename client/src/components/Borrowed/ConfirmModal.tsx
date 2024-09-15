import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { useRemoveBorrowBookMutation } from "../../redux/features/borrow/borrowApi";
import { toast } from "sonner";

const ConfirmModal: React.FC<{
  id: string;
  openReturn: boolean;
  setOpenReturn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openReturn, setOpenReturn, id }) => {
  const [removeBorrowBook] = useRemoveBorrowBookMutation();

  const handleOk = async () => {
    removeBorrowBook(id)
      .unwrap()
      .then(() => {
        toast.success("Book returned successfully");
      })
      .catch((err: any) => {
        toast.error(err.data.message);
      });
    setOpenReturn(false);
  };

  const handleCancel = () => {
    setOpenReturn(false);
  };

  return (
    <>
      <Modal
        title={
          <span>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: "8px" }}
            />
            Confirm
          </span>
        }
        visible={openReturn}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Return"
        cancelText="Cancel"
        cancelButtonProps={{
          style: {
            backgroundColor: "#ff4d4f", // Background color for cancel button
            color: "#fff", // Text color for cancel button
            border: "none", // Remove border for cancel button
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#15616d", // Background color for OK button
            color: "#fff", // Text color for OK button
            border: "none", // Remove border for OK button
          },
        }}
      >
        <p>
          Are you sure you want to return this book? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  );
};

export default ConfirmModal;
