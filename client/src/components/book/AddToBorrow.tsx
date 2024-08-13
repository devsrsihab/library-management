import React from "react";
import { Button, Col, DatePicker, Modal, Row, Form, Spin } from "antd";
import { AddToBorrowProps } from "../../types";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import PHForm from "../form/PHForm";
import dayjs from "dayjs";
import { useAddToBorrowMutation } from "../../redux/features/borrow/borrowApi";
import { toast } from "sonner";

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

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    const loader = toast.loading("Adding To Borrow");
    try {
      const returnDate = dayjs(data.returnDate).format("DD-MM-YYYY");
      const borrowedDate = dayjs().format("DD-MM-YYYY");
      const borrowData = {
        book,
        returnDate,
        borrowedDate,
      };
      await addToBorrow(borrowData);
      setModalOpen(false);
     toast.success("Book Borrowed Successfully", { id: loader });

    } catch (error) {
      console.log(error);
      setModalOpen(false);
      
      toast.error("Something Went Wrong", { id: loader });
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
