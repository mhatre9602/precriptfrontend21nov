import {
  NavLink,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Doctordashboard() {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [doctorName, setDoctorName] = useState([]);

  //JWT verify
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
  const token = localStorage.getItem("doctorId");
  const decodeToken = parseJwt(token);
  const doctorId = decodeToken.doctorId;

  //consultaion list
  // function getConsultations() {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "http://localhost:3001/doctor/consultationlist/" + doctorId,
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       setConsultations(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  useEffect(() => {
    fetch("http://localhost:3001/doctor/getdetails/" + doctorId)
      .then((response) => response.json())
      .then((data) => {
        setDoctorName(data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/doctor/consultationlist/" + doctorId)
      .then((response) => response.json())
      .then((data) => {
        setConsultations(data);
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
          localStorage.removeItem("doctorId");
          navigate("/");
        }}
      >
        Logout
      </NavLink>
      <NavLink
        className="link"
        onClick={(e) => {
          e?.preventDefault();
          navigate("/doctor/profile");
        }}
      >
        Profile
      </NavLink>
      <div
        style={{ textAlign: "center", paddingTop: "5%", paddingBottom: "2%" }}
      >
        <h3>
          Here are your consultations, <em>{doctorName}</em>
        </h3>
      </div>
      <table
        className="table"
        style={{ width: "85%", border: "1px solid black", marginLeft: "5%" }}
      >
        <thead>
          <tr>
            <th className="col">Consultation ID</th>
            <th className="col">Patient ID</th>
            <th className="col">Doctor ID</th>
            <th className="col">History of Illness</th>
            <th className="col">History of Surgery</th>
            <th className="col">Family history</th>
            <th className="col">Allergies</th>
            <th className="col">Others</th>
            <th className="col">Consultation Date</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((d) => (
            <tr>
              <td scope="row">{d.id}</td>
              <td>{d.patientId}</td>
              <td>{d.doctorId}</td>
              <td>{d.historyOfIllness}</td>
              <td>{d.historyOfSurgery}</td>
              <td>{d.familyHistory}</td>
              <td>{d.allergies}</td>
              <td>{d.others}</td>
              <td>{d.createdAt}</td>
              <td>
                <div>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={(e) => {
                      e?.preventDefault();
                      console.log(d.patientId);
                      window.location.pathname =
                        "/doctor/prescriptionform/" + d.patientId;
                    }}
                  >
                    Prescribe
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
