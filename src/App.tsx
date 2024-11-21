import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./pages/Home/Home'));
const CreatePage = lazy(() => import('./pages/Create/Create'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="colored"
      />
    </>
  );
}

export default App;
