import React, { Component } from "react";
import classes from "./Signup.module.css";
import axios from '../../Components/hoc/axios';
import { withRouter } from "react-router-dom";

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
      console.log(Data);

      this.setState({
        loading:true,
      })
      axios
        .post("/registeruser", Data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ 
            registered: true,
            loading:false 
          });
            this.props.history.push("/Signin");
          }
        })
        .catch((error) => {
          this.setState({
            loading:false,
          })
          console.log(error.response);
          // this.setState({
          //   error:error.response.data.message
          //           })
        });

      
    }
  };
  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    // if ([name] == 'email') {
    //   let input = this.state;
    // let errors = {};
    // let isValid = true;
    //   if (!input["email"]) {
    //     isValid = false;
    //     errors["email"] = "Please enter your email Address.";
    //   }
    // }
    //  this.passvalid();
  };
  //  passwordvalidation='';
  //  passvalid = () =>{
  //   if(this.state.username.length<=5){
  //   this.passwordvalidation='Password must contain 6 letters'
  //   }
  //   if(this.state.username.length>5)
  //   this.passwordvalidation=''
  //  }
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

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  toSignin = () => {
    this.props.history.push("/Signin");
  };

  render() {

    return(
      <div className={classes.Form}>
        <div className={classes.Avtar}>
        <p>
        <svg width="50px" height="46px"  color="white" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg>
        </p>
        <h3>
        Sign up
        </h3>
        </div>
        <form className={classes.main}>
          <div>
          <input type="text" 
          placeholder="Firstname *"
          value={this.state.firstname}
          name="firstname"
          onChange={this.onChangeHandler} 
          ></input>
           <p style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.name}
              </p>
          </div>
          <div>
          <input type="text" 
          placeholder="Lastname *"
          value={this.state.lastname}
          name="lastname"
          onChange={this.onChangeHandler}
          ></input>
          <p style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.username}
              </p>
          </div>
          <div>
          <input type="email"
           placeholder="email *"
           value={this.state.email}
           name="email"
           onChange={this.onChangeHandler}
           ></input>
            <p style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.email}
              </p>
          </div>
          <div>
          <input type="password"
           placeholder="Password *"
           value={this.state.password}
           name="password"
           onChange={this.onChangeHandler}
           ></input>
           <p style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.password}
              </p>
          </div>
          <div style={{height:"35px"}}>
          <button onClick={this.submit} className={classes.Submit}>Submit</button>
          </div>

         <p onClick={this.toSignin} style={{cursor:"pointer"}}>Already registered?</p>
              <p style={{color:'red', fontSize:'12px' }}>{this.state.error}</p>

        </form>
      </div>
    );
  }

}

export default withRouter(Signup);
