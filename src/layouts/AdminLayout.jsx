import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar component can be placed here */}
      <div className="flex-grow p-4">
        {/* Topbar component can go here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;