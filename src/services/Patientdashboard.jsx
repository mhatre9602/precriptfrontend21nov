import { NavLink } from "react-router-dom";
import {
  redirect,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Doctorcards from "./Doctorcards";
function parseJwt(tk) {
  var base64Url = tk.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export default function Patientdashboard() {
  const [doctorList, setDoctorList] = useState([]);

  const navigate = useNavigate();
  const patient = localStorage.getItem("patientId");
  let patientName;

  if (patient) {
    const decodeToken = parseJwt(patient);
    // console.log("decode", decodeToken);
    patientName = decodeToken.name;
    // console.log(decodeToken);
  }

  //get doctor lists
  // function getDoctors() {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "http://localhost:3001/patient/dashboard",
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setDoctorList(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  useEffect(() => {
    fetch("http://localhost:3001/patient/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setDoctorList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <NavLink
        className="link"
        onClick={(e) => {
          e?.preventDefault();
          localStorage.removeItem("patientId");
          navigate("/");
        }}
      >
        Logout
      </NavLink>
      <div style={{ textAlign: "center", paddingTop: "5%" }}>
        <h2>
          <em>
            Welcome<strong> {patientName}</strong>, hope you are doing well!
          </em>
        </h2>
      </div>
      <div style={{ textAlign: "center", paddingTop: "1%" }}>
        <h4 style={{ margin: "1%" }}>Available Doctors</h4>
      </div>
      <Doctorcards data={doctorList} />
    </section>
  );
}
