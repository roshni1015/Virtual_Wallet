import React from 'react'
import '../Home/home.css'
import HomeImage from '../Images/home.jpeg'
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

  return (
    <div className='home'>
      <div className='home-container'>
        
        <div className='home-content-name'>
          {/* <div className='home-logo-name'> */}
          <img className='Home-logo-img' src={HomeImage} alt='' ></img>

          <text className='home-logo'>Smart Wallet</text>
          <text className='home-text'>Home</text>
          <text className='home-about'>About</text>
          <text className='home-career'>Career</text>
          <text className='home-contact'>Contact</text>
        </div>
        <div className='home-title'>
          <h1 className='Smart-payment'>SMART &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br></br>Payment Wallet</h1>
          <p className='Smart-para'>Smart Wallet is a cutting-edge digital financial platform designed to revolutionize the way <br></br>you manage your finances. With our secure and user-friendly interface, you can  easily  &nbsp; &nbsp; <br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; track your expenses, monitor your savings, and make seamless transactions all in one place.
          </p>

        </div>
        <div className='get-view'>
        <button className='get-started' onClick={() => navigate("/Signin")}>Get Started</button>
        <button className='view-demo'> View Demo</button>

        </div>
       
</div>
      </div>


  )
}

export default Home
