import {useState,useEffect} from 'react'
import "../Styles/Viewmaintenance.css";
import axios from 'axios';

const Viewmaintenance = () => {

    const [mntData,setMntData] = useState([{
        VEHICLE_NAME:"",
        SERVICE_DATE:"",
        DESCRIPTION:"",
    }]);

    const userId =localStorage.getItem("userId");

    useEffect(()=>{
        axios.post("http://localhost:5500/Viewmaintenance",{
            userId:userId,
        })
            .then(res=>{
                console.log(res.data);
                setMntData(res.data);
            })
            .catch(err=>console.error(err));    
    },[userId]);

  return (
    <>
      <div className="mntcont">
        <table>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Vehicle Name</th>
              <th>Service Date</th>
              <th>Decription</th>
            </tr>
          </thead>
          <tbody>
          {mntData.map((mnt,index)=>(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{mnt.VEHICLE_NAME}</td>
              <td>{mnt.SERVICE_DATE}</td>
              <td>{mnt.DESCRIPTION}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Viewmaintenance
