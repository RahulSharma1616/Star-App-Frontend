import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
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
import ChatBot from './components/ChatBot';
import TicketCenter from './components/TicketCenter';
import Holidays from "./components/holidays/Holidays"

function App() {

  const [cookies] = useCookies(['token']);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={cookies.token ? <HomePage /> : <LoginPage />} />
        <Route path="/create-timesheet" element={<Timesheet />} />
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/manager-dashboard" element={<ApprovalPage />} />
        <Route path="/manager-activities" element={<Activities />} />
        <Route path="/tickets-received" element={<TicketsReceived />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ticket-center" element={<TicketCenter />} />
        <Route path="/holidays" element={<Holidays />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
