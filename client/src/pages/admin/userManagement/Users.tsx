import { Pagination, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllUsersQuery } from "../../../redux/features/admin/userManagement.Api";
import { TQueryParams, TTableData, TUser } from "../../../types";

const Users = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[] | undefined>([]);

  // user query 
  const queryOfUsers = [
    { name: "limit", value: 5 },
    { name: "page", value: page },
    ...(params || []),
  ] as TQueryParams[];

  // user data fetch
  const { data: adminsData, isFetching } = useGetAllUsersQuery(queryOfUsers);
  
  //  user data columns
  const tableData = adminsData?.data?.map(
    ({ _id, name, email, image, role }: TUser) => ({
      _id,
      name,
      email,
      image,
      role,
    })
  );
  
  // meta data for pagination
  const metaData = adminsData?.meta;
  
  // table data render
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
      title: "Role",
      key: "role",
      dataIndex: "role",
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "Author",
          value: "author",
        },
        {
          text: "Viewer",
          value: "viewer",
        },
      ],
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image}
          alt="image"
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
  ];
 
  // conghange event for filter sort and pagiantion
  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryRoleParams = filters.role?.map((item) => ({
        name: "role",
        value: item,
      }));
      setParams(queryRoleParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
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

export default Users;
