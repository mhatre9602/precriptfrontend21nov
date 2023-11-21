import Consultationform from "./Consultationform";

export default function Doctorcards({ data }) {
  return (
    <section className="doctorcard">
      {console.log(data)}
      {data.map((d) => (
        <div
          className="card"
          style={{
            height: "18rem",
            width: "18rem",
            marginLeft: "5%",
            padding: "1%",
            textAlign: "center",
          }}
        >
          <img
            src={"http://localhost:3001" + "/patient/" + d.profileImage}
            className="card-img-top m-1"
            alt="Doctor Image"
          ></img>
          <div className="card-body">
            <h5 className="card-title">{d.name}</h5>
            <p className="card-text">{d.speciality}</p>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e?.preventDefault();
                console.log(d.id);
                window.location.pathname = "/patient/consultationform/" + d.id;
              }}
            >
              Consult
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
