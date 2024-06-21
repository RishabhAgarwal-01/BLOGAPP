import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Home from './pages/Home'
import Header from './components/Header'
import FooterComp from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/about" element= {<About/>} />
        <Route path="/sign-in" element= {<Signin/>} />
        <Route path="/sign-up" element= {<Signup/>} />
        <Route element={<PrivateRoute />}> 
          <Route path="/dashboard" element= {<Dashboard/>} /> 
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}> 
          <Route path="/create-post" element= {<CreatePost/>} /> 
        </Route>
        <Route path="/projects" element= {<Project/>} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
    
  )
}

export default App