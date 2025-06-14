import { Outlet } from 'react-router-dom';
import InfoBar from '../components/InfoBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header component can go here */}
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <InfoBar />
      <Footer />
    </div>
  );
};

export default MainLayout;