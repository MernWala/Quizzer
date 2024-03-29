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
import PreviewQuestion from './Engine/PreviewQuestion';
import QuestionForm from './Engine/QuestionForm';
import PublishQuizeModal from './Engine/PublishQuizeModal';
import ProfileModal, { ForgotPasswordModal, PastImageModal } from './Components/ProfileModal';
import ModifyQuestionModal from './Engine/ModifyQuestionModal';
import About from './Components/About';
import "./styles/scrollbar.scss"
import Test from './Components/Test';
import StudentState from './Engine/context/StudentState';
import EditProfile from './Components/EditProfile';

function App() {

  const utilContext = useContext(UtilityContext);
  const { alert } = utilContext;

  return (
    <>
      <DataState>
        <EngineState>
          <StudentState>
            <BrowserRouter>
              <Navbar />
              {/* Modals declaratioon start here */}
              <PublishQuizeModal />
              <ProfileModal />
              <ModifyQuestionModal />
              <ForgotPasswordModal />
              <PastImageModal />
              {/* Modals declaratioon end here */}
              <Alert head={alert.head} body={alert.body} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/app/access-account" element={<AccountAcess />} />
                <Route path="/reportbug" element={<Reportbug />} />
                <Route path="/app/acess-account/auth" element={<Auth />} />
                <Route path='/app/new-user' element={<Register />} />
                <Route path="/app/engin/instructor" element={<EngineHome />} />   {/* here is instructor engine */}
                <Route path="/question-set/preview" element={<PreviewQuestion />} />
                <Route path="/question/edit/add-question/" element={<QuestionForm />} />
                <Route path="/joining-code/:qCode" element={<Test />} />
                <Route path="/profile/edit/" element={<EditProfile />} />
              </Routes>
            </BrowserRouter>
          </StudentState>
        </EngineState>
      </DataState>
    </>
  );
}

export default App;
