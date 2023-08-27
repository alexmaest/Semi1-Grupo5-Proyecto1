import React, { Component } from "react";

class ITForm extends Component {
  state = {};
  render() {
    return (
      <div className="form-group row">
        <div class="col-sm-6">
          <input
            type="text"
            readonly=""
            class="form-control-plaintext"
            value={this.props.value}
          ></input>
        </div>
        <div class="col-sm-6">
          <input
            type="text"
            class="form-control"
          ></input>
        </div>
      </div>
    );
  }
}

export default ITForm;
