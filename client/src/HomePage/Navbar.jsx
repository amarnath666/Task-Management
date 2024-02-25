import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">Task Management</div>
      <div className="navbar-right">
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
