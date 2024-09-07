import { Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllAdminsQuery } from "../../../redux/features/user/userApi";
import { TUser } from "../../../types/user.type";

const Authors = () => {
  const [page, setPage] = useState(1);

  const { data: adminsData, isFetching } = useGetAllAdminsQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
  ]);

  type TTableData = Pick<TUser, "_id" | "name" | "email" | "image">;

  const tableData = adminsData?.data?.map(
    ({ _id, name, email, image }: TUser) => ({
      _id,
      name,
      email,
      image,
    })
  );
  const metaData = adminsData?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      render: (_: any, __: TTableData, index: number) =>
        (page - 1) * 5 + index + 1,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="image" className="w-10 h-10 object-cover" />
      ),
    },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        rowKey="_id"
        pagination={false}
      />

      <div className="mt-8 flex justify-center">
        <Pagination
          onChange={(value) => setPage(value)}
          current={page}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
      </div>
    </>
  );
};

export default Authors;
