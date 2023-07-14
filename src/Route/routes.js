import React from "react";
import Signup from "../Component/SignUP/signup";
// import TransactionHistory from "../Component/History/history";
import UserDashboard from "../Component/UserDashBoard/userDashboard";
import Signin from "../Component/SignIn/Signin";
import Adminlogin from "../Component/Admin Login/Adminlogin";
import AdminDashboard from "../Component/AdminDashBaord/AdminDashboard";
import AdminTransactionHistory from "../Component/AdminDashBaord/AdminTransactionHistory";
import Home from "../Component/Home/home";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  // Navigate,
} from "react-router-dom";
import History1 from "../History/History1";
// import ViewUserHistory from "../Component/AdminDashBaord/ViewUserHistory";
// const isAuthenticated = true; // Replace with your authentication logic

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return isAuthenticated ? (
//     <Route {...rest} element={<Component />} />
//   ) : (
//     <Navigate to="/signin" replace state={{ from: rest.path }} />
//   );
// };
const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/Signin" Component={Signin}></Route>
          <Route path="/Adminlogin" Component={Adminlogin}></Route>
          <Route path="/signup" Component={Signup}></Route>
          <Route
            exact
            path="/adminDashboard"
            Component={AdminDashboard}
          ></Route>
          <Route
            path="/AdminTransactionHistory"
            Component={AdminTransactionHistory}
          ></Route>
          <Route path="/userDashboard" Component={UserDashboard}></Route>
          {/* <Route path="/history" Component={TransactionHistory}></Route> */}
          {/* <Route exact path="/userHistory" component={ViewUserHistory} /> */}
          <Route
            exact
            path="/adminDashboard"
            Component={AdminDashboard}
          ></Route>
          <Route path="/userDashboard" Component={UserDashboard}></Route>
          <Route
            path="/AdminTransactionHistory"
            Component={AdminTransactionHistory}
          ></Route>

          {/* <Route path="/history" Component={TransactionHistory}></Route> */}
          {/* <Route exact path="/History1" Component={History1} /> */}
          <Route path="/userHistory" Component={History1} />

          {/* Protected Routes */}
          {/* <PrivateRoute path="/userDashboard" component={UserDashboard} />
          <PrivateRoute path="/history" component={TransactionHistory} />
          <PrivateRoute path="/adminDashboard" component={AdminDashboard} />
          <PrivateRoute
            path="/adminTransactionHistory"
            component={AdminTransactionHistory}
          />
          <PrivateRoute path="/viewUsersBalance" component={ViewBalance} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
