import { useState, useEffect } from "react";
import "../Styles/Viewinsurance.css";
import axios from "axios";

const Viewinsurance = () => {
  const [insData, setInsData] = useState([
    {
      VEHICLE_NAME: "",
      INS_PROVIDER: "",
      POLICYNO: "",
      EXPIRY_DATE: "",
    },
  ]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .post("http://localhost:5500/Viewinsurance", {
        userId: userId,
      })
      .then((res) => {
        console.log(res.data);
        setInsData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);
  return (
    <>
      <div className="insurancecont">
        <table>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Vehicle Name</th>
              <th>Insurance Provider</th>
              <th>Policy No</th>
              <th>Expiry Dates</th>
            </tr>
          </thead>
          <tbody>
            {insData.map((ins, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ins.VEHICLE_NAME}</td>
                <td>{ins.INS_PROVIDER}</td>
                <td>{ins.POLICYNO}</td>
                <td>{ins.EXPIRY_DATE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Viewinsurance;
