import React, { useState } from "react";
import "../SignUP/SignUp.css";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Signup } from "../../Service/dataservice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [toastShown, setToastShown] = useState(false); 

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    const emailRegex = /^[a-zA-Z]+[0-9]*@.*$/;
    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      employeeId,
      password,
    };

    try {
      const response = await fetch(Signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        if (!toastShown) {
          toast.success("User registered successfully");
          setToastShown(true); 
        }
          setTimeout(() => {
            navigate("/Signin"); 
          }, 6000); 
    } else {
        throw new Error("Signup request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="singupmain">
        <div className="row" id="singuprow">
          <div className="col-md-8">
            <div className="singuploginform">
              <h1>Create a your Account</h1>

              <form className="" onSubmit={handleSubmit}>
                <input
                  className="singupinp1"
                  type="name"
                  id="fname"
                  name="fname"
                  placeholder="Enter your First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                  class="singupinp1"
                  type="name"
                  placeholder="Enter your Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />

                <input
                  class="singupinp1"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your Email ID"
                  onChange={handleEmail}
                />
                {emailError && <p className="singuperror">{emailError}</p>}

                <input
                  class="singupinp1"
                  name=""
                  placeholder="Enter your Employee ID"
                  onChange={(e) => setEmployeeId(e.target.value)}
                />

                <div>
                  <input
                    class="singupinp1"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your Password"
                    autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    className="singupeye"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </button>
                </div>

                <div>
                  <input
                    class="singupinp1"
                    type={showConfirmPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />

                  <button
                    className="singupeye"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <AiFillEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </button>
                  {passwordMatchError && (
                    <p className="singuperror">{passwordMatchError}</p>
                  )}
                </div>

                <button type="submit" value="Sign up" id="sign" >
                  Sign Up
                </button>
                <div className="singuplast-SigUp">
                  Already have an Account?
                  <div className="singuptext-Login">
                    <Link className="singuptext-Login" to="/Signin">
                      Log In
                    </Link>
                  </div>
                
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default SignUp;
