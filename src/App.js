import React, { useEffect, useState } from "react";
import HomeComponent from "./Components/HomeComponent";
import Nav from "./Components/Nav";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Messages from "./Components/Messages";
import LikeList from "./Components/LikeList";
import Matches from "./Components/Matches";
import axios from "axios";
let jwtDecode = require("jwt-decode");

const App = () => {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [token, getTokenInfo] = useState();
  const [usersName, setUsersName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      console.log("Im Working now?");
      setUsersName(decodedToken.unique_name);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const getLoginInfoInConsole = event => {
    const realValues = { ...loginInfo };
    realValues[event.target.name] = event.target.value;
    setLoginInfo(realValues);
    console.log(loginInfo);
  };

  const submitLoginInfo = event => {
    event.preventDefault();
    const realValues = { ...loginInfo };
    realValues[event.target.name] = event.target.value;
    setLoginInfo(realValues);
    console.log(loginInfo);
    axios
      .post("https://localhost:44332/api/auth/login", loginInfo)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        getTokenInfo(localStorage.getItem("token"));
        setUsersName(loginInfo.username);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Nav
        token={token}
        loginInfo={loginInfo}
        getLoginInfoInConsole={getLoginInfoInConsole}
        submitLoginInfo={submitLoginInfo}
        usersName={usersName}
        getTokenInfo={getTokenInfo}
      />
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/messages" component={Messages} />
        <Route path="/likes" component={LikeList} />
        <Route path="/matches" component={Matches} />
      </Switch>
    </div>
  );
};

export default App;
