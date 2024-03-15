import { useState } from "react";
import "../Styles/Addvehicles.css"
import axios from "axios";

const Addvehicles = () => {
  const [vehiclesData, setVehiclesData] = useState([
    {
      vehicleName: "",
      regNo: "",
      ownerSerial: "",
      vehicleType: "",
      vehicleMaker: "",
      vehicleModel: "",
      year: "",
      vehicleClass: "",
      vin: "",
      engNo: "",
      fuelType: "",
      emissionNorm: "",
    },
  ]);

  const userId =localStorage.getItem("userId");

  const handleSubmit = (event)=> {
    event.preventDefault();
    console.log(vehiclesData);
    axios.post("http://localhost:5500/Addvehicles",{vehiclesData,userId})
      .then(res => console.log(res))
      .catch(err=> console.log(err));
    setSubmitted(true);
  }

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...vehiclesData];
    newData[index][name] = value;
    setVehiclesData(newData);
  };

  const addVehicle = () => {
    setVehiclesData([
      ...vehiclesData,
      {
        vehicleName: "",
        regNo: "",
        ownerSerial: "",
        vehicleType: "",
        vehicleMaker: "",
        vehicleModel: "",
        year: "",
        vehicleClass: "",
        vin: "",
        engNo: "",
        fuelType: "",
        emissionNorm: "",
      },
    ]);
  };

  const [submitted,setSubmitted] = useState(false);
  
  if(!userId){
    return(<div>Please sign in</div>);
  } else{
    return (
    <>
      <form onSubmit={(event)=> handleSubmit(event)} className="addVehicles">
        <h3>Fill in the following details about your vehicle</h3>
        <div className="vehicles">
        {vehiclesData.map((vehicle,index) => (
          <div className="vehicle" key={index}>
          <h3>Vehicle {index+1}</h3>
            <div className="incont">
              <input
                name="vehicleName"
                id="vehicleName"
                type="text"
                placeholder=" "
                required
                value={vehicle.vehicleName}
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
                value={vehicle.regNo}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="regNo">Reg No</label>
            </div>
            <div className="incont">
              <input
                name="ownerSerial"
                id="ownerSerial"
                type="text"
                placeholder=" "
                required
                value={vehicle.ownerSerial}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="ownerSerial">Owner Serial</label>
            </div>
            <div className="incont">
              <input
                name="vehicleType"
                id="vehicleType"
                type="text"
                placeholder=" "
                required
                value={vehicle.vehicleType}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="vehicleType">Vehicle Type</label>
            </div>
            <div className="incont">
              <input
                name="vehicleMaker"
                id="vehicleMaker"
                type="text"
                placeholder=" "
                required
                value={vehicle.vehicleMaker}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="vehicleMaker">Vehicle Maker</label>
            </div>
            <div className="incont">
              <input
                name="vehicleModel"
                id="vehicleModel"
                type="text"
                placeholder=" "
                required
                value={vehicle.vehicleModel}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="vehicleModel">Vehicle Model</label>
            </div>
            <div className="incont">
              <input
                name="year"
                id="year"
                type="text"
                placeholder=" "
                required
                value={vehicle.year}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="year">Year</label>
            </div>
            <div className="incont">
              <input
                name="vehicleClass"
                id="vehicleClass"
                type="text"
                placeholder=" "
                required
                value={vehicle.vehicleClass}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="vehicleClass">Vehicle Class</label>
            </div>
            <div className="incont">
              <input
                name="vin"
                id="vin"
                type="text"
                placeholder=" "
                required
                value={vehicle.vin}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="incont">
              <input
                name="engNo"
                id="engNo"
                type="text"
                placeholder=" "
                required
                value={vehicle.engNo}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="vin">Engine No</label>
            </div>
            <div className="incont">
              <input
                name="fuelType"
                id="fuelType"
                type="text"
                placeholder=" "
                required
                value={vehicle.fuelType}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="vin">Fuel Type</label>
            </div>
            <div className="incont">
              <input
                name="emissionNorm"
                id="emissionNorm"
                type="text"
                placeholder=" "
                required
                value={vehicle.emissionNorm}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor="vin">Emission Norm</label>
            </div>
          </div>
        ))}
        </div>
        <div className="buttons">
        <button className="addVehicle" onClick={addVehicle}>
          Add Vehicle
        </button>
        <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
  }
};

export default Addvehicles;
