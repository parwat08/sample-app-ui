import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Customer from "./components/Customer";

const MOUNT_NODE = document.getElementById("app");

ReactDOM.render(
    <Customer />,
  MOUNT_NODE
);
