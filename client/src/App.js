import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Nav } from "./components/nav";
import Home from "./pages/home";
import About from "./pages/about"

class App extends Component {

  render() {;
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" render={() => <Home /> }/>
          <Route exact path="/about" render={() => <About /> }/>
        </div>
      </Router>
    );
  }
}

export default App;