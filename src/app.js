import React, { Component } from "react";
// import CrudApp from "./crud";
import Card from "./card";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";


class App extends Component {
  render() {
    console.log("App Component Loaded");
    return (
      <>
        {/* <CrudApp /> */}
        <Card />
      </>
    );
  }
}

export default App;
