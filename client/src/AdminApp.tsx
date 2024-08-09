import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function AdminApp() {
  return (
    <>
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    </>
  );
}

export default AdminApp;
