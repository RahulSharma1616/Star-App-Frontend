import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Projects from './components/Projects';
import Timesheet from './components/Timesheet';
import Tickets from './components/Tickets';
import { useCookies } from 'react-cookie';

function App() {

  var [cookies, setCookie] = useCookies(['token']);
  
  
  return (
  <BrowserRouter>
   {/* <Navbar/> */}
   <Routes>
     <Route path="/" exact element={cookies.token ? <HomePage/> : <LoginPage/>}/>
     {/* <Route path="/home" element={<HomePage/>}/> */}
     <Route path="/create-timesheet" element={<Timesheet/>}/>
     <Route path="/projects" element={<Projects/>}/>
     <Route path="/tickets" element={<Tickets/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
