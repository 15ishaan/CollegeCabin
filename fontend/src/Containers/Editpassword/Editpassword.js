import React, { Component } from "react";
import classes from "./Editpassword.module.css";
import { withRouter } from "react-router-dom";
import axios from "../../Components/hoc/axios";
import Loader from "../../Components/reusable/Loader/Loader";
import Alert from "../../Components/reusable/Alerts";
class editpassword extends Component {
  state = {
    oldpassword:'',
    newpassword:'',
    confirmpassword:'',
    wrongpass: null,
    loading: false,
    alert: false,
    alertdata: "",
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
        username:this.props.match.params.username,
        oldPassword : this.state.oldpassword,
        newPassword : this.state.newpassword,
        newConfirmPassword:this.state.confirmpassword
    };
    this.setState({
      loading: true,
    });
    console.log(Data)
    axios
      .post("/editPassword", Data)
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
        });
        localStorage.removeItem("username");
        localStorage.removeItem("jwt");
        this.props.history.push("/Signin");
        // this.props.loginname(this.state.username);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          alert: true,
          alertdata: err.response.data.message,
        });
      });
  };

  render() {
    let content;

    if (this.state.loading === true) {
      content = <Loader></Loader>;
    } else {
      content = (
        <div>
          {this.state.alert ? (
            <div style={{ marginBottom: "20px" }}>
              <Alert
                severity="error"
                alertdata={this.state.alertdata}
              ></Alert>
            </div>
          ) : (
            <div></div>
          )}
          <div className={classes.layout}>
            <div className={classes.Form}>
              <div className={classes.Avtar}>
                <h1>Change Password</h1>
              </div>
              <form className={classes.main}>
                <div>
                  <label>Old Password</label>
                  <input
                    type="text"
                    placeholder="Old Password*"
                    value={this.state.oldpassword}
                    name="oldpassword"
                    onChange={this.onChangeHandler}
                  ></input>
                </div>

                <div>
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="New Password *"
                    value={this.state.newpassword}
                    name="newpassword"
                    onChange={this.onChangeHandler}
                  ></input>
                </div>

                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password *"
                    value={this.state.confirmpassword}
                    name="confirmpassword"
                    onChange={this.onChangeHandler}
                  ></input>
                </div>
                <div>
                  <button onClick={this.submit} className={classes.Submit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className={classes.illustration}>
              <img
                alt="illustration"
                style={{ height: "100%", width: "100%" }}
                src="https://cdn.dribbble.com/users/343356/screenshots/11162207/drawing-computer-tools-img_10993-1600x1200_4x.jpg"
              ></img>
            </div>
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}
export default withRouter(editpassword);
