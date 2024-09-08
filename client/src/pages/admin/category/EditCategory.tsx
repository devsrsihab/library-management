import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Form, Input } from "antd";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import {
  useGetSingleFacilitieQuery,
  useUpdateFacilitieMutation,
} from "../../../redux/features/facilitie/facilitieApi";
import { TFacilitie } from "../../../types/facilitie.type";
import cloudinaryUpload from "../../../utils/cloudinaryUpload";
import { useNavigate, useParams } from "react-router-dom";
import PulsLoader from "../../../components/shared/loader/PulsLoader";

const EditCategory = () => {
  const { id } = useParams();
   const navigation = useNavigate();
  const { data, isLoading } = useGetSingleFacilitieQuery(id, { skip: !id });
  const facilitie = data?.data;
  const [updateFacilitie, { isLoading: isFacilitieUpdating }] = useUpdateFacilitieMutation();

  const onSubmi: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Creating facility...");

    let imageUpCloud;
    if (data.image) {
      imageUpCloud = await cloudinaryUpload(data.image);
    }

    const formData = {
      name: data.name ? data.name : facilitie?.name,
      description: data.description ? data.description : facilitie?.description,
      location: data.location ? data.location : facilitie?.location,
      pricePerHour: Number(data.pricePerHour) ? Number(data.pricePerHour) : facilitie?.pricePerHour,
      availableSlots: Number(data.availableSlots) ? Number(data.availableSlots) : facilitie?.availableSlots,
      image: imageUpCloud ? imageUpCloud : facilitie?.image,
    };
    console.log(formData);

    try {
      const res = (await updateFacilitie({id, 
        formData}
      )) as TResponseRedux<TFacilitie>;

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Semester created successfully", { id: loader });
         navigation("/admin/facilities");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: loader });
    }
  };

  return (
    <>
      {isLoading ? (
        <PulsLoader />
      ) : (
        <Flex justify="center" align="center">
          <Col span={8}>
            <PHForm onSubmit={onSubmi}>
              <PHInput
                value={facilitie?.name}
                label="Name"
                name="name"
                type="text"
              />
              <PHInput
                value={facilitie?.description}
                label="Description"
                name="description"
                type="text"
              />
              <PHInput
                value={facilitie?.location}
                label="Location"
                name="location"
                type="text"
              />
              <PHInput
                value={facilitie?.pricePerHour}
                label="Price Per Hour"
                name="pricePerHour"
                type="text"
              />
              <PHInput
                value={facilitie?.availableSlots}
                label="Available Slots"
                name="availableSlots"
                type="text"
              />

              <div className="w-full py-8">
                <img src={facilitie?.image} />
              </div>

              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />

              <Button disabled={isFacilitieUpdating} htmlType="submit">Submit</Button>
            </PHForm>
          </Col>
        </Flex>
      )}
      ;
    </>
  );
};

export default EditCategory;
