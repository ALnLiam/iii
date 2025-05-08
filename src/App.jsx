import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Banner from './Banner';
import FilterPage from './FilterPage';
import HowItWorks from './HowItWorks';
import CTA from './CTA';
import Footer from './Footer';


function Home() {
  return (
    <>
      <Banner> </Banner>
      <HowItWorks />
      <CTA />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<FilterPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}




