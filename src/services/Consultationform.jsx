import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { NavLink } from "react-router-dom/dist/umd/react-router-dom.development";
export default function Consultationform() {
  const navigate = useNavigate();

  const [historyOfIllness, setHistoryOfIllness] = useState("");
  const [historyOfSurgery, setHistoryOfSurgery] = useState("");
  const [allergies, setAllergies] = useState("");
  const [other, setOther] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [pathName, setPathName] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientname] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const location = window.location.pathname;

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

  useEffect(() => {
    if (location) {
      let tmp = window.location.pathname.slice(
        window.location.pathname.lastIndexOf("/"),
        window.location.pathname.length
      );
      setPathName(tmp);
    }
  }, [location]);

  //axios get request
  function getPatientDetails() {
    const token = localStorage.getItem("patientId");
    const decodeToken = parseJwt(token);
    const pId = decodeToken.patientId;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/patient/details/" + pId,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setHistoryOfIllness(response.data.historyOfIllness);
        setHistoryOfSurgery(response.data.historyOfSurgery);
        setPatientId(response.data.id);
        setPatientname(response.data.name);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function newConsultation() {
    let data = JSON.stringify({
      historyOfSurgery,
      historyOfIllness,
      familyHistory,
      allergies: allergies,
      others: other,
      patientId,
      transactionId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/patient/newconsultation" + pathName,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(response.data.message);
        navigate("/patient/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section>
      <NavLink
        className="link"
        onClick={(e) => {
          e?.preventDefault();
          navigate("/patient/dashboard");
        }}
      >
        Dashboard
      </NavLink>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="login-form">
          {/*Surgery history Field*/}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Surgery history if any"
              name="historyOfSurgery"
              value={historyOfSurgery}
            />
          </div>
          {/*Illness history Field*/}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              name="historyOfIllness"
              placeholder="Illness history if any"
              value={historyOfIllness}
            />
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="Diabetic"
              onClick={(e) => {
                setFamilyHistory("Diabetic");
              }}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Diabetic
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="Non Diabetic"
              onClick={(e) => {
                setFamilyHistory("Non Diabetic");
              }}
            />
            <label className="form-check-label" for="flexRadioDefault2">
              Non Diabetic
            </label>
          </div>
          <div className="mb-3">
            <input
              type="text-area"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Any allergies"
              name="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text-area"
              className="form-control"
              id="textOthers"
              placeholder="Others"
              name="others"
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <img src="https://i.postimg.cc/9fzLFXnP/Qrcode.jpg" alt="QR Code" />
            <div
              className="card"
              style={{
                height: "20rem",
                width: "14rem",
                marginLeft: "5%",
                padding: "1%",
                textAlign: "center",
                float: "right",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Rs.600/-</h5>
                <p className="card-text">Consultation Fees</p>
                <p className="card-text">
                  <strong>For Mr. {patientName}</strong>
                </p>
                <p className="card-text">You can pay using any UPI app</p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text-area"
              className="form-control"
              id="textOthers"
              placeholder="Enter Transaction ID"
              name="others"
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary m-1"
              onClick={(e) => {
                e?.preventDefault();
                getPatientDetails();
              }}
            >
              Get your details
            </button>
            <button
              className="btn btn-primary m-1"
              onClick={(e) => {
                e?.preventDefault();
                newConsultation();
              }}
            >
              Book consultation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
