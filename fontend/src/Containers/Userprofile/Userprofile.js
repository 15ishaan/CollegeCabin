import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import classes from "./Userprofile.module.css";
import schoolicon from "../../Iconpack/school.png";
import townicon from "../../Iconpack/town.png";
import course from "../../Iconpack/online-course.png";
import Editprofile from "../Userprofile/Uploadpicmodal/uploadpicmodal";
import axios from "../../Components/hoc/axios";
import Loader from "../../Components/reusable/Loader/Loader";
class profile extends Component {
  state = {
    profilePic:null,
    name: "",
    username: "",
    collegename: null,
    branch: "",
    sem: "",
    bio: "",
    loading: true,
  };

  changeDpHandler = (event) => {
    let username = localStorage.getItem("username");
    this.setState({
      loading: true,
    });
    axios
      .get("/user/" + username)
      .then((response) => {
        this.setState({
          profilePic: response.data.picByte,
          loading: false,
        });
        console.log(response.data);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };
  componentDidMount() {
    let username = localStorage.getItem("username");
    axios
      .get("/user/" + username)
      .then((response) => {
        this.setState({
          profilePic: response.data.picByte,
          name: response.data.firstName + " " + response.data.lastName,
          username: response.data.username,
          collegename: response.data.collegeName,
          branch: response.data.branch,
          sem: response.data.sem,
          bio: response.data.bio,
          loading: false,
        });

        if(this.state.collegename===null)
        {
         this.props.history.push("/editdetails/" + this.state.username);
        }
        console.log(response.data);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  render() {

    let content;

    if (this.state.loading === true) {
      content = <Loader></Loader>;
    } else {
      content = (
        <div>
          <div className={classes.Main}>
            <div className={classes.Photobar}>
              <button 
              onClick={()=>{
                this.props.history.push("/editpassword/" + this.state.username);
              }}
               className={classes.editpass}>
                Edit Password
              </button>
              <div className={classes.Userimage}>
                {this.state.profilePic === null ? (
                  <img
                    height="150px"
                    width="150px"
                    alt="img"
                    src="https://img.icons8.com/color/144/000000/circled-user-male-skin-type-4--v2.gif"
                  />
                ) : (
                  <img
                    height="150px"
                    width="150px"
                    alt="img"
                    src={"data:image/jpg;base64," + this.state.profilePic}
                  ></img>
                )}
                <div className={classes.Openprofilemodal}>
                  <Editprofile onDpChange={this.changeDpHandler} />
                </div>
          
              </div>
              <div className={classes.Username}>
                <h3>{this.state.name}</h3>
              </div>
            </div>
            <div className={classes.Info}>
              <h4>
                <img
                  alt="schoolicon"
                  width="30px"
                  height="30px"
                  style={{ marginRight: "20px" }}
                  src={schoolicon}
                ></img>
                {this.state.collegename},
              </h4>
              <h4>
                <img
                  alt="town icon"
                  width="30px"
                  height="30px"
                  style={{ marginRight: "20px" }}
                  src={townicon}
                ></img>
                Ghaziabad
              </h4>
              <img
                alt="courseicon"
                width="30px"
                height="30px"
                style={{
                  marginRight: "20px",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
                src={course}
              ></img>
              <p>B.tech</p>
              <p>{this.state.branch}</p>
              <p>{this.state.sem} semester</p>
            </div>

            <Link
              className={classes.Editdetails}
              to={"/editdetails/" + this.props.match.params.userename}
            >
              Edit Details
            </Link>
          </div>
          <div className={classes.bio}>
            <h3>About me</h3>
            <div className={classes.biocontent}>{this.state.bio}</div>
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default withRouter(profile);
