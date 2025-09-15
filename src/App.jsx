import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Index';
import WorkPermit from './pages/workPermits/WorkPermit';
import CreatePermit from './pages/workPermits/CreatePermit';
import PublicRoute from './helpers/PublicRoute';
import Login from './pages/Login';
import PrivateRoute from './helpers/PrivateRoute';
import ManagePermit from './pages/managePermits/ManagePermit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<Index />}>
              <Route path="/" element={<WorkPermit />} />
              <Route path="/create" element={<CreatePermit />} />
            </Route>

            <Route element={<Index />}>
              <Route path="/permits" element={<ManagePermit />} />
              <Route path="/create" element={<CreatePermit />} />
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
