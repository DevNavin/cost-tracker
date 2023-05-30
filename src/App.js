import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useAuthContext } from "./hooks/useAuthContext";


import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/login" element={!user ? <Login /> : <Home />}></Route>
            <Route path="/signup" element={!user ? <Signup /> : <Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
