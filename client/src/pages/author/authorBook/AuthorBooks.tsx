import { Button, Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBookByAuthorQuery } from "../../../redux/features/book/bookApi";
import { TBookingTableData } from "../../../types";
import BookConfirmationModal from "../../../components/book/BookConfirmationModal";
import { useMediaQuery } from "react-responsive";

const AuthorBooks = () => {
  const [openReturn, setOpenReturn] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data: bookData, isFetching } = useGetAllBookByAuthorQuery([
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
        <img src={image} alt="image" className="w-20 h-20 object-cover" />
      ),
    },
    {
      title: "Action",
      key: "x",
      render: (item) => (
        <div className="flex gap-2">
          <Link to={`/author/books-edit/${item._id}`}>
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

  const mobileColumns: TableColumnsType<TBookingTableData> = [
    {
      title: "Book Details",
      key: "details",
      render: (item) => (
        <div className="flex flex-col gap-2">
          <p>
            <strong>Name:</strong> {item.name}
          </p>
          <p>
            <strong>Category:</strong> {item.category}
          </p>
          <p>
            <strong>Author:</strong> {item.author}
          </p>
          <p>
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <img
            src={item.image}
            alt="image"
            className="w-20 h-20 object-cover"
          />
          <div className="flex gap-2 mt-2">
            <Link to={`/author/books-edit/${item._id}`}>
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
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        loading={isFetching}
        columns={isMobile ? mobileColumns : columns}
        dataSource={tableData}
        rowKey="_id"
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
        scroll={{ x: isMobile ? undefined : "max-content" }}
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
      {selectedId && (
        <BookConfirmationModal
          id={selectedId}
          openReturn={openReturn}
          setOpenReturn={setOpenReturn}
        />
      )}
    </div>
  );
};

export default AuthorBooks;
