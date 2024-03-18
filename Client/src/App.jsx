import {Routes,Route} from 'react-router-dom';
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import Addvehicles from './Components/Addvehicles';
import Addinsurances from './Components/Addinsurances';
import Addfuellogs from './Components/Addfuellogs';
import Addmaintenances from './Components/Addmaintenances';
import Viewvehicles from './Components/Viewvehicles';
import Viewinsurance from './Components/Viewinsurance';
import Viewmaintenance from './Components/Viewmaintenance';
import Viewfuellogs from './Components/Viewfuellogs';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Addvehicles" element={<Addvehicles/>}/>
        <Route path="/Addinsurances" element={<Addinsurances/>}/>
        <Route path="/Addfuellogs" element={<Addfuellogs/>}/>
        <Route path="/Addmaintenances" element={<Addmaintenances/>}/>
        <Route path="/Viewvehicles" element={<Viewvehicles/>}/>
        <Route path="/Viewinsurance" element={<Viewinsurance/>}/>
        <Route path="/Viewmaintenance" element={<Viewmaintenance/>}/>
        <Route path="/Viewfuellogs" element={<Viewfuellogs/>}/>
      </Routes>
    </>
  )
}

export default App
