import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const Nav = () => {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [token, getTokenInfo] = useState();

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
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="#">
        Firal
      </a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Matches
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Lists
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Messages
          </a>
        </li>
      </ul>
      {token !== "" && localStorage.getItem("token") && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Welcome {loginInfo.username}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <i className="fa fa-user" /> Edit Profile
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                localStorage.removeItem("token");
                getTokenInfo("");
              }}
            >
              <i className="fas fa-sign-out-alt" /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      {!token && !localStorage.getItem("token") && (
        <form className="form-inline mt-2 mt-md-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            value={loginInfo.username}
            onChange={getLoginInfoInConsole}
            name="username"
            placeholder="Email"
          />
          <input
            className="form-control mr-sm-2"
            type="text"
            onChange={getLoginInfoInConsole}
            value={loginInfo.password}
            name="password"
            placeholder="Password"
          />

          <button
            disabled={!loginInfo.email && !loginInfo.password}
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={submitLoginInfo}
          >
            Login
          </button>
        </form>
      )}
    </nav>
  );
};

export default Nav;
