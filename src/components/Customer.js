import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import CustomerForm from "./Form";
import { BASE_URL } from "../config/url";

class Customer extends Component {
  onSubmit = fields => {
    axios
      .post(`${BASE_URL}/customer`, fields)
      .then(res => {
        toast.success("Success");
        console.log(res);
      })
      .catch(err => {
        toast.error("Error");
        console.log("eer", err);
      });
  };

  render() {
    return (
      <div>
        <CustomerForm onSubmit={fields => this.onSubmit(fields)} key={0} />
        <ToastContainer />
      </div>
    );
  }
}

export default Customer;
