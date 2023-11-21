import axios from "axios";
import { useState } from "react";
import {
  Navigate,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { NavLink } from "react-router-dom/dist/umd/react-router-dom.development";
import { useEffect } from "react";

export default function Doctorprofile() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
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

  // window.addEventListener("DOMContentLoaded", (e) => {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "http://localhost:3001/doctor/getdetails/" + doctorId,
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       setDetails(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  useEffect(() => {
    fetch("http://localhost:3001/doctor/getdetails/" + doctorId)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="doctorprofile">
      <NavLink
        className="link"
        onClick={(e) => {
          e?.preventDefault();
          navigate("/doctor/dashboard");
        }}
      >
        Dashboard
      </NavLink>
      <div className="heading">
        <h2 style={{ paddingTop: "5%" }}>
          <em>Doctor Profile</em>
        </h2>
      </div>
      <div className="m-4">
        <img
          src={"http://localhost:3001" + "/patient/" + details.profileImage}
        />
      </div>
      <table
        className="table"
        style={{
          width: "85%",
          border: "1px solid black",
          marginLeft: "5%",
          height: "15vh",
        }}
      >
        <thead>
          <tr>
            <th className="col">Name</th>
            <th className="col">Email Address</th>
            <th className="col">Speciality</th>
            <th className="col">Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">{details.name}</td>
            <td>{details.email}</td>
            <td>{details.speciality}</td>
            <td>{details.phoneNo}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
