import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./context/SocketContext"; // burayı ekledik

import HomePage from './pages/UserPages/HomePage';
import OwnerLogin from './pages/AdminPages/ownerLogin';
import OwnerRegister from './pages/AdminPages/ownerRegister';
import UserRegister from './pages/UserPages/userRegister';
import UserHome from './pages/UserPages/userHome';
import UserAbout from './pages/UserPages/userAbout';
import AllStores from './pages/UserPages/AllStores';
import Reservation from './pages/UserPages/reservation';
import CreateReservation from './pages/UserPages/createReservation';
import DeleteReservation from './pages/UserPages/deleteReservation';
import InformationReservation from './pages/UserPages/informationReservation';
import UserUpdate from './pages/UserPages/userUpdate';
import UserInformation from './pages/UserPages/userInformation';  
import EmployeeList from './pages/AdminPages/employeeList';
import EmployeeDeleteUpdate from './pages/AdminPages/employeeDeleteUpdate';
import EmployeeDetails from './pages/AdminPages/employeeDetails';
import ChairList from './pages/AdminPages/chairList';
import ChairDetails from './pages/AdminPages/chairDetails';
import ChairDeleteUpdate from './pages/AdminPages/chairDeleteUpdate';
import OwnerUpdate from './pages/AdminPages/OwnerUpdate';
import OwnerInformation from './pages/AdminPages/ownerInformation';
import ChairToEmployee from './pages/AdminPages/chairToEmployee';
import OwnerDelete from './pages/AdminPages/ownerDelete';
import OwnerAbout from './pages/AdminPages/ownerAbout';
import UpdateDeleteReservation from './pages/UserPages/updateDeleteReservation';
import SupervisorDashboard from './pages/SupervisorPages/SupervisorDashboard';
import AdminReservations from './pages/AdminPages/AdminReservations';
import ReferenceIdLogin from './pages/UserPages/referenceIdLogin';
import ReferenceReservation from './pages/UserPages/referencereservation';
function PreventBackNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.history.pushState(null, '', location.pathname);

    const handlePopState = () => {
      navigate(0); // sayfayı yeniler
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location, navigate]);

  return null;
}

function App() {
  const adminStoreId = 1; // Burayı login sonrası dinamik alabilirsin

  return (
    <SocketProvider storeId={adminStoreId}>
      <ToastContainer />
      <Router>
        <PreventBackNavigation />
        <Routes>
          <Route path="/userLogin" element={<HomePage />} />
          <Route path="/ownerLogin" element={<OwnerLogin />} />
          <Route path="/ownerRegister" element={<OwnerRegister />} />
          <Route path="/userRegister" element={<UserRegister />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/userAbout" element={<UserAbout/>} />
          <Route path='/ownerAbout' element={<OwnerAbout/>} />
          <Route path="/allStores" element={<AllStores/>} />
          <Route path="/reservation/:adminId" element={<Reservation />} />
          <Route path="/createReservation" element={<CreateReservation/>} />
          <Route path="/informationReservation" element={<InformationReservation/>} />
          <Route path="/deleteReservation" element={<DeleteReservation />} />
          <Route path="/userUpdate" element={<UserUpdate/>} />
          <Route path="/userInformation" element={<UserInformation />} />
          <Route path="/employeeList" element={<EmployeeList/>} />
          <Route path="/employeeDetails" element={<EmployeeDetails />} />
          <Route path="/employeeDeleteUpdate" element={<EmployeeDeleteUpdate />} />
          <Route path="/chairList" element={<ChairList/>} />
          <Route path="/chairDetails" element={<ChairDetails/>} />
          <Route path="/chairDeleteUpdate" element={<ChairDeleteUpdate/>} />
          <Route path='/ownerUpdate' element={<OwnerUpdate/>}/>
          <Route path='/ownerInformation' element={<OwnerInformation/>}/>
          <Route path='/chairToEmployee' element={<ChairToEmployee/>}/>
          <Route path='/ownerDelete' element={<OwnerDelete/>}/>
          <Route path='/reservationUpdateDelete' element={<UpdateDeleteReservation/>} />
          <Route path="/supervisorDashboard" element={<SupervisorDashboard/>} />
          <Route path="/adminReservations" element={<AdminReservations/>} />
        <Route path="/" element={<ReferenceIdLogin />} />
        <Route path="/referencereservation" element={< ReferenceReservation/>} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
