// import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar.component.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import UserAuthForm from './pages/userAuthForm.page.jsx'
import { createContext, useEffect, useState } from 'react'
import { lookInSession } from './common/session.jsx'



export const UserContext = createContext({});


function App() {

  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = lookInSession("user");

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ accessToken : null});
  }, [])

  return (
    
    <UserContext.Provider value={{userAuth, setUserAuth}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='signin' element={<UserAuthForm type="sign-in" />} />
            <Route path='signup' element={<UserAuthForm type="sign-up" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
