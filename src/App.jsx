import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="navigationBar">
        <header>
          <a href="#" class="logo">
            asitha.
          </a>

          <i class="bx bx-menu" id="menu-icon"></i>

          <nav>
            <a href="#" class="active">
              Home
            </a>
            <a href="#">Services</a>
            <a href="#">Resume</a>
            <a href="#">Portfolio</a>
            <a href="#">Contact</a>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default App;
