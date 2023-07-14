import React, { useState, useEffect } from "react";
import "./History1.css";
import Table from "react-bootstrap/Table";
import { All, configObjForaddNotes1 } from "../Service/dataservice";
import ReactTimeAgo from "react-time-ago";
import UserHistoryPagination from "./UserHistoryPagination";


export default function History1() {
  const [allUsersHistory, setAllUserHistory] = useState([]);
  const [sendHistory, setSendHistory] = useState([]);
  const [receiveHistory, setReceiveHistory] = useState([]);
  const [addedHistory, setAddedHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(All, configObjForaddNotes1, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User History:", data);
        // console.log("User History:", data.result.SendHistory);
        const sendHistory = data.result.getSendHistory;
        setSendHistory(sendHistory);
        const receiveHistory = data.result.getReceiveHistory;
        setReceiveHistory(receiveHistory);
        const addedHistory = data.result.getAddedHistory;
        setAddedHistory(addedHistory);

        const allUserHistory = [
          ...sendHistory,
          ...receiveHistory,
          ...addedHistory,
        ];

        setAllUserHistory(allUserHistory);
        console.log(allUserHistory);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const renderTransactions = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 15;
    switch (selectedTab) {
      case "All":
        return allUsersHistory
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(startIndex, endIndex);
      case "Paid":
        return sendHistory.slice(startIndex, endIndex);
      case "Received":
        return receiveHistory.slice(startIndex, endIndex);
      case "Added":
        return addedHistory.slice(startIndex, endIndex);
      default:
        return allUsersHistory.slice(startIndex, endIndex);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(allUsersHistory.length / 10);

  const handleTabSelection = (tab) => {
    setSelectedTab(tab);
  };
  return (
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
              {selectedTab === "All" && allUsersHistory.length > 0
                ? renderTransactions().map((transaction) => (
                    <tr>
                      <td>{transaction._id}</td>
                      {/* <td>{transaction._sender_id}</td> */}
                      <td>{transaction._amount}</td>
                      <td>
                        {" "}
                        <ReactTimeAgo
                          date={new Date(transaction.created_at)}
                          locale="en-US"
                        />
                        {/* <ReactTimeAgo
                          date={transaction.created_at}
                          locale="en-US"
                        /> */}
                      </td>
                      <td>{transaction._sender_id}</td>
                      <td>{transaction._receiver_id}</td>
                    </tr>
                  ))
                : selectedTab === "Paid" && sendHistory.length > 0
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
                : selectedTab === "Received" && receiveHistory.length > 0
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
                : selectedTab === "Added" && addedHistory.length > 0
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
        <div className="userpagination">
          <UserHistoryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
