import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.Api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.Api";
import { toast } from "sonner";


const formDefaultValue = {
  name: {
    firstName: "Ivor",
    middleName: "Theodore Walter",
    lastName: "Bartlett",
  },
  gender: "others",
  bloodGroup: "O+",
  email: "naroxav@mailinator.com",
  contactNo: "Officia accusamus qu",
  emergencyContact: "Sed sint veniam rep",
  presentAddress: "Sed sint ratione eu",
  permanentAddress: "Velit lorem possimus",
  guardian: {
    fatherName: "Brandon Myers",
    fatherOccupation: "Ea pariatur A sunt",
    fatherContactNo: "Aliquip ipsum est d",
    motherName: "Noble Carlson",
    motherContactNo: "Architecto sit et in",
    motherOccupation: "Ut nemo omnis amet ",
  },
  localGuardian: {
    name: "Asher Carr",
    occupation: "Ducimus excepturi s",
    contact: "Et blanditiis irure ",
    address: "Sunt et qui natus v",
  },
  admissionSemester: "665f87acf1c46f19487dc2db",
  academicDepartment: "665f87fef1c46f19487dc2e9",
};








const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation();
  const { data: semesters, isLoading: isLoadingSemesters } =
    useGetAllSemesterQuery(undefined);
  const { data: departments, isLoading: isLoadingDepartments } =
    useGetAllAcademicDepartmentQuery(undefined);

  const academicSemesterOptions = semesters?.data?.map((semester) => ({
    value: semester._id,
    label: `${semester.name} ${semester.year}`,
  }));

  const academicDepartmentOptions = departments?.data?.map((department) => ({
    value: department._id,
    label: department.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Student Creating...", { duration: 1000 });
    try {
      console.log(data);
      const studentData = {
        password: "12122ddewe",
        student: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(studentData));
      formData.append("file", data.image);
      await addStudent(formData);

      toast.success("Student Created Successfully", { id: loader });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { id: loader });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm defaultValues={formDefaultValue} onSubmit={onSubmit}>
          <Row gutter={8}>
            {/* ======= Personal info========== */}
            <Divider>Personal Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="First Name" name="name.firstName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Middle Name" name="name.middleName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Last Name" name="name.lastName" type="text" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect label="Gender" name="gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label="Date Of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Email" name="email" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>

            {/* ======= Contact info========== */}
            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Contact No" name="contactNo" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Emergency Contact"
                name="emergencyContact"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Present Address"
                name="presentAddress"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Permanent Address"
                name="permanentAddress"
                type="text"
              />
            </Col>

            {/* ======= Gurdian info========== */}
            <Divider>Gurdian Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father Name"
                name="guardian.fatherName"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father Occupation"
                name="guardian.fatherOccupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father ContactNo"
                name="guardian.fatherContactNo"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Mother Name"
                name="guardian.motherName"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Mother Contact No"
                name="guardian.motherContactNo"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Mother Occupation"
                name="guardian.motherOccupation"
                type="text"
              />
            </Col>

            {/* ======= Local Gurdian info========== */}
            <Divider>Local Gurdian Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father Name"
                name="localGuardian.name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father Occupation"
                name="localGuardian.occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father ContactNo"
                name="localGuardian.contact"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Mother Name"
                name="localGuardian.address"
                type="text"
              />
            </Col>

            {/* ======= Semester & Department info========== */}
            <Divider>Semester & Department Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Academic Semester"
                name="admissionSemester"
                options={academicSemesterOptions}
                disabled={isLoadingSemesters}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={academicDepartmentOptions}
                disabled={isLoadingDepartments}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
