import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AccountAcess from './Components/AccountAcess';
import Reportbug from './Components/Reportbug';
import Auth from './Components/Auth';
import { useState } from 'react'

function App() {

  const [accessType, setAccessType] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/access-account" element={<AccountAcess setAccess={setAccessType} access={accessType} />} />
          <Route path="/reportbug" element={<Reportbug />} />
          <Route path="/app/acess-account/auth" element={<Auth access={accessType} setAccess={setAccessType} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
