// import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar.component.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import UserAuthForm from './pages/userAuthForm.page.jsx'


function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='signin' element={<UserAuthForm type="signin" />} />
          <Route path='signup' element={<UserAuthForm type="signup" />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
