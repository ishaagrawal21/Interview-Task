import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Path from "./Common/Path";
import Product from "./Screens/Product/Product";
import { useState } from "react";
import Login from "./Screens/User/Login";
import SignUp from "./Screens/User/SignUp";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [Auth, setAuth] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path={Path.product} element={<Product Auth={Auth} />} />
          <Route path={Path.login} element={<Login setAuth={setAuth} />} />
          <Route path={Path.signUp} element={<SignUp setAuth={setAuth} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
