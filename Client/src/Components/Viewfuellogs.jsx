import { useState, useEffect } from "react";
import "../Styles/Viewfuellogs.css";
import axios from "axios";

const Viewfuellogs = () => {
  const [fuellogs, setFuellogs] = useState([
    {
      VEHICLE_NAME: "",
      FILL_DATE: "",
      FUEL_VOLUME: "",
      COST: "",
    },
  ]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .post("http://localhost:5500/Viewfuellogs", {
        userId: userId,
      })
      .then((res) => {
        console.log(res.data);
        setFuellogs(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <div className="flcont">
        <table>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Vehicle Name</th>
              <th>Fill Date</th>
              <th>Fuel Volume</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {fuellogs.map((fl, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{fl.VEHICLE_NAME}</td>
                <td>{fl.FILL_DATE}</td>
                <td>{fl.FUEL_VOLUME}</td>
                <td>{fl.COST}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Viewfuellogs;
