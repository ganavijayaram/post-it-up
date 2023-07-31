import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
 
//The code you provided uses the ReactDOM.createRoot() method to create a root-level React render, 
//and then it renders the App component into the specified root element on the web page. 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);