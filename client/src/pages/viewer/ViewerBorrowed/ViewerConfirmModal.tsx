import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { toast } from "sonner";
import { useRemoveBorrowBookMutation } from "../../../redux/features/borrow/borrowApi";

const ViewerConfirmModal: React.FC<{
  id: string;
  openReturn: boolean;
  setOpenReturn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openReturn, setOpenReturn, id }) => {
  const [removeBorrowBook] = useRemoveBorrowBookMutation();

  const handleOk = async () => {
    console.log("Book returned");
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
      >
        <p>
          Are you sure you want to return this book? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  );
};

export default ViewerConfirmModal;
