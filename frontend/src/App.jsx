import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar.component.jsx'
import { BrowserRouter } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      
    </>
  )
}

export default App