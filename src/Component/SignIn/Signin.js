import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { login } from "../../Service/dataservice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const togglePasswordVisibility = (e) => {
    e.preventDefault();

    setShowPassword(!showPassword);
  };

  // const handleLogin = async (e) => {
  const usersubmit = async (e) => {
    e.preventDefault();

    // console.warn(email, password);

    const logindata = {
      email,
      password,
    };
    axios
      .post(`${login}`, logindata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response data
        // console.log("hello");
        // console.log(response);
        if (response.data.status === 200) {
          // Handle other response statuses if needed
          navigate("/userDashboard");
        } else {
          console.log("Invalid");
          setError("Oops, this doesn’t look correct. Please try again");
        }
        const userData = response.data;
        const token = response.data.result.token;

        console.log(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        // const token1 = localStorage.getItem(token);
        // console.log(token1);
        // setToken(token1);
      })
      .catch((error) => {
        // Handle error

        if (error.response && error.response.status === 401) {
          // Validation error from the API
          setError("Oops, this doesn’t look correct. Please try again");
          console.log("Validation error:", error.response.data);
          // You can display error messages to the user or perform other actions as needed
        } else {
          // Other error
          console.error("Error:", error);
        }
      });
  };

  return (
    <div>
      <div className="usrmain">
        <div className="row">
          <div className="col-md-6" id="usrcont1">
            <div className="usrloginform">
              <div className="usrtech-logo"></div>
              <div className="usracc1">Login to Your Account</div>
              <p className="usererror">{error}</p>
              {/* <form onSubmit={submit} className="login_form"> */}
              <form onSubmit={usersubmit} className="login_form">
                <br />
                <input
                  type="email"
                  value={email}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  class="usrinp1"
                  name="email"
                  placeholder="Enter The Email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <br />

                <br />
                <input
                  class="usrinp2"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  name="password"
                  placeholder="Enter The Password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button className="usreye" onClick={togglePasswordVisibility}>
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
                <br />

                <br />
                <button type="submit" value="Sign in" id="usrsignin">
                  Sign in
                </button>
              </form>
              <div className="usraccr">Don't have an Account yet ?</div>
              <div className="usraccr1">
                <Link id="signup1234" to="/signup">
                  Create an account
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6" id="usrcont2">
            <div className="usrloginform2">
              <div className="usrnewtxt">
                <div className="signinheadline">ADMIN PANEL</div>
              </div>
              <div className="usrsub-txt">
                <div className="signinheadline2">Admin Login</div>
              </div>
              <br />
              <br />
              <Link id="usrinp" to="/Adminlogin">
                <button type="submit" value="Sign in" class="usrsignin">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signin;
