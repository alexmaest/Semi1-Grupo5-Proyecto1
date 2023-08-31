import React, { Component } from "react";

class ITForm extends Component {
  state = {};
  render() {
    return (
      <div className="form-group row">
        <div className="col-sm-6">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            value={this.props.value}
          ></input>
        </div>
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control"
            onChange={(e)=>{this.props.change(e.target.value)}}
          ></input>
        </div>
      </div>
    );
  }
}

export default ITForm;
