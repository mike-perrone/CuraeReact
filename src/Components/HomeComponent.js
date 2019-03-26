import React from "react";
import Axios from "axios";

class HomeComponent extends React.Component {
  state = {
    showRegister: false,
    registerInfo: {
      username: "",
      password: ""
    }
  };

  getUserAndPass = event => {
    const userAndPass = { ...this.state.registerInfo };
    userAndPass[event.target.name] = event.target.value;
    this.setState({ registerInfo: userAndPass });
    console.log(this.state.registerInfo);
  };

  setUserAndPass = event => {
    event.preventDefault();
    const userAndPass = { ...this.state.registerInfo };
    userAndPass[event.target.name] = event.target.value;
    this.setState({ registerInfo: userAndPass });
    Axios.post(
      "https://localhost:44332/api/auth/register",
      this.state.registerInfo
    ).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <div className="container moveDown">
        {!this.state.showRegister && (
          <div style={{ textAlign: "center" }}>
            <h1>hiiii</h1>
            <p className="lead">Sign up if you havent</p>
            <div className="text-center">
              <button
                className="btn btn-primary btn-lg mr-4"
                onClick={() => {
                  this.setState({ showRegister: true });
                }}
              >
                Sign up
              </button>
              <button className="btn btn-primary btn-lg">Learn More</button>
            </div>
          </div>
        )}

        {this.state.showRegister && (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-4 mt-5">
                <form>
                  <h2 className="text-center text-primary">Sign Up</h2>
                  <hr />

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Username"
                      name="username"
                      onChange={this.getUserAndPass}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      required
                      placeholder="Password"
                      name="password"
                      value={this.state.registerInfo.password}
                      onChange={this.getUserAndPass}
                    />
                  </div>
                  <div className="form-group text-center">
                    <button
                      className="btn btn-success mr-4"
                      type="submit"
                      onClick={this.setUserAndPass}
                    >
                      Register
                    </button>
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.setState({ showRegister: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomeComponent;
