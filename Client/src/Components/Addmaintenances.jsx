import { useState } from "react";
import "../Styles/Addmaintenances.css";
import axios from "axios";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
const Addmaintenances = ({ onSubmit }) => {
  const [mntData, setMntData] = useState([
    {
      vehicleName: "",
      regNo: "",
      serviceDate: "",
      description: "",
      cost: "",
    },
  ]);

  const userId = localStorage.getItem("userId");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(mntData);
    axios
      .post("http://localhost:5500/Addmaintenance", { mntData, userId })
      .then((res) => {
        console.log(res);
        onSubmit();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...mntData];
    newData[index][name] = value;
    setMntData(newData);
  };

  const addMaintenance = () => {
    setMntData([
      ...mntData,
      {
        vehicleName: "",
        regNo: "",
        serviceDate: "",
        description: "",
        cost: "",
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
          className="addMaintenance"
        >
          <h3>Fill in the following Details about your Maintenance</h3>
          <div className="maintenances">
            {mntData.map((maintenance, index) => (
              <div className="maintenance" key={index}>
                <h3>Maintenance {index + 1}</h3>
                <div className="incont">
                  <input
                    name="vehicleName"
                    id="vehicleName"
                    type="text"
                    placeholder=" "
                    required
                    value={maintenance.vehicleName}
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
                    value={maintenance.regNo}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="regNo">Reg No</label>
                </div>
                <div className="incont">
                  <input
                    name="serviceDate"
                    id="serviceDate"
                    type="text"
                    placeholder=" "
                    required
                    value={maintenance.serviceDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="serviceDate">Service Date</label>
                </div>
                <div className="incont">
                  <input
                    name="description"
                    id="description"
                    type="text"
                    placeholder=" "
                    required
                    value={maintenance.description}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="description">Description</label>
                </div>
                <div className="incont">
                  <input
                    name="cost"
                    id="cost"
                    type="text"
                    placeholder=" "
                    required
                    value={maintenance.cost}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor="cost">Cost</label>
                </div>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button className="addMaitenance" onClick={addMaintenance}>
              Add
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    );
  }
};

export default Addmaintenances;
