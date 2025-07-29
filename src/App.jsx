import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from  './pages/UserPages/HomePage';
import OwnerLogin from './pages/AdminPages/ownerLogin';
import OwnerRegister from './pages/AdminPages/ownerRegister';
import UserRegister from './pages/UserPages/userRegister';
import UserHome from './pages/UserPages/userHome';
import About from './pages/UserPages/About';
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
import OwnerInformation  from './pages/AdminPages/ownerInformation';
import ChairToEmployee from './pages/AdminPages/chairToEmployee';
import OwnerDelete from './pages/AdminPages/ownerDelete';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ownerLogin" element={<OwnerLogin />} />
        <Route path="/ownerRegister" element={<OwnerRegister />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/about" element={<About/>} />
        <Route path="/allStores" element={<AllStores/>} />
        <Route path="/reservation" element={<Reservation />} />
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
      </Routes>
    </Router>
  );
}

export default App;
