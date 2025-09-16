import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Index';
import WorkPermit from './pages/workPermits/WorkPermit';
import CreatePermit from './pages/workPermits/CreatePermit';
import PublicRoute from './helpers/PublicRoute';
import Login from './pages/Login';
import PrivateRoute from './helpers/PrivateRoute';
import ManagePermit from './pages/managePermits/ManagePermit';
import UnderConstruction from './pages/UnderConstruction';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyProfileQuery } from './services/features/authApi';
import { useEffect } from 'react';
import { setProfile } from './services/authSlice/';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const { data, isSuccess } = useLazyProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setProfile(data.data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['User', 'SHE', 'JRP']} />}>
          <Route element={<Index />}>
            <Route path="/permit-a" element={<WorkPermit />} />
            <Route path="/permit-b" element={<UnderConstruction />} />
            <Route path="/permit-specific" element={<UnderConstruction />} />
            <Route path="/create" element={<CreatePermit />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={['SHE', 'JRP']} />}>
          <Route element={<Index />}>
            <Route path="/" element={<ManagePermit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
