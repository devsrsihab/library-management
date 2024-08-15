import React from "react";
import { Button, Col, DatePicker, Modal, Row, Form, Spin } from "antd";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { useAddToBorrowMutation } from "../../redux/features/borrow/borrowApi";
import { currentToken } from "../../redux/features/auth/authSlice";
import { AddToBorrowProps } from "../../types";
import PHForm from "../form/PHForm";



const AddToBorrow: React.FC<AddToBorrowProps> = ({
  book,
  modalOpen,
  setModalOpen,
}) => {
  const [addToBorrow, { isLoading }] = useAddToBorrowMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const authToken = useAppSelector(currentToken);

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    const loader = toast.loading("Adding To Borrow");
    if (authToken === null) {
      return toast.error("Please Login First", { id: loader, duration: 1000 });
    }
    try {
      const returnDate = dayjs(data.returnDate).format("DD-MM-YYYY");
      const borrowedDate = dayjs().format("DD-MM-YYYY");
      const borrowData = {
        book,
        returnDate,
        borrowedDate,
      };
      const result = await addToBorrow(borrowData).unwrap();
      if (result) {
        setModalOpen(false);
        toast.success("Book Borrowed Successfully", {
          id: loader,
          duration: 1000,
        });
      }
      console.log('book borrowed', result);
    } catch (error:any) {
      console.log(error);
      toast.error(error?.data?.message, { id: loader, duration: 1000 });
    }
  };

  return (
    <>
      <Modal
        title="Add Borrow Book"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]} className="mt-5">
            <Col xs={24} sm={12} md={12} lg={12}>
              <label htmlFor="returnDate">Return Date</label>
              <Controller
                name="returnDate"
                control={control}
                rules={{
                  required: "Return date is required",
                  validate: (value) => {
                    const selectedDate = dayjs(value);
                    const today = dayjs().startOf("day"); // Start of today
                    if (selectedDate.isSame(today)) {
                      return "Return date cannot be today";
                    }
                    if (selectedDate.isBefore(today)) {
                      return "Return date cannot be in the past";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.returnDate ? "error" : ""}
                    help={errors.returnDate?.message?.toString()}
                  >
                    <DatePicker
                      {...field}
                      format="DD-MM-YYYY"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Row justify="end" gutter={16}>
            <Col>
              <Button
                type="primary"
                disabled={isLoading}
                htmlType="submit"
                style={{ marginTop: "20px" }}
              >
                {isLoading ? <Spin size="small" /> : "Add Borrow"}
              </Button>
            </Col>
            <Col>
              <Button
                type="default"
                disabled={isLoading}
                onClick={() => setModalOpen(false)}
                style={{ marginTop: "20px" }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </PHForm>
      </Modal>
    </>
  );
};

export default AddToBorrow;
