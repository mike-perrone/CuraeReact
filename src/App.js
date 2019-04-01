import React, { useEffect, useState } from "react";
import HomeComponent from "./Components/HomeComponent";
import Nav from "./Components/Nav";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Messages from "./Components/Messages";
import LikeList from "./Components/LikeList";
import MemberList from "./Components/MembersList";
import axios from "axios";

let jwtDecode = require("jwt-decode");


const App = () => {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [token, getTokenInfo] = useState();
  const [usersName, setUsersName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>(
        loggedIn === true ? <Component {...props} /> : <Redirect to='/login'
       />
      )}
    />
  );

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
      .post("https://localhost:44302/api/auth/login", loginInfo)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        getTokenInfo(localStorage.getItem("token"));
        setUsersName(loginInfo.username);
        setLoggedIn(true);
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
        <PrivateRoute path="/messages" component={Messages} />
        <PrivateRoute path="/likes" component={LikeList} />
        <Route path="/matches" render={(props) => <MemberList {...props} token={token}/> }/>
      </Switch>
    </div>
  );
};




export default App;
