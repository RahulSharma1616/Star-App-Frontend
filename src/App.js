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
import TicketsReceived from './components/TicketsReceived';
import Analytics from './components/Analytics';
import Chatbot from './components/ChatBot';

function App() {

  var [cookies, setCookie] = useCookies(['token']);


  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" exact element={cookies.token ? <HomePage /> : <LoginPage />} />
        {/* <Route path="/home" element={<HomePage/>}/> */}
        <Route path="/create-timesheet" exact element={cookies.token ? <Timesheet /> : <LoginPage />} />
        <Route path="/projects" exact element={cookies.token ? <Projects /> : <LoginPage />} />
        <Route path="/tickets" exact element={cookies.token ? <Tickets /> : <LoginPage />} />
        <Route path="/manager-dashboard" exact element={cookies.token ? <ApprovalPage /> : <LoginPage />} />
        <Route path="/manager-activities" exact element={cookies.token ? <Activities /> : <LoginPage />} />
        <Route path="/tickets-received" exact element={cookies.token ? <TicketsReceived /> : <LoginPage />} />
        <Route path="/admin-dashboard" exact element={cookies.token ? <AdminDashboard /> : <LoginPage />} />
        <Route path="/analytics" exact element={cookies.token ? <Analytics /> : <LoginPage />} />

        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
