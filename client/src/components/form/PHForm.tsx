import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
  defaultValues?: Record<string, any>;
  resolver?: any;
  resetData?: any;
};

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  resetData,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  useEffect(() => {
    if (resetData) {
      methods.reset(resetData); // Reset the form with the new data
    }
  }, [resetData, methods]);

  const submit: SubmitHandler<FieldValues> = async (data) => {
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
