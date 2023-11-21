import { useState } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default function Signup() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [age, setAge] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [historyOfIllness, setHistoryOfIllness] = useState("");
  const [historyOfSurgery, setHistoryOfSurgery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSignup() {
    if (!(name.length && email.length && password.length)) {
      window.alert("Please fill all details.");
      return;
    }
    //Calling API's for signup
    const data = new FormData();
    data.append("profileImage", profileImage);
    data.append("name", name);
    data.append("age", age);
    data.append("email", email);
    data.append("phoneNo", phoneNo);
    data.append("historyOfSurgery", historyOfSurgery);
    data.append("historyOfIllness", historyOfIllness);
    data.append("password", password);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/patient/signup",
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        alert(response.data.message);
        navigate("/patient/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="login-form" enctype="multipart/form-data">
          {/*Profile photo Field*/}
          <div className="mb-3">
            <input
              type="file"
              name="profileImage"
              id="formGroupExampleInput"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>
          {/*Name Field*/}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/*Age Field*/}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          {/*Email Field*/}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/*Phone Field*/}
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter your phone"
              value={phoneNo}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/*Surgery history Field*/}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Surgery history if any"
              value={historyOfSurgery}
              onChange={(e) => setHistoryOfSurgery(e.target.value)}
            />
          </div>
          {/*Illness history Field*/}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Illness history if any"
              value={historyOfIllness}
              onChange={(e) => setHistoryOfIllness(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e?.preventDefault();
                onSignup();
              }}
            >
              Sign Up
            </button>
          </div>
          <div class="text-center">
            <p>
              Already a member? <a href="/patient/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
