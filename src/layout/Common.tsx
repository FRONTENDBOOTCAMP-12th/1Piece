import { Outlet } from 'react-router';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function Common() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Common;
