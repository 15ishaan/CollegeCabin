import React, { Component } from "react";
import classes from "./Signup.module.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
class signin extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    wrongpass: false,
  };

  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const Data = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post("http://00409ed8638e.ngrok.io/login", Data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("username",this.state.username);
          // localStorage.setItem("Userdata",response.data.user.username);
          this.toHome();
        }
        this.props.loginname(this.state.username);
      })
      .catch((error) => {
        // if(error.response.status === 406)
        // {
        //   this.setState({ wrongpass: error.response.data });
        // }
        // if (error.response.status === 404) {
        //   this.setState({ wrongpass:"*wrong credentials*" });
        // }
          //this.setState({wrongpass: error.response.data.message});
      });
  };
  toHome = () => {
    this.props.history.push("/");
  };
  toSignup = () => {
    this.props.history.push("/Signup");
  };

  render() {
    // /onsole.log(this.props)
    let wrongpassview = "";
    if (this.state.wrongpass != null) {
      wrongpassview = this.state.wrongpass;
    }
    return (
      <div className={classes.Form}>
        <div className={classes.Avtar}>
        <p>
        <svg width="50px" height="46px"  color="white" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg>
        </p>
        <h3>
        Sign in
        </h3>
        </div>
        <form className={classes.main}>
          
          <div>
          <input type="text" 
          placeholder="Username *"
          value={this.state.username}
          name="username"
          onChange={this.onChangeHandler}
          ></input>
          
          </div>
          
          <div>
          <input type="password"
           placeholder="Password *"
           value={this.state.password}
           name="password"
           onChange={this.onChangeHandler}
           ></input>
           </div>
           
          <div style={{height:"35px"}}>
          <button onClick={this.submit} className={classes.Submit}>Submit</button>
          </div>

         <p onClick={this.toSignup} style={{cursor:"pointer"}}>Not registered yet?</p>
    <p style={{color:'red', fontSize:'12px' }}>{wrongpassview}</p>

        </form>
      </div>

    );
  }
}
export default withRouter(signin);
