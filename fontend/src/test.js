import Axios from "axios";
import React, { Component } from "react";
import pdf from "./Iconpack/DSTL final file.pdf";
import Pdf from "./Components/reusable/pdf";

class test extends Component {
  state = {
    pic:""
  };

  submit = (e) => {
    e.preventDefault();
    Axios.get("http://5fb8c1858406.ngrok.io/user/manassaxen160601@gmail.com")
      .then((response) => {
        console.log(response);
        this.setState({
          pic: response.data.picByte,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return <div>
      {/* <a href="data:application/pdf;base64,[base64]" download="file.pdf">hello</a>
       */}
        <button onClick={this.submit}>click</button><br></br>
       <embed type="application/pdf" src={"data:application/pdf;base64," + this.state.pic} height='600px' width='80%'/>
    </div>;
  }
}

export default test;
