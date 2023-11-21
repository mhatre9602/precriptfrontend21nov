import { useState } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default function Signup() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [phoneNo, setPhone] = useState("");

  const [experience, setExperience] = useState("");
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
    data.append("speciality", speciality);
    data.append("email", email);
    data.append("phoneNo", phoneNo);
    data.append("experience", experience);
    data.append("password", password);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/doctor/signup",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        alert(response.data.message);
        navigate("/doctor/login");
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
          {/*Speciality Field*/}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Specialization"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
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
          {/*Experience Field*/}
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Experience in medical field"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
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
              Already registered? <a href="/doctor/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
