import { Button, Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllFacilitieQuery } from "../../../redux/features/facilitie/facilitieApi";
import { TFacilitie } from "../../../types/facilitie.type";
import FacilitieConfirmationModal from "../../../components/Facilities/FacilitieConfirmationModal";
import { Link } from "react-router-dom";

const Categories = () => {
  const [openReturn, setOpenReturn] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data: facilitieData, isFetching } = useGetAllFacilitieQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
  ]);

  type TTableData = Pick<
    TFacilitie,
    "name" | "_id" | "location" | "pricePerHour" | "availableSlots"
  >;

  const tableData = facilitieData?.data?.map(
    ({ _id, name, location, pricePerHour, availableSlots }) => ({
      _id,
      name,
      location,
      pricePerHour,
      availableSlots,
    })
  );
  const metaData = facilitieData?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
    },
    {
      title: "Price Per Hour",
      key: "pricePerHour",
      dataIndex: "pricePerHour",
    },
    {
      title: "Available Slots",
      key: "availableSlots",
      dataIndex: "availableSlots",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => (
        <div className="flex gap-2">
          <Link to={`/admin/facilities/${item._id}`}>
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
            <FacilitieConfirmationModal
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
        showSorterTooltip={{ target: "sorter-icon" }}
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
