import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Projects from './components/Projects';
import Timesheet from './components/Timesheet';
import Tickets from './components/Tickets';
import { useCookies } from 'react-cookie';
import ApprovalPage from './components/ApprovalPage';
import Activities from './components/Activities';
import AdminDashboard from './components/AdminDashboard';

function App() {

  var [cookies, setCookie] = useCookies(['token']);


  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" exact element={cookies.token ? <HomePage /> : <LoginPage />} />
        {/* <Route path="/home" element={<HomePage/>}/> */}
        <Route path="/create-timesheet" element={<Timesheet />} />
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/manager-dashboard" element={<ApprovalPage />} />
        <Route path="/manager-activities" element={<Activities />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
