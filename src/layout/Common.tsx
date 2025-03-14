import { Outlet } from 'react-router';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function CommonLayout() {
  return (
    <h2>
      <Header />
      <Outlet />
      <Footer />
    </h2>
  );
}

export default CommonLayout;
