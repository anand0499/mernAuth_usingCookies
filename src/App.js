import "./App.css";
import Header from "./Components/Header";
import {Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import User from "./Components/User"

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<User />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
