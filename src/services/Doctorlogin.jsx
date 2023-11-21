import { useState } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { NavLink } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onLogin() {
    if (!(email.length && password.length)) {
      window.alert("Please fill all details.");
      return;
    }

    let data = JSON.stringify({
      email,
      password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/doctor/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert(response.data.message);
        localStorage.setItem("doctorId", response.data.token);

        navigate("/doctor/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="doctorlogin">
      <NavLink
        className="link"
        onClick={(e) => {
          e?.preventDefault();
          navigate("/");
        }}
      >
        Home
      </NavLink>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="login-form">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e?.preventDefault();
                onLogin();
              }}
            >
              Sign in
            </button>
          </div>
          <div class="text-center">
            <p>
              New user? <a href="/doctor/signup">Register as doctor</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
