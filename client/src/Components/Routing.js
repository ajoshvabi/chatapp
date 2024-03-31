// import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';
import Chat from './Chat';
import Messages from './Messages';
import  Signup  from './Signup';
import Login from './Login';
import { Firstpage } from './Firstpage';

function Routing() {
  return (
    <>
      {/* <HomePage/>  */}
      <Router>
        <Routes>
          <Route path='/home' element={<><HomePage /></>}></Route>
          <Route path='/signup' element={<><Signup /></>}></Route>
          <Route path='/' element={<><Firstpage /></>}></Route>
          <Route path='/login' element={<><Login /></>}></Route>
          <Route path='/chat' element={<div className='messagebg1'><Chat /><Messages /></div>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
