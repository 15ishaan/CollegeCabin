import axios from "./Components/hoc/axios";
import React, { Component } from "react";
import Postcard from "./Containers/Postcard/Postcard";
import Loader from "./Components/reusable/Loader/Loader"
class test extends Component {
  state = {
    pic:"",
    loading :true,
  };

  submit = (e) => {
    e.preventDefault();
    axios.get("http://5fb8c1858406.ngrok.io/user/manassaxen160601@gmail.com")
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
    return (<div>
      <Loader></Loader>
    
    </div>);
  }
}

export default test;
