import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminUsers } from "../../Service/dataservice";
import { walletBalance, adminFundTransfer } from "../../Service/dataservice";
import Table from "react-bootstrap/Table";
import AdminPagination from "./AdminPagination";
import { userAllHistory } from "../../Service/dataservice";
import ReactTimeAgo from "react-time-ago";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transferAmount, setTransferAmount] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [transferSuccess, setTransferSuccess] = useState(null);
  const [selectedUserBalance, setSelectedUserBalance] = useState(null);
  const [selectedUserHistory, setSelectedUserHistory] = useState(null);
  const [Logoutpopup, setLogoutpopup] = useState(false);
  const [userBalance, setuserBalance] = useState(null);
  const [empId, setEmpID] = useState(null);
  const [allUsersHistory, setAllUsersHistory] = useState([]);
  const [sendHistory, setSendHistory] = useState([]);
  const [receiveHistory, setReceiveHistory] = useState([]);
  const [addedHistory, setAddedHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // All Users List
  useEffect(() => {
    axios
      .get(adminUsers, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((response) => {
        const allUsers = response.data.result;
        // console.log(allUsers);
        // console.log(response.data.result);
        setUsers(allUsers);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  // Fund Users Account
  const fundUserWallet = (e) => {
    e.preventDefault();
    const userBody = {
      // adminId: 1,
      employeeId: selectedUser.employeeId,
      amount: transferAmount,
    };

    axios
      .post(adminFundTransfer, userBody, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((response) => {
        // Handle the response
        // console.log("Funding response:", response);
        setSelectedUser(false);
        if (response.status === 200) {
          setTransferSuccess(true);
          // setTransferSuccess("Transaction Succesful");
        } else {
          console.log("Invalid");
        }
      })
      .catch(function (error) {
        setErrorMessage("Transaction Not Sucseesful");
        console.error("Error:", error);
        // Handle the error
      });

    // Update user balance and fund wallet balance in real time
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              userBalance: user.userBalance + transferAmount,
            }
          : user
      )
    );
  };

  const sendBalancePopupClose = () => {
    setSelectedUser(false);
  };

  const SuccesspoupClose = () => {
    setTransferSuccess(false);
  };

  // View Users Balance
  const handleViewBalanceClick = (employeeId) => {
    // console.log(employeeId);
    setSelectedUserBalance(true);
    const emloyeeBody = {
      employeeId: employeeId,
    };
    fetch(walletBalance, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emloyeeBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Balance:", data.result);
        setEmpID(data.result._employee_id);
        setuserBalance(data.result._balance);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };
  const ViewBalancepoupClose = () => {
    setSelectedUserBalance(false);
  };

  // View Users History

  const handleViewHistoryClick = (employeeId) => {
    // console.log(employeeId);
    setSelectedUserHistory(true);
    setSelectedUserHistory(employeeId);

    fetch(`${userAllHistory}/${employeeId}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("User History:", data);
        // console.log("User History:", data.result.SendHistory);
        const sendHistory = data.result.getSendHistory;
        setSendHistory(sendHistory);
        const receiveHistory = data.result.getReceiveHistory;
        setReceiveHistory(receiveHistory);
        const addedHistoryvar = data.result.getAddedHistory;
        setAddedHistory(addedHistoryvar);
        // console.log(addedHistoryvar);

        const allUserHistory = [
          ...sendHistory,
          ...receiveHistory,
          ...addedHistoryvar,
        ];

        setAllUsersHistory(allUserHistory);
        console.log(allUserHistory);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderTransactions = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 8;
    // const updateTime()
    switch (selectedTab) {
      case "All":
        return allUsersHistory
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(startIndex, endIndex);
      case "Paid":
        return sendHistory
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(startIndex, endIndex);
      case "Received":
        return receiveHistory
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(startIndex, endIndex);
      case "Added":
        return addedHistory
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(startIndex, endIndex);
      default:
        return allUsersHistory
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(startIndex, endIndex);
    }
  };
  const HistorybtnPopupClose = () => {
    setSelectedUserHistory(false);
  };
  const totalPages = Math.ceil(allUsersHistory.length / 10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabSelection = (tab) => {
    setSelectedTab(tab);
    // if (tab === "Paid") {
    // } else if (tab === "Received") {
    //   // fetchReceivedTransactions();
    // }
  };

  // Function to logout
  const navigate = useNavigate();
  const handleLogout = () => {
    setLogoutpopup(true);
  };
  const hideLogoutPopup = () => {
    setLogoutpopup(false);
  };

  return (
    <div className="adminContainer">
      <div className="admindashhead">
        <div className="adminheadline">Admin Dashboard</div>
        <div className="admindashclrline"></div>
        <div>
          <button
            className="admintransactionhisbtn"
            onClick={() => navigate("/AdminTransactionHistory")}
          >
            Admin Transaction History
          </button>

          <button className="adminbtn3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="adminbtndiv">
        {/* User List Table*/}

        <Table striped bordered hover style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee Id</th>
              <th>View Balance</th>
              <th>Fund Transfer</th>
              <th>User History</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.employeeId}</td>
                <td>
                  <button
                    className="adminbtn2"
                    onClick={() => handleViewBalanceClick(user.employeeId)}
                  >
                    View Balance
                  </button>
                </td>
                <td>
                  <button
                    className="adminbtn1"
                    onClick={() => {
                      setSelectedUser(user);
                    }}
                  >
                    Fund Wallet
                  </button>
                </td>
                <td>
                  <button
                    className="adminbtn1"
                    onClick={() => handleViewHistoryClick(user.employeeId)}
                  >
                    View History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Ballance View */}

        {selectedUserBalance && (
          <div className="popup-container1">
            <div className="popup-content1">
              <div className="walletBalancehead">Wallet Ballance</div>
              <div className="horizontalline"></div>
              <div className="vbemlpoyeeId">Employee ID: {empId}</div>
              <div className="userblc">Balance: {userBalance}</div>
              <button
                className="ViewBalanceclosepop"
                onClick={ViewBalancepoupClose}
              >
                X
              </button>
            </div>
          </div>
        )}

        {/* User History View*/}

        {selectedUserHistory && (
          <div className="Historypopup-container1">
            <div className="Historypopup-content1">
              <div className="adminhistory-container">
                <div className="admincontainer-history">
                  <div className="adminuserhishead">Transaction History</div>
                  <div className="admintabs">
                    <button
                      className={selectedTab === "All" ? "active" : ""}
                      onClick={() => handleTabSelection("All")}
                    >
                      All
                    </button>
                    <button
                      className={selectedTab === "Paid" ? "active" : ""}
                      onClick={() => handleTabSelection("Paid")}
                    >
                      Paid
                    </button>
                    <button
                      className={selectedTab === "Received" ? "active" : ""}
                      onClick={() => handleTabSelection("Received")}
                    >
                      Received
                    </button>
                    <button
                      className={selectedTab === "Added" ? "active" : ""}
                      onClick={() => handleTabSelection("Added")}
                    >
                      Added
                    </button>
                  </div>

                  <div>
                    <Table striped bordered hover style={{ margin: "0 auto" }}>
                      <thead>
                        <tr>
                          <th>Transaction ID</th>
                          {/* <th>Employee Id ID</th> */}
                          <th>Amount</th>
                          <th>Date and Time</th>
                          <th>Sender ID</th>
                          <th>Receiver ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTab === "All"
                          ? renderTransactions().map((transaction) => (
                              <tr>
                                <td>{transaction._id}</td>
                                {/* <td>{transaction._sender_id}</td> */}
                                <td>{transaction._amount}</td>
                                <td>
                                  {" "}
                                  <ReactTimeAgo
                                    date={transaction.created_at}
                                    locale="en-US"
                                  />
                                </td>
                                <td>{transaction._sender_id}</td>
                                <td>{transaction._receiver_id}</td>
                              </tr>
                            ))
                          : selectedTab === "Paid"
                          ? renderTransactions().map((transaction) => (
                              <tr>
                                <td>{transaction._id}</td>
                                {/* <td>{transaction._sender_id}</td> */}
                                <td>{transaction._amount}</td>
                                <td>
                                  {" "}
                                  <ReactTimeAgo
                                    date={transaction.created_at}
                                    locale="en-US"
                                  />
                                </td>
                                <td>{transaction._sender_id}</td>
                                <td>{transaction._receiver_id}</td>
                              </tr>
                            ))
                          : selectedTab === "Received"
                          ? renderTransactions().map((transaction) => (
                              <tr>
                                <td>{transaction._id}</td>
                                {/* <td>{transaction._receiver_id}</td> */}
                                <td>{transaction._amount}</td>
                                <td>
                                  {" "}
                                  <ReactTimeAgo
                                    date={transaction.created_at}
                                    locale="en-US"
                                  />
                                </td>
                                <td>{transaction._sender_id}</td>
                                <td>{transaction._receiver_id}</td>
                              </tr>
                            ))
                          : selectedTab === "Added"
                          ? renderTransactions().map((transaction) => (
                              <tr>
                                <td>{transaction._id}</td>
                                {/* <td>{transaction._employee_id}</td> */}
                                <td>{transaction._amount}</td>
                                <td>
                                  {" "}
                                  <ReactTimeAgo
                                    date={transaction.created_at}
                                    locale="en-US"
                                  />
                                </td>
                                <td>Admin</td>
                                {/* <td>{transaction._admin_id}</td> */}
                                <td>{transaction._employee_id}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </Table>
                  </div>
                  <div className="adminpagination">
                    <AdminPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
                <button
                  className="HistoryClosePopup"
                  onClick={HistorybtnPopupClose}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Form  / Fund Wallet*/}

        {selectedUser && (
          <div className="popup-container1">
            <div className="popup-content1">
              <div className="firstfundwallet">Fund Wallet</div>
              <div className="horizontalline"></div>

              <div className="group1AdFundTr">
                <div className="group1AdFundTrHeadline">
                  <div className="ftfirstlastname">
                    Transfer to: {selectedUser.firstName}{" "}
                    {selectedUser.lastName}
                  </div>{" "}
                  <br />
                  <div className="ftempid">
                    Employee Id: {selectedUser.employeeId}
                  </div>
                </div>
                <br />
              </div>
              <div className="form-group2AdFundTr">
                <label htmlFor="amount">Enter amount:</label>
                <br />
                <input
                  className="tbinp1"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                />
              </div>

              <button className="AdFundTrsend" onClick={fundUserWallet}>
                Send
              </button>
              <div>
                <button
                  className="AdFundclosepop"
                  onClick={sendBalancePopupClose}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Success */}

        {transferSuccess && (
          <div className="popup-container1">
            <div className="popup-content1">
              <div className="transucimg"></div>
              <div>{errorMessage}</div>
              <div className="transactionsucc">Transaction Successful</div>
              <div className="group1AdFundTr">
                <br />
              </div>

              <div>
                <button
                  className="TrSuccessclosepop"
                  onClick={SuccesspoupClose}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}

        {Logoutpopup && (
          <div className="adminlogout-popup">
            <text className="adminlogout-text">
              Are you want to confirm Logout
            </text>
            <button
              className="adminconfirm-logout"
              onClick={() => navigate("/Adminlogin")}
            >
              confirm
            </button>
            <button className="admincancel-logout" onClick={hideLogoutPopup}>
              cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
