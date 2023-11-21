import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";

export default () => {
  const navigate = useNavigate();
  function patientLogin() {
    navigate("/patient/login");
  }
  function doctorLogin() {
    navigate("/doctor/login");
  }
  return (
    <section className="homepage">
      <div className="homePageDiv">
        <h1>
          Welcome to <em>Precrip-it</em>, let's get started
        </h1>
        <button
          type="btn btn-primary btn-large m-1"
          id="patientHomeBtn"
          onClick={patientLogin}
        >
          I am a Patient
        </button>

        <button
          type="btn btn-primary btn-large m-1"
          id="doctorHomeBtn"
          onClick={doctorLogin}
        >
          I am a Doctor
        </button>
      </div>
    </section>
  );
};
