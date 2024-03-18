import { useState, useEffect } from "react";
import "../Styles/Viewvehicles.css";
import axios from "axios";

const Viewvehicles = () => {
  const [vehiclesData, setVehiclesData] = useState([
    {
      VEHICLE_NAME: "",
      REGNO: "",
      OWNER_SERIAL: "",
      VEHICLE_TYPE: " ",
      VEHICLE_MAKER: "",
      VEHICLE_MODEL: "",
      YEAR: "",
      VEHICLE_CLASS: "",
      VIN: "",
      ENGNO: "",
      FUEL_TYPE: "",
      EMISSION_NORM: "",
    },
  ]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .post("http://localhost:5500/Viewvehicles", {
        userId: userId,
      })
      .then((res) => {
        console.log(res.data);
        setVehiclesData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <div className="vehiclecont">
        <table>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Vehicle Name</th>
              <th>Reg No</th>
              <th>Owner Serial</th>
              <th>Vehicle Type</th>
              <th>Vehicle Maker</th>
              <th>Vehicle Model</th>
              <th>Year</th>
              <th>Vehicle Class</th>
              <th>VIN</th>
              <th>Engine No</th>
              <th>Fuel Type</th>
              <th>Emission Norm</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesData.map((vehicle, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{vehicle.VEHICLE_NAME}</td>
                <td>{vehicle.REGNO}</td>
                <td>{vehicle.OWNER_SERIAL}</td>
                <td>{vehicle.VEHICLE_TYPE}</td>
                <td>{vehicle.VEHICLE_MAKER}</td>
                <td>{vehicle.VEHICLE_MODEL}</td>
                <td>{vehicle.YEAR}</td>
                <td>{vehicle.VEHICLE_CLASS}</td>
                <td>{vehicle.VIN}</td>
                <td>{vehicle.ENGNO}</td>
                <td>{vehicle.FUEL_TYPE}</td>
                <td>{vehicle.EMISSION_NORM}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Viewvehicles;
