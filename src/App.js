import React from "react";
import Main from "./components/main/Main";
import Writing from "./components/writing/Writing";
import { Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Main} />
      <Route path="/writing" component={Writing} />
    </div>
  );
}

export default App;
