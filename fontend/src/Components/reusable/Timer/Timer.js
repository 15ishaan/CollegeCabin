import React, { Component } from 'react';
import classes from "./Timer.module.css"
class timer extends Component {
  state = {
    minutes: 1,
    seconds: 0,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
    let { seconds, minutes } = this.state;
    if(seconds!==0 || minutes!==0)    {   
         this.setState({
        seconds: this.state.seconds === 0 ? 59 : this.state.seconds - 1,
        minutes:
            this.state.seconds === 0
            ? this.state.minutes - 1
            : this.state.minutes,
        });
    }
    }, 1000);
  }

  render() {
    let {seconds,minutes } = this.state;
    let data = (
      <p className={classes.timer}>
        Timer remaining : {minutes === 0 ? "00" : minutes}:
        {seconds / 10 === 0 ? "00" : seconds}{" "}
      </p>
    );
    if(seconds ===0 && minutes ===0)
    {
       data = <p onClick={this.props.resendotp} className={classes.resendotp}>Resend OTP ?</p>
    }
    return (
      <div>
        {data}
      </div>
    );
  }
}
 
export default timer;