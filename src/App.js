import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AccountAcess from './Components/AccountAcess';
import Reportbug from './Components/Reportbug';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/access-account" element={<AccountAcess />} />
          <Route path="/reportbug" element={<Reportbug />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
