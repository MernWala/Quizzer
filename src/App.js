import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AccountAcess from './Components/AccountAcess';
import Reportbug from './Components/Reportbug';
import Auth from './Components/Auth';
import DataState from './context/userData/DataState';
import Alert from './Components/Alert';
import UtilityContext from './context/utility/UtilityContext';
import Register from './Components/Register';
import EngineHome from './Engine/IE_Home';
import EngineState from './Engine/context/EngineState';

function App() {

  const utilContext = useContext(UtilityContext);
  const { alert } = utilContext;

  return (
    <>
      <DataState>
        <EngineState>
          <BrowserRouter>
            <Navbar />
            <Alert head={alert.head} body={alert.body} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app/access-account" element={<AccountAcess />} />
              <Route path="/reportbug" element={<Reportbug />} />
              <Route path="/app/acess-account/auth" element={<Auth />} />
              <Route path='/app/new-user' element={<Register />} />
              <Route path="/app/engin/instructor" element={<EngineHome />} />
            </Routes>
          </BrowserRouter>
        </EngineState>
      </DataState>
    </>
  );
}

export default App;
