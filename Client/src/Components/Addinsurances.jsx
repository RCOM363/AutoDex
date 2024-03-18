import { useState } from "react";
import "../Styles/Addinsurances.css";
import axios from "axios";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
const Addinsurances = ({ onSubmit }) => {
  const [insData, setInsData] = useState([
    {
      vehicleName: "",
      regNo: "",
      insProvider: "",
      policyNo: "",
      expiryDate: "",
    },
  ]);

  const userId = localStorage.getItem("userId");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(insData);
    axios
      .post("http://localhost:5500/Addinsurance", { insData, userId })
      .then((res) => {
        console.log(res);
        onSubmit();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...insData];
    newData[index][name] = value;
    setInsData(newData);
  };

  const addInsurance = () => {
    setInsData([
      ...insData,
      {
        vehicleName: "",
        regNo: "",
        insProvider: "",
        policyNo: "",
        expiryDate: "",
      },
    ]);
  };
  if (!userId) {
    return <div>Please sign in</div>;
  } else {
    return (
      <>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="addInsurances"
        >
          <h3>Fill in the following Details about your Insurance</h3>
          <div className="insurances">
            {insData.map((insurance, index) => (
              <div className="insurance" key={index}>
                <h3>Insurance {index + 1}</h3>
                <div className="incont">
                  <input
                    name="vehicleName"
                    id="vehicleName"
                    type="text"
                    placeholder=" "
                    required
                    value={insurance.vehicleName}
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
                    value={insurance.regNo}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="regNo">Reg No</label>
                </div>
                <div className="incont">
                  <input
                    name="insProvider"
                    id="insProvider"
                    type="text"
                    placeholder=" "
                    required
                    value={insurance.insProvider}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="insProvider">Insurance Provider</label>
                </div>
                <div className="incont">
                  <input
                    name="policyNo"
                    id="policyNo"
                    type="text"
                    placeholder=" "
                    required
                    value={insurance.policyNo}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="policyNo">Policy Number</label>
                </div>
                <div className="incont">
                  <input
                    name="expiryDate"
                    id="expiryDate"
                    type="text"
                    placeholder=" "
                    required
                    value={insurance.expiryDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="expiryDate">Expiry Date</label>
                </div>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button className="addInsurance" onClick={addInsurance}>
              Add
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    );
  }
};

export default Addinsurances;
