import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import About from "./pages/about";
import Home from "./pages/home";
import Contact from './pages/contact';
import College from './pages/college';
import CollegeDetails from './pages/college-details';
import ReferAndEarn from './pages/referandearn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
function App() {


  return (
    <BrowserRouter>
    <ScrollToTop />
      <MainLayout>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/colleges" element={<College />} />
          <Route path="/college-details/:id" element={<CollegeDetails />} />
          <Route path="/refer-and-earn" element={<ReferAndEarn />} />
        </Routes>
      </MainLayout>
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App
