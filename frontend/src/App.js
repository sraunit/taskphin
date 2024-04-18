import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js';
import About from './components/About.js';
import Home from './components/Home.js';
import {useState} from 'react';
import { useEffect } from 'react';
import Signup from './components/Signup.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard';
function App() {
  const [signupOpen,setSignup]=useState(false);
  const [loginOpen,setLogin]=useState(false);
  const [validity,setValidity]=useState('');
  function signup(){
    if(loginOpen){setLogin(!loginOpen);}
    setSignup(!signupOpen);
   
  }
  function login(){
  if(signupOpen){setSignup(!signupOpen);}
  setLogin(!loginOpen);
  
  }
  useEffect(() => {
    
    setValidity(sessionStorage.getItem('token')?true:false);
}, [])

useEffect(() => {
    if (validity) {
        // re-render child component if sessionStorageValue is changed
    }
}, [validity])

  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar signup={signup} login={login} validity={validity} setValidity={setValidity}></Navbar>
      <Signup open={signupOpen} click={signup} click1={login}/>
      <Login open={loginOpen} click={login} click1={signup} setValidity={setValidity}/>
      <Routes>
      <Route path='/' key='home' element={<Home/>}/>
      <Route path="/about" key="about" element={<About/>}/>
      
     <Route path='/dashboard' key="dashboard" element={<Dashboard></Dashboard>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
