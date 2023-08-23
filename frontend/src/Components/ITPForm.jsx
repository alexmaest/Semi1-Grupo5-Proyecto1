import React, { Component } from "react";

class ITForm extends Component {
  state = {};
  render() {
    return (
      <>
        <label htmlFor={this.props.label} className="col-sm-2 col-htmlForm-label">
          {this.props.label}:
        </label>
        <div>
          <input
            type="text"
            className="form-control-plaintext"
            id={this.props.label}
            value={this.props.value}
            readOnly
            />
        </div>
      </>
    );
  }
}

export default ITForm;
