import DashboardLoader from "../../components/shared/loader/DashboardLoader";
import SingleDashItemLoader from "../../components/shared/loader/SingleDashItemLoader";
import { useGetAllUsersQuery } from "../../redux/features/admin/userManagement.Api";
import { useGetAllBookByAuthorQuery, useGetAllBookQuery } from "../../redux/features/book/bookApi";
import { useGetAllBorrowBooksQuery } from "../../redux/features/borrow/borrowApi";
import { useGetMeQuery } from "../../redux/features/user/userApi";

const Dashboard = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  const { data: users,  isLoading: loadingUsers } = useGetAllUsersQuery(undefined);
  const { data: books, isLoading: loadingBooks } = useGetAllBookQuery(undefined);
  const { data: borroweds, isLoading: loadingBorrow } = useGetAllBorrowBooksQuery(undefined);
  const { data: auBook } =
    useGetAllBookByAuthorQuery(undefined);

  const userInfo = data?.data;

  return (
    <>
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center">
              <img
                src={userInfo?.image}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border-2 border-blue-500 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Welcome back,{" "}
                  <span className="capitalize">{userInfo?.name}</span>!
                </h2>
                <p className="text-gray-600">
                  Here’s a quick overview of your dashboard
                </p>
              </div>
            </div>

          </div>
          {/* Stats or Quick Links */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Account Status
                </p>
                <p className="text-2xl capitalize font-bold text-green-500">
                  {userInfo?.status.replace("-", " ")}
                </p>
              </div>
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h3v10H3zm7-7h3v17h-3zM13 4h3v17h-3zM21 8h-3v13h3z"
                  />
                </svg>
              </div>
            </div>

            {/* books  */}
            {loadingBooks ? (
              <SingleDashItemLoader />
            ) : (
             ( userInfo?.role === "admin" || userInfo?.role === "author") && (
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Books</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {userInfo?.role === "admin" && books?.data?.length}
                      {userInfo?.role === "author" && auBook?.data?.length}
                    </p>
                  </div>
                  <div className="text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h8M8 10h8M8 13h8M8 16h8"
                      />
                    </svg>
                  </div>
                </div>
              )
            )}

            {/* borrowed */}
            {loadingBorrow ? (
              <SingleDashItemLoader />
            ) : (
              userInfo?.role === "admin" && (
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Borroweds
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {borroweds?.data?.length}
                    </p>
                  </div>
                  <div className="text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )
            )}

            {/* users */}
            {loadingUsers ? (
              <SingleDashItemLoader />
            ) : (
              userInfo?.role === "admin" && (
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Users</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {users?.data?.length}
                    </p>
                  </div>
                  <div className="text-blue-500">
                    <svg
                      className="feather feather-users"
                      fill="none"
                      height={24}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      width={24}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
