import { Button, Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBookQuery } from "../../../redux/features/book/bookApi";
import { TBookingTableData } from "../../../types";
import BookConfirmationModal from "../../../components/book/BookConfirmationModal";
import { useMediaQuery } from "react-responsive";

const Books = () => {
  const [openReturn, setOpenReturn] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data: bookData, isFetching } = useGetAllBookQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
  ]);

  const tableData = bookData?.data?.map(
    ({ _id, name, category, author, quantity, image }) => ({
      _id,
      name,
      category: category?.name,
      author: author?.name ? author?.name : "N/A",
      quantity,
      image,
    })
  );
  const metaData = bookData?.meta;

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const columns: TableColumnsType<TBookingTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Author Name",
      key: "author",
      dataIndex: "author",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="image" className="w-16 h-16 object-cover" />
      ),
    },
    {
      title: "Action",
      key: "x",
      render: (item) => (
        <div className="flex gap-2">
          <Link to={`/admin/books-edit/${item._id}`}>
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
            <BookConfirmationModal
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
        showSorterTooltip={{ target: "sorter-icon" }}
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

export default Books;
