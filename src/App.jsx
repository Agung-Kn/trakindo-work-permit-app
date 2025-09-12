import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Index';
import WorkPermit from './pages/permits/WorkPermit';
import CreatePermit from './pages/permits/CreatePermit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Index />}>
          <Route path="/" element={<WorkPermit />} />
          <Route path="/create" element={<CreatePermit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
