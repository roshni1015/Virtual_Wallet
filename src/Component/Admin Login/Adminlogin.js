import React, { useState } from "react";
import "./Adminlogin.css";
import { useNavigate } from "react-router";
import { adminLogin } from "../../Service/dataservice";
import axios from "axios";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const adminsubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const Admindata = { email, password };

    axios
      .post(`${adminLogin}`, Admindata)
      .then((response) => {
        // console.log(response);

        if (response.data.status === 200) {
          setTimeout(() => {
            setLoading(false);
            navigate("/adminDashboard");
          }, 5);
        } else if (
          response.data.message === "check email or password once again"
        ) {
          setLoading(false);

          setError("check email or password once again");
        } else {
          console.log("Invalid");
        }
      })
      .catch((error) => {
        // Handle error
        if (error.response && error.response.status === 403) {
          setError("check email or password once again");
          setLoading(false);

          // Validation error from the API
          console.log("Validation error:", error.response.data);
          // You can display error messages to the user or perform other actions as needed
        } else {
          // Other error
          console.error("Error:", error);
        }
      });
  };

  const togglePasswordVisibilityon = (e) => {
    e.preventDefault();

    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="adminmain">
        <div className="adminloginform">
          <div className="admintech-logo"></div>
          <div className="adminacc1">Login to Admin Account</div>
          {/* <p style={{ color: "red" }}>{error}</p> */}
          <form onSubmit={adminsubmit} className="adminlogin_form">
            <br />
            <p className="adminerror">{error}</p>
            <input
              type="email"
              value={email}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              class="admininp1"
              name="email"
              placeholder="Enter The Email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <br />

            <br />
            <input
              class="admininp4"
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              placeholder="Enter The Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button className="admineye" onClick={togglePasswordVisibilityon}>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>

            <br />
            <br />
            <button type="submit" value="Sign in" id="adminsignin">
              Login
            </button>
            {loading && <div>Loading...</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
export default Adminlogin;
