import React, { Component } from "react";
import Cards from "react-credit-cards";
import { Button } from "reactstrap";

import FormErrors from "./FormErrors";
import "react-credit-cards/es/styles-compiled.css";

class CustomerForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    zipCode: "",
    ccNumber: "",
    cardName: "",
    cExpiryDate: "",
    cvv: "",
    focused: "",
    formErrors: {
      ccNumber: "",
      cExpiryDate: "",
      cvv: ""
    },
    ccNumberValid: false,
    cExpiryDateValid: false,
    cvvValid: false
  };

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let ccNumberValid = this.state.ccNumberValid;
    let cExpiryDateValid = this.state.cExpiryDateValid;
    let cvvValid = this.state.cvvValid;

    switch (fieldName) {
      case "ccNumber":
        ccNumberValid = value.match(/^\d{16}$/);
        fieldValidationErrors.ccNumber = ccNumberValid ? "" : " must be 16 digits";
        break;
      case "cExpiryDate":
        cExpiryDateValid = value.match(/^\d{6}$/);
        fieldValidationErrors.cExpiryDate = cExpiryDateValid
          ? ""
          : " is invalid date";
        break;
      case "cvv":
        cvvValid = value.match(/^[0-9]{3,3}$/);
        fieldValidationErrors.cvv = cvvValid ? "" : " is not valid!";
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        ccNumberValid,
        cExpiryDateValid,
        cvvValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.ccNumberValid &&
        this.state.cExpiryDateValid &&
        this.state.cvvValid
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <form>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <label>Address 1</label>
        <input
          type="text"
          name="address1"
          value={this.state.address1}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <label>Address 2 </label>
        <input
          type="text"
          name="address2"
          value={this.state.address2}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={this.state.city}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <label>Country</label>
        <input
          type="text"
          name="country"
          value={this.state.country}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <label>Zip Code</label>
        <input
          type="number"
          name="zipCode"
          value={this.state.zipCode}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <label>CC Number</label>
        <input
          type="number"
          name="ccNumber"
          value={this.state.ccNumber}
          onChange={event => this.handleChange(event)}
          maxLength="16"
        />
        <br />

        <label>Expiry Date</label>
        <input
          type="number"
          name="cExpiryDate"
          placeholder="MM/YYYY"
          value={this.state.cExpiryDate}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <label>CVV</label>
        <input
          type="number"
          name="cvv"
          value={this.state.cvv}
          onChange={event => this.handleChange(event)}
        />
        <br />

        <Cards
          number={this.state.ccNumber}
          name={this.state.firstName + " " + this.state.lastName}
          expiry={this.state.cExpiryDate}
          cvc={this.state.cvv}
        />

        <div className="text-danger">
          <FormErrors formErrors={this.state.formErrors} />
        </div>

        <Button
          color="primary"
          disabled={!this.state.formValid}
          onClick={event => {
            this.onSubmit(event);
          }}
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default CustomerForm;
