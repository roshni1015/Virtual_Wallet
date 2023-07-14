import React, { useState, useEffect } from "react";
import AdminPagination from "./AdminPagination";
import { adminHistory } from "../../Service/dataservice";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./AdminTransactionHistory.css";
import ReactTimeAgo from "react-time-ago";

export default function AdminTransactionHistory() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get(adminHistory, {
        headers: {
          "ngrok-skip-browser-warning": true,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        // console.log(response.data.result);
        const TransactionHistory = response.data.result;
        setAllTransactions(TransactionHistory);
        // console.log(TransactionHistory);
      })
      .catch(function (error) {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }, []);

  const renderTransactions = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 15;
    switch (selectedTab) {
      case "Paid":
        return allTransactions
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .filter((transaction) => transaction.type === "Paid")
          .slice(startIndex, endIndex);
      case "Received":
        return allTransactions
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .filter((transaction) => transaction.type === "Received")
          .slice(startIndex, endIndex);
      case "Added":
        return allTransactions
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .filter((transaction) => transaction.type === "Added")
          .slice(startIndex, endIndex);
      default:
        return allTransactions
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(startIndex, endIndex);
    }
  };

  const totalPages = Math.ceil(allTransactions.length / 10);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleTabSelection = (tab) => {
  //   setSelectedTab(tab);
  // };

  return (
    <div>
      <div className="adhishistory-container">
        <div className="adhiscontainer-history">
          <div className="adhisadminhistory-container">
            <div className="adhisadmincontainer-history">
              <div className="adhisadminuserhishead">
                Admin Transaction History
              </div>
              {/* <div className="adhisadmintabs">
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
              </div> */}

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
                    {allTransactions.length > 0
                      ? renderTransactions().map((transaction) => (
                          <tr>
                            <td>{transaction._id}</td>
                            {/* <td>{transaction._employee_id}</td> */}
                            <td>{transaction._amount}</td>

                            <td>
                              <ReactTimeAgo
                                date={transaction.created_at}
                                locale="en-US"
                              />
                            </td>
                            <td>{transaction._admin_id}</td>
                            <td>{transaction._employee_id}</td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
              </div>
              <div className="adhisadminpagination">
                <AdminPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
