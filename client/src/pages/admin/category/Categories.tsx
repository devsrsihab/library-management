import { Button, Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TCategoryTableData } from "../../../types";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import CategoryConfirmationModal from "../../../components/category/CategoryConfirmationModal";

const Categories = () => {
  const [openReturn, setOpenReturn] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data: categoryData, isFetching } = useGetAllCategoryQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
  ]);

  console.log(categoryData);

  const tableData = categoryData?.data?.map(({ _id, name, image }) => ({
    _id,
    name,
    image,
  }));
  const metaData = categoryData?.meta;

  const columns: TableColumnsType<TCategoryTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="image" className="w-20 h-10 object-cover" />
      ),
    },
    {
      title: "Action",
      key: "x",
      render: (item) => (
        <div className="flex gap-2">
          <Link to={`/admin/categories-edit/${item._id}`}>
            <Button className="bg-blue-500 text-white">Edit</Button>
          </Link>
          <Button
            onClick={() => {
              setSelectedId(item._id);
              setOpenReturn(true);
            }}
            className="bg-red-500 text-white"
          >
            Delete
          </Button>
          {selectedId === item._id && (
            <CategoryConfirmationModal
              id={item._id}
              openReturn={openReturn}
              setOpenReturn={setOpenReturn}
            />
          )}
        </div>
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

export default Categories;
