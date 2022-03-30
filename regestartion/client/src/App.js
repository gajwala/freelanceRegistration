import "./App.css";
import ConfigForm from "./components/ConfigForm";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import { ToastContainer } from "react-toastify";
export const baseURL = "https://registration-data.herokuapp.com";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/config" element={<ConfigForm />} />
          <Route exact path="/register" element={<RegistrationPage />} />
          <Route exact path="*" element={<RegistrationPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
