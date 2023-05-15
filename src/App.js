import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AccountAcess from './Components/AccountAcess';
import Reportbug from './Components/Reportbug';
import Auth from './Components/Auth';
import DataState from './context/userData/DataState';
import UtilityState from './context/utility/UtilityState';


function App() {
  
  return (
    <>
      <UtilityState>
        <DataState>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app/access-account" element={<AccountAcess />} />
              <Route path="/reportbug" element={<Reportbug />} />
              <Route path="/app/acess-account/auth" element={<Auth />} />
            </Routes>
          </BrowserRouter>
        </DataState>
      </UtilityState>
    </>
  );
}

export default App;
