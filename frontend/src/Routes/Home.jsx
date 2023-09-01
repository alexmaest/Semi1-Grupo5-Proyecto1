import React, { Component } from "react";
import Brandvar from "../Components/Brandvar";
import Footer from "../Components/Footer";

class Home extends Component {

  render() {
    return (
        <div className="maincointainer bginicio">
            <Brandvar />
                  <div className="bginicio d-flex align-items-center justify-content-center vh-100">
                    <h2 className="text-center mb-4 tipografia1">B I E N V E N I D O</h2>
                  </div> 
            <Footer />
            
        </div>
    );
  }
}

export default Home;
