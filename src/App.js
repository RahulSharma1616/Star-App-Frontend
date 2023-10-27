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
import PageNotFound from './components/PageNotFound';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Holidays from "./components/holidays/Holidays"

function App() {

  const [cookies] = useCookies(['token']);
  const [manager, setManager] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (cookies.token) {
      axios({
        method: "get",

        url: "http://localhost:4000/user/isManager",

        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then((response) => {
        setManager(response.data.manager);
      });
    }
  }, []);

  useEffect(() => {
    if (cookies.token) {
      axios({
        method: "get",
        url: "http://localhost:4000/user/isAdmin",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then((response) => {
        setAdmin(response.data.isAdmin);
      })
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={cookies.token ? <HomePage /> : <LoginPage />}
        />
        <Route path="/create-timesheet" element={<Timesheet />} />
        <Route path="/tickets" element={<Tickets />} />
        {manager && <Route path="/manager-dashboard" element={<ApprovalPage />} />}
        {manager && <Route path="/manager-activities" element={<Activities />} />}
        {manager && <Route path="/tickets-received" element={<TicketsReceived />} />}
        {admin && <Route path="/admin-dashboard" element={<AdminDashboard />} />}
        {admin && <Route path="/projects" element={<Projects/>}/>}
        {admin && <Route path="/analytics" element={<Analytics />} />}
        {admin && <Route path="/ticket-center" element={<TicketCenter />} />}
        {admin && <Route path="/holidays" element={<Holidays />} />}
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
