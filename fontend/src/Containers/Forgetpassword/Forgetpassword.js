import React, { Component } from 'react';
import classes from "./Forgetpassword.module.css";
import {withRouter} from "react-router-dom";
import Alert from "../../Components/reusable/Alerts"
import axios from '../../Components/hoc/axios';
import Timer from "../../Components/reusable/Timer/Timer"
class forgetpassword extends Component {
  state = {
    username: "",
    otp: "",
    showotp: 0,
    alertdata: "",
    alert: false,
    severity: "",
    otp1:"",
    otp2:"",
    otp3:"",
    otp4:"",
    password:"",
    confirmpassword:""

  };
 onChangeHandler= (e) => {
    const [name , value] = [e.target.name , e.target.value];
    if((name!=='username' && value<=9) || name==='username' || name==="password" || name === "confirmpassword" )
    {
       this.setState({
         [name]: value,
       });

    }
       
   }
  onEmailSubmit= () =>{
    axios.post("/generateOtp/" + this.state.username)
    .then((res)=>{
      this.setState({
        showotp:1,
        alert:true,
        alertdata:"OTP sent successfully",
        severity:"success"
      })
    })
    .catch((err)=>{
      this.setState({
        alert: true,
        alertdata: err.response.data.message,
        severity: "error",
      });
    })
  } 
 
  onOtpSubmit=()=>{
    
    this.setState({
      alert:false,
    });
    const {otp1,otp2,otp3,otp4}=this.state;
    const Otp = otp1+otp2+ otp3+ otp4;
 axios
   .post("/validateOtp/" + this.state.username + "/" + Otp)
   .then((res) => {
         console.log(res);
    this.setState({
        showotp: 2,
        alert: true,
        alertdata:"OTP verified ",
        severity: "success",
        otp1:'',
        otp2:'',
        otp3:"",
        otp4:""
      });
   })
   .catch((err) => {

     this.setState({
        otp1:'',
        otp2:'',
        otp3:"",
        otp4:"",
       alert: true,
       alertdata: err.response.data.message,
       severity: "error",
     });
   });
  }
  onResetPassword =()=>{

       const Data = {
        username:this.state.username,
        newPassword : this.state.password,
        newConfirmPassword:this.state.confirmpassword
    };
      this.setState({
        alert: false,
      });
    axios.post("/forgotPassword",Data)
   .then((res) => {
      this.setState({
        alert: true,
        alertdata:"Password Successfully changed",
        severity: "success",
      });
      setTimeout(() => {
         this.props.history.push("/Signin");
      }, 3000);
     
   })
   .catch((err) => {
     this.setState({
       alert: true,
       alertdata: err.response.data.message,
       severity: "error",
     });
   });
  }
  render() {
      // if (this.state.showotp === 1 || this.state.showotp === 2) {
      //   this.setState({
      //     alert: false,
      //   });
      // }
        return (
          <div>
            {this.state.alert ? (
              <div style={{ marginBottom: "20px" }}>
                <Alert
                  severity={this.state.severity}
                  closed={this.onCloseHandler}
                  alertdata={this.state.alertdata}
                ></Alert>
              </div>
            ) : (
              <div></div>
            )}
            <div className={classes.main}>
              <div className={classes.form}>
                <h1>Forgot Password ?</h1>
                <span>Reset password in two quick steps</span>
                {this.state.showotp === 0 ? (
                  <div className={classes.getemail}>
                    <input
                      className={classes.input}
                      type="email"
                      value={this.state.username}
                      placeholder="Email"
                      name="username"
                      onChange={this.onChangeHandler}
                      autoComplete="off"
                    ></input>
                    <br></br>
                    <br></br>
                    <button
                      type="submit"
                      onClick={this.onEmailSubmit}
                      className={classes.button}
                    >
                      Get OTP
                    </button>
                  </div>
                ) : this.state.showotp === 1 ? (
                  <div className={classes.getotp}>
                    <input
                      className={classes.otp}
                      type="number"
                      value={this.state.otp1}
                      name="otp1"
                      onChange={this.onChangeHandler}
                      autoComplete="off"
                    ></input>
                    <input
                      className={classes.otp}
                      type="number"
                      value={this.state.otp2}
                      name="otp2"
                      onChange={this.onChangeHandler}
                      autoComplete="off"
                    ></input>
                    <input
                      className={classes.otp}
                      type="number"
                      value={this.state.otp3}
                      name="otp3"
                      onChange={this.onChangeHandler}
                      autoComplete="off"
                    ></input>
                    <input
                      className={classes.otp}
                      type="number"
                      value={this.state.otp4}
                      name="otp4"
                      onChange={this.onChangeHandler}
                      autoComplete="off"
                    ></input>
                    <br></br>
                    <br></br>
                    <button
                      type="submit"
                      onClick={this.onOtpSubmit}
                      className={classes.button}
                    >
                      Submit OTP
                    </button>
                    <Timer
                      resendotp={() => {
                        this.onEmailSubmit();
                      }}
                    ></Timer>
                  </div>
                ) : (
                  <div>
                    <input
                      type="password"
                      value={this.state.password}
                      name="password"
                      placeholder="Password"
                      onChange={this.onChangeHandler}
                    ></input>
                    <input
                      type="password"
                      value={this.state.confirmpassword}
                      name="confirmpassword"
                      placeholder=" Confirm Password"
                      onChange={this.onChangeHandler}
                    ></input>
                    <button
                      type="submit"
                      onClick={this.onResetPassword}
                      className={classes.button}
                    >
                      Reset Password
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
  }
}
 
export default withRouter(forgetpassword);