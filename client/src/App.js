import React, { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddAssignment from "./components/AddAssignment";
import ViewAssignments from "./components/ViewAssignments";
import ViewAssignment from "./components/ViewAssignment";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [refresh, setRefresh] = useState(0);

  useLayoutEffect(() => {}, [refresh]);

  const redirectPage = () => {
    setRefresh(Math.floor(Math.random() * 1000));
  };

  return (
    <div className="App">
      <Router>
        <Navbar refresh={refresh} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} redirectPage={redirectPage} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <LogIn {...props} redirectPage={redirectPage} />}
          />
          <Route exact path="/addassignment" component={AddAssignment} />
          <Route exact path="/viewassignments" component={ViewAssignments} />
          <Route exact path="/viewassignment/:id" component={ViewAssignment} />
        </Switch>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
