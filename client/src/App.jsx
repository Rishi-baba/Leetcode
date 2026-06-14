import React from 'react'
import Auth from './pages/Auth'
import Layout from './pages/Layout'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'

const App = () => {

  

  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="Auth" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App