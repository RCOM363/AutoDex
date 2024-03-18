import { useState } from "react";
import "../Styles/Addfuellog.css";
import axios from "axios";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
const Addfuellogs = ({ onSubmit }) => {
  const [fuelLogs, setFuelLogs] = useState([
    {
      vehicleName: "",
      regNo: "",
      fillDate: "",
      fuelVol: "",
      cost: "",
    },
  ]);

  const userId = localStorage.getItem("userId");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fuelLogs);
    axios
      .post("http://localhost:5500/Addfuellog", { fuelLogs, userId })
      .then((res) => {
        console.log(res);
        onSubmit();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...fuelLogs];
    newData[index][name] = value;
    setFuelLogs(newData);
  };

  const addFuellog = () => {
    setFuelLogs([
      ...fuelLogs,
      {
        vehicleName: "",
        regNo: "",
        fillDate: "",
        fuelVol: "",
        cost: "",
      },
    ]);
  };

  if (!userId) {
    return <div>Please sign in</div>;
  } else {
    return (
      <>
        <form onSubmit={(event) => handleSubmit(event)} className="addFuellogs">
          <h3>Fill in the following Details about your FuelLog</h3>
          <div className="fuellogs">
            {fuelLogs.map((fuelLog, index) => (
              <div className="fuellog" key={index}>
                <h3>FuelLog {index + 1}</h3>
                <div className="incont">
                  <input
                    name="vehicleName"
                    id="vehicleName"
                    type="text"
                    placeholder=" "
                    required
                    value={fuelLog.vehicleName}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="vehicleName">Vehicle Name</label>
                </div>
                <div className="incont">
                  <input
                    name="regNo"
                    id="regNo"
                    type="text"
                    placeholder=" "
                    required
                    value={fuelLog.regNo}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="regNo">Reg No</label>
                </div>
                <div className="incont">
                  <input
                    name="fillDate"
                    id="fillDate"
                    type="text"
                    placeholder=" "
                    required
                    value={fuelLog.fillDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="regNo">Fill Date</label>
                </div>
                <div className="incont">
                  <input
                    name="fuelVol"
                    id="fuelVol"
                    type="text"
                    placeholder=" "
                    required
                    value={fuelLog.fuelVol}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="regNo">Fuel Volume</label>
                </div>
                <div className="incont">
                  <input
                    name="cost"
                    id="cost"
                    type="text"
                    placeholder=" "
                    required
                    value={fuelLog.cost}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="cost">Cost:</label>
                </div>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button className="addFuellog" onClick={addFuellog}>
              Add
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    );
  }
};

export default Addfuellogs;
