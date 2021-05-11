import React, { Component } from "react";
import classes from "./Signup.module.css";
import axios from '../../Components/hoc/axios';
import { withRouter } from "react-router-dom";
import Alert from "../../Components/reusable/Alerts" 
class Signup extends Component {
  state = {
    firstname: "",
    email: "",
    lastname: "",
    password: "",
    registered: false,
    errors: {},
    error:'',
    loading :false,
    alert:false,
    alertdata:'',
  };
  submit = (e) => {
    e.preventDefault();

    if (this.validate()) {
      const Data = {
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        username: this.state.email,
        password: this.state.password,
        confirmPassword:this.state.password,
        roles:"admin"
      };

      this.setState({
        loading:true,
      })
      axios
        .post("/registeruser", Data)
        .then((res) => {
            this.setState({ 
            registered: true,
            loading:false 
          });
            this.props.history.push("/Signin");
          }
        )
        .catch((err) => {
          this.setState({
            loading:false,
            alert:true,
            alertdata:err.response.data.message
          })
          
        });

      
    }
    else{
      if (this.state.alert === true) {
        this.setState({
          alert: false,
        });
      }
    }
  };
  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    
  };
  
  validate() {
    let input = this.state;
    let errors = {};
    let isValid = true;

    if (!input["firstname"]) {
      isValid = false;
      errors["firstname"] = "Please enter your Firstname.";
    }

    if (!input["lastname"]) {
      isValid = false;
      errors["lastname"] = "Please enter your Lastname.";
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (input["password"].length < 6) {
      isValid = false;
      errors["password"] = "Please enter your Password.";
    }

    if(isValid === false)
    {
    this.setState({

      alert:true,
      alertdata:"Please enter valid data"
    });
  }

    return isValid;
  }

  toSignin = () => {
    this.props.history.push("/Signin");
  };

  onCloseHandler=()=>{
    this.setState({
      alert:false,
    })
  }

  render() {
    return (
      <div>
        {this.state.alert ? (
          <div style={{ marginBottom: "20px", marginTop: "-20px" }}>
            <Alert
              severity="error"
              closed={this.onCloseHandler}
              alertdata={this.state.alertdata}
            ></Alert>
          </div>
        ) : (
          <div></div>
        )}
        <div className={classes.layout}>
          <div className={classes.Form}>
            <div className={classes.Avtar}>
              <h1>Sign Up</h1>
            </div>
            <form className={classes.main}>
              <div>
                <label>First name </label>
                <input
                  type="text"
                  placeholder="Firstname *"
                  value={this.state.firstname}
                  name="firstname"
                  onChange={this.onChangeHandler}
                ></input>
              </div>
              <p style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.firstname}
              </p>
              <div>
                <label>Last name </label>
                <input
                  type="text"
                  placeholder="Lastname *"
                  value={this.state.lastname}
                  name="lastname"
                  onChange={this.onChangeHandler}
                ></input>
              </div>
              <p style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.lastname}
              </p>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email *"
                  value={this.state.email}
                  name="email"
                  onChange={this.onChangeHandler}
                ></input>
              </div>
              <p style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.email}
              </p>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password *"
                  value={this.state.password}
                  name="password"
                  onChange={this.onChangeHandler}
                ></input>
                <p style={{ color: "red", fontSize: "10px" }}>
                  {this.state.errors.password}
                </p>
              </div>
              <div>
                <button onClick={this.submit} className={classes.Submit}>
                  Submit
                </button>
              </div>

              <p onClick={this.toSignin} style={{ cursor: "pointer" }}>
                Already registered?
              </p>
            </form>
          </div>
          <div className={classes.illustration}>
            <img
              style={{ height: "100%", width: "100%" }}
              src="https://cdni.iconscout.com/illustration/premium/thumb/college-student-boy-studying-on-laptop-with-e-books-2710149-2261433.png"
            ></img>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(Signup);