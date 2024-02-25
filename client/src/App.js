import { BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage.jsx";
import { useSelector } from "react-redux";
import SignupForm from "./LoginPage/SignupForm.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import UpdateTaskForm from "./HomePage/UpateTaskForm.jsx";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
       <Routes>
          <Route path="/" element= {<LoginPage />} />
          <Route path="/signup" element= {<SignupForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/update/:id" element={<UpdateTaskForm />} />
          {/* <Route 
              path="/home" 
              element={isAuth ? <HomePage /> : <Navigate to="/"/>} />
          <Route 
              path="/profile/:userId"   
              element={isAuth ? <ProfilePage />  : <Navigate to="/" />} />  */}
        </Routes>
    </div>
  );
}

export default App;