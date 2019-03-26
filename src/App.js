import React, { Component } from "react";
import HomeComponent from "./Components/HomeComponent";
import Nav from "./Components/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <HomeComponent />
      </div>
    );
  }
}

export default App;
