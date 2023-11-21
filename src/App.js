import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Patientdashboard from "./services/Patientdashboard";
import Doctordashboard from "./services/Doctordashboard";
import Patientlogin from "./services/Patientlogin";
import Doctorlogin from "./services/Doctorlogin";
import Patientsignup from "./services/Patientsignup";
import Doctorsignup from "./services/Doctorsignup";
import Consultationform from "./services/Consultationform";
import axios from "axios";
import "../src/services/styles.css";
import Home from "./services/Home";
import Prescriptionform from "./services/Prescriptionform";
import Doctorprofile from "./services/Doctorprofile";

export const API_BASE_URL = "http://localhost:3001";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/patient/dashboard" element={<Patientdashboard />} />
        <Route path="/doctor/dashboard" element={<Doctordashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/patient/login" element={<Patientlogin />} />
        <Route path="/doctor/login" element={<Doctorlogin />} />
        <Route path="/patient/signup" element={<Patientsignup />} />
        <Route path="/doctor/signup" element={<Doctorsignup />} />
        <Route
          path="/patient/consultationform/:id"
          element={<Consultationform />}
        />
        <Route
          path="/doctor/prescriptionform/:id"
          element={<Prescriptionform />}
        />
        <Route path="/doctor/profile" element={<Doctorprofile />} />
      </Routes>
    </div>
  );
};

export default App;
