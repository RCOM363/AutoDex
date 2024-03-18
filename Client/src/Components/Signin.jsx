import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Signin.css";

const Signin = () => {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(signinData);

    axios
      .post("http://localhost:5500/signin", {
        email: signinData.email,
        password: signinData.password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem("userId", JSON.stringify(res.data.user_id));
        navigate("/Dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSigninData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)} className="signin">
        <h3>Sign-In</h3>
        <div className="incont">
          <input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            required
            value={signinData.email}
            onChange={(event) => handleChange(event)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="incont">
          <input
            id="password"
            name="password"
            type="password"
            placeholder=" "
            required
            value={signinData.password}
            onChange={(event) => handleChange(event)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Signin</button>
        <div className="link">
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to="/Signup">
              <b>Signup</b>
            </Link>{" "}
          </p>
        </div>
      </form>
    </>
  );
};

export default Signin;
