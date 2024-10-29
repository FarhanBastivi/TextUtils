import "./App.css";

import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import React, { useState } from "react";
import Alert from "./components/Alert";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState(`light`); // Whether dark mode is enable or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  // Toggle  Dark Mode
  const toggleMode = () => {
    if (mode === `light`) {
      setMode(`dark`);
      document.body.style.backgroundColor = "#2f373e";
      showAlert(`Dark mode has been enabled`, "success");
      // TO CHANGE TITLE WHEN CHANGES ARE MADE IN WEBPAGE. IN THIS CASE DARK MODE ENABLED
      // document.title = "TextUtils - Dark Mode"
      // TO SHOW MULTIPLE TITLES CONTINUOUSLY THE FOLLOWING METHOD CAN BE USED
      // setInterval(() => {
      //   document.title = "TextUtils Is Amazing"
      // }, 2000);
      // setInterval(() => {
      //   document.title = "Install TextUtils Now"
      // }, 1500);
    } 
    else {
      setMode(`light`);
      document.body.style.backgroundColor = "white";
      showAlert(`Light mode has been enabled`, "success");
      // document.title = "TextUtils - Word Counter and Converter";
    }
  };

  return (
    <>
    <BrowserRouter>
      <Navbar title="TextUtils" aboutText="About TextUtils" mode={mode} toggleMode={toggleMode}/>

      <Alert alert={alert}/>
      <div className="container my-3" mode={mode}>
        <Routes>
        {/* USING "exact" keyword is crucial 
        eg. /users -> takes u to component 1
        AND /users/home -> takes u to component 2 
        IF exact keyword is not used the "/users/home" will open the "/users" link by partially matching it */}
          <Route exact path="/about" element={<About mode={mode} />} />
        </Routes>
        <Routes>
          <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the Text to Analyze" mode={mode}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;