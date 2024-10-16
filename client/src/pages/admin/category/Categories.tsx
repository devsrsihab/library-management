import { Button, Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TCategoryTableData } from "../../../types";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import CategoryConfirmationModal from "../../../components/category/CategoryConfirmationModal";
import { useMediaQuery } from "react-responsive";

const Categories = () => {
  const [openReturn, setOpenReturn] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { data: categoryData, isFetching } = useGetAllCategoryQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
  ]);

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
        <img src={image} alt="image" className="w-16 h-8 object-cover" />
      ),
    },
    {
      title: "Action",
      key: "x",
      render: (item) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/admin/categories-edit/${item._id}`}>
            <Button
              size={isMobile ? "small" : "middle"}
              className="bg-blue-500 text-white"
            >
              Edit
            </Button>
          </Link>
          <Button
            size={isMobile ? "small" : "middle"}
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
    <div className="overflow-x-auto">
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        rowKey="_id"
        pagination={false}
        scroll={{ x: "max-content" }}
        size={isMobile ? "small" : "middle"}
      />

      <div className="mt-8 flex justify-center">
        <Pagination
          onChange={(value) => setPage(value)}
          current={page}
          pageSize={metaData?.limit}
          total={metaData?.total}
          size={isMobile ? "small" : "default"}
          responsive
        />
      </div>
    </div>
  );
};

export default Categories;
