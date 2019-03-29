import React from "react";
import { Dropdown } from "react-bootstrap";
import { withRouter, NavLink } from "react-router-dom";

const Nav = props => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Firal
      </NavLink>
      {props.token === localStorage.getItem("token") && (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/matches">
              Matches
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/likes">
              Who likes me!
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/messages">
              Messages
            </NavLink>
          </li>
        </ul>
      )}
      {props.token !== "" && localStorage.getItem("token") && (
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="ml-auto"
          >
            Welcome {props.usersName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <i className="fa fa-user" /> Edit Profile
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                localStorage.removeItem("token");
                props.getTokenInfo("");
              }}
            >
              <i className="fas fa-sign-out-alt" /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      {!props.token && !localStorage.getItem("token") && (
        <form className="form-inline mt-2 mt-md-0 ml-auto">
          <input
            className="form-control mr-sm-2"
            type="text"
            value={props.loginInfo.username}
            onChange={props.getLoginInfoInConsole}
            name="username"
            placeholder="Email"
          />
          <input
            className="form-control mr-sm-2"
            type="text"
            onChange={props.getLoginInfoInConsole}
            value={props.loginInfo.password}
            name="password"
            placeholder="Password"
          />

          <button
            disabled={!props.loginInfo.email && !props.loginInfo.password}
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={props.submitLoginInfo}
          >
            Login
          </button>
        </form>
      )}
    </nav>
  );
};

export default withRouter(Nav);
