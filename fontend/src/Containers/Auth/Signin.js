import React, { Component } from "react";
import classes from "./Signin.module.css";
import { withRouter ,Link } from "react-router-dom";
import axios from "../../Components/hoc/axios";
import Loader from "../../Components/reusable/Loader/Loader"
import Alert from "../../Components/reusable/Alerts"; 
import Googleauth from "react-google-login"
class signin extends Component {
  state = {
    name: "",
    username: "",
    password: "",
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
      username: this.state.username,
      password: this.state.password,
    };
    this.setState({
      loading: true,
    });
    axios
      .post("/login", Data)
      .then((response) => {
        // console.log(response);
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("username", this.state.username);
        // localStorage.setItem("Userdata",response.data.user.username);
        this.setState({
          loading: false,
        });
        this.toHome();
        // this.props.loginname(this.state.username);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          alert: true,
          alertdata: err.response.data.message,
        });
        console.log(err);
      });
  };
  toHome = () => {
    this.props.history.push("/profile/" + this.state.username);
  };
  toSignup = () => {
    this.props.history.push("/Signup");
  };
  onCloseHandler = () => {
    this.setState({
      alert: false,
    });
  };
  onGoogleResponseSuccess = (userdata) => {
    let error = userdata.error;
    this.setState({
      loading: true,
    });

    const email = userdata.profileObj.email;

    const name = userdata.profileObj.name;
    axios
      .post("/oauth2/" + email + "/" + name)
      .then((res) => {
        console.log(res.data);
        if (res.data === "Null") {
          this.props.history.push("/needpass/" + email);
        } else {
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("username", email);
          this.setState({
            username: email,
            loading: false,
          });
          this.toHome();
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          alert: true,
          alertdata: error,
        });
      });
  };

   onGoogleResponseFailure=(err)=>{


  }
  render() {
    // /onsole.log(this.props)
    let wrongpassview = "";
    if (this.state.wrongpass != null) {
      wrongpassview = this.state.wrongpass;
    }

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
                <h1>Sign in</h1>
                <p>Sign in to College Cabin</p>
              </div>
              <form className={classes.main}>
                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email *"
                    value={this.state.username}
                    name="username"
                    onChange={this.onChangeHandler}
                  ></input>
                </div>

                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password *"
                    value={this.state.password}
                    name="password"
                    onChange={this.onChangeHandler}
                  ></input>
                </div>

                <div>
                  <button onClick={this.submit} className={classes.Submit}>
                    Submit
                  </button>
                </div>

                <p onClick={this.toSignup} style={{ cursor: "pointer" }}>
                  Not registered yet?
                </p>
                <p style={{ color: "red", fontSize: "12px" }}>
                  {wrongpassview}
                </p>
              </form>
              -or-
              <div className={classes.googleauth}>
                <Googleauth
                  className={classes.authbutton}
                  clientId="1091768529048-m6kt2tvsri85ocs7t3cltjeiq3vr0mat.apps.googleusercontent.com"
                  onSuccess={this.onGoogleResponseSuccess}
                  onFailure={this.onGoogleResponseFailure}
                ></Googleauth>
              </div>
            </div>
            <div className={classes.illustration}>
              <img
                alt="illustration"
                style={{ height: "100%", width: "100%" }}
                src="https://cdn.dribbble.com/users/343356/screenshots/11162207/drawing-computer-tools-img_10993-1600x1200_4x.jpg"
              ></img>
            </div>
          </div>
          <Link to='/forgetpass'>forget password</Link>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}
export default withRouter(signin);
