import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { SpinnerLoader } from '../SpinnerLoader/SpinnerLoader';

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<SpinnerLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
