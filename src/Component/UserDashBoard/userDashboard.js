import React, { useState, useEffect } from "react";
import "../UserDashBoard/userDashboard.css";
import axios from "axios";
import TechAlchemy from "../Images/logo.png";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CheckBalance, adminUsers, transfer, All, Paid, Added, Received, Balance, configObjForaddNotes1 } from "../../Service/dataservice";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import BadgeIcon from "@mui/icons-material/Badge";
import Person2Icon from "@mui/icons-material/Person2";
import Select from "react-select";



const UserDashboard = () => {
  const [search, setSearch] = useState(' ');
  const [walletBalance, setWalletBalance] = useState();
  const [transactionID, setTransactionID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [totalBalance, setTotalBalance] = useState(1000);
  const [transferLimit, setTransferLimit] = useState("");
  const [remainingLimit, setRemainingLimit] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [TransferBalancePopup, setTransferBalancePopup] = useState(false);
  const [Logoutpopup, setLogoutpopup] = useState(false);
  const [TransferLimitSettings, setTransferLimitSettings] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [logout, setlogout] = useState(false);
  const [token, setToken] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();


  const fetchUsers = async () => {
    try {
      const response = await fetch(adminUsers, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": true,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data.result)
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };


  const storedUser = JSON.parse(localStorage.getItem("user"));
  const handleInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInputValue(value);
    const filteredUsers = users.filter((user) =>
      user.firstName.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredUsers);
  };
  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setInputValue(user.firstName + ' ' + user.lastName);
    setSuggestions([]);
  };
  // Function to handle amount input change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleCheckBalance = () => {
    setShowBalance(true);
  };

  const showloginPage = () => {
    localStorage.removeItem("token");
    setlogout(false);
    navigate("/Signin");
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch(Balance, configObjForaddNotes1);
      const data = await response.json();
      setWalletBalance(data.result._balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };



  const addNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      message: message,
    };
    setNotifications([...notifications, newNotification]);
  };
  const handleTransferBalance = () => {
    setTransferBalancePopup(true);
  };
  const closePopupTransferBalance = () => {
    setTransferBalancePopup(false);
  };
  const handleLogout = () => {
    setLogoutpopup(true);
  };
  const hideLogoutPopup = () => {
    setLogoutpopup(false);
  };
  const handleSetDailyLimits = () => {
    setTransferLimitSettings(true);
  };
  const closePopupsetTransferLimitSettings = () => {
    setTransferLimitSettings(false);
  };
  const dailyLimitSubmit = (e) => {
    e.preventDefault();
    setRemainingLimit(transferLimit);
  };
  const handleTransferLimitChange = (event) => {
    setTransferLimit(parseInt(event.target.value));
  };



  const handleTransfer = () => {
    if (selectedUser && amount) {
      const transferdata = {

        receiverId: selectedUser.employeeId,
        amount: amount,
      }
      axios
        .post(transfer, transferdata, configObjForaddNotes1)

        .then((response) => {

          addNotification(`You transferred $${amount} to  ${selectedUser.employeeId}`);
          setTransactionID(response.data.transactionId);
          setTransferSuccess(true);
          setErrorMessage("");
          setAmount(Number);
          setTransferAmount("");
          setInputValue('');
          setAmount('')
        })


        .catch((error) => {
          console.error("Transfer error:", error);
          setErrorMessage("An error occurred during the transfer.");
        });
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container1">
      <div className="dashboard-title1">
        <img
          src={TechAlchemy}
          alt=""
          style={{ width: "10%", marginRight: "15px" }}
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        />
        <text>My Wallet</text>
        <div className="user-details">
          <div className="employee-user-icon">
            <BadgeIcon className="employee-icon" />
            <p className="user-employee">
              {storedUser.result.newResult.employeeId}
            </p>
          </div>
          <div className="fname-user-icon">
            <Person2Icon className="fname-icon" />
            <p className="user-fname-lname">
              {storedUser.result.newResult.firstName}{" "}
              {storedUser.result.newResult.lastName}
            </p>
          </div>
          <div className="email-user-icon">
            <EmailTwoToneIcon className="email-icon" />
            <p className="user-email">{storedUser.result.newResult.email}</p>
          </div>
        </div>
        <div className="notification-icon">
          <FaBell className="fall-bell" />
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
        </div>
      </div>
      <div className="dashboard-menu-item logout1">
        <button className="Logout-buttonuser" onClick={handleLogout}>
          Logout{" "}
        </button>
      </div>
      <div>
        <header className="dashboard-header1">
          <nav className={`side-nav ${isSideNavOpen ? "open" : "closed"}`}>
            <ul className="dashboard-menu1" class="solid">
              <li className="dashboard-menu-item1" id="transferbutton"> Transfer Balance</li>
              <li className="dashboard-menu-item2" id="transactionbutton">Transaction History</li>
              <li className="dashboard-menu-item3" id="setdailylimitbutton">Set Daily Limits</li>
              <li className="dashboard-menu-item4" id="balancebutton">View Balance</li>
            </ul>
          </nav>
        </header>
      </div>

      <div className="account-summary1" id="balancegglf">
        <h2 className="section-title1"> </h2>
        <div className="balance-container1" onClick={handleCheckBalance}>
          Check Balance
          {showBalance && (

            <p className="balance-amount1">Rs. {walletBalance?.toFixed(2)}</p>

          )}
        </div>
      </div>

      <div className="transfer-balance1" id="transgerhjgyud">
        <div>
          <text className="section-transfer1">Transfer Balance</text>
        </div>
        <div>
          <button className="action-button1" onClick={handleTransferBalance}>
            Send Money
          </button>
        </div>
      </div>
      <div className="set-limits1" id="setklimitdfrssa">
        <div>
          <text className="section-transfer1">Set Daily Limits</text>
        </div>

        <button className="action-button1" onClick={handleSetDailyLimits}>
          Set Limits
        </button>
      </div>
      <div className="transaction-hist1" id="transctgghfgsa">
        <button className="view-history1">
          <Link className="view-history1" to="/history">
            View Transaction History
          </Link>
        </button>
      </div>
      <div className="push-notification1" id="pushvbddtegbs">
        {notifications.length > 0 && (
          <div className="notification-dropdown">
            {notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                {notification.message}
              </div>
            ))}
          </div>
        )}
      </div>
      {TransferBalancePopup && (
        <div className="popup-container1">
          <div className="popup-content1">
            <h2>Transfer Balance</h2>
            <div className="form-group1">
              {errorMessage && <div className="error">{errorMessage}</div>}
              {transferSuccess && (
                <div className="success">Transfer successfully!</div>
              )}

              <label className="transferto" htmlFor="username">
                Transfer to
              </label>


              <br />
              <div>
                <input
                  className="Search-user"
                  type="text"
                  placeholder="Search user..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <ul>
                  {suggestions.map((user) => (
                    <li key={user.id} onClick={() => handleUserSelection(user)}>
                      {user.firstName}    {user.lastName}
                    </li>
                  ))}
                </ul>
                {selectedUser && (
                  <>
                    <input
                      className="enter-amount"
                      type="text"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                    <button className="habdle-send-buttin" onClick={handleTransfer}>Send</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="tbbtn2">
            <button className="tbbtn1" onClick={closePopupTransferBalance}>
              X
            </button>
          </div>
        </div>
      )}
      {TransferLimitSettings && (
        <div className="popup-container1">
          <div className="popup-content1">
            <h2>Transfer Limit Settings</h2>
            <form className="sdlfrm" onSubmit={dailyLimitSubmit}>
              <label htmlFor="transferLimit">Set Amount:</label>
              <input
                className="sdlinp1"
                type="number"
                id="transferLimit"
                value={transferLimit}
                onChange={handleTransferLimitChange}
              />
              <button className="sdlbtnsubmit" type="submit">
                Submit
              </button>
            </form>
            <div className="transfer-action1">
              <h3>Transfer Money</h3>
              <button className="sdlbtn1" onClick={() => handleTransfer(50)}>
                Transfer $50
              </button>
              <button className="sdlbtn1" onClick={() => handleTransfer(100)}>
                Transfer $100
              </button>
              <button className="sdlbtn1" onClick={() => handleTransfer(200)}>
                Transfer $200
              </button>
            </div>
            <div className="remaining-limit1">
              <p>Remaining Limit: {remainingLimit}</p>
            </div>
            <button
              className="sdlclosebtn1"
              onClick={closePopupsetTransferLimitSettings}
            >
              X
            </button>
          </div>
        </div>
      )}
      {Logoutpopup && (
        <div className="logout-popup">
          <text className="logout-text">Are you want to confirm Logout</text>
          <button className="confirm-logout" onClick={showloginPage}>
            confirm
          </button>
          <button className="cancel-logout" onClick={hideLogoutPopup}>
            cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
