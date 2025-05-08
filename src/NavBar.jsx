import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="navbar" style={{backgroundColor: '#e2a176'}}>
      <div className="logo">Recipe Finder</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/filter">Filter</Link>
      </nav>
    </header>
  );
}