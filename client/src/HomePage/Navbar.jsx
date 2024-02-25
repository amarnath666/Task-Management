const Navbar = () => {
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(setLogout());
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-left">Task Management</div>
        <div className="navbar-right">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  