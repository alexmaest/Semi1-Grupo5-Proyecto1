import React, { Component } from "react";
import Brandvar from "../Components/Brandvar";
import Footer from "../Components/Footer";

class Home extends Component {

  render() {
    return (
        <div className="maincointainer bginicio">
            <Brandvar />
            <Footer />
            
        </div>
    );
  }
}

export default Home;
