import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/about" element= {<About/>} />
        <Route path="/sign-in" element= {<Signin/>} />
        <Route path="/sign-up" element= {<Signup/>} />
        <Route path="/dashboard" element= {<Dashboard/>} />
        <Route path="/projects" element= {<Project/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App