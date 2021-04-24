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
    collegename: "",
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
        console.log(response.data);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  componentDidUpdate() {}

  render() {
    console.log(this.state);
    //const progress = 20;
    //console.log(this.props);

    let content;

    if (this.state.loading === true) {
      content = <Loader></Loader>;
    } else {
      content = (
        <div>
          <div className={classes.Main}>
            <div className={classes.Photobar}>
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
                {/* <input type='file' onChange={this.changeDpHandler}></input> */}
                {/* <img className={classes.editicon} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUyOC44OTkgNTI4Ljg5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDApIj4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGQ9Ik0zMjguODgzLDg5LjEyNWwxMDcuNTksMTA3LjU4OWwtMjcyLjM0LDI3Mi4zNEw1Ni42MDQsMzYxLjQ2NUwzMjguODgzLDg5LjEyNXogTTUxOC4xMTMsNjMuMTc3bC00Ny45ODEtNDcuOTgxICAgYy0xOC41NDMtMTguNTQzLTQ4LjY1My0xOC41NDMtNjcuMjU5LDBsLTQ1Ljk2MSw0NS45NjFsMTA3LjU5LDEwNy41OWw1My42MTEtNTMuNjExICAgQzUzMi40OTUsMTAwLjc1Myw1MzIuNDk1LDc3LjU1OSw1MTguMTEzLDYzLjE3N3ogTTAuMyw1MTIuNjljLTEuOTU4LDguODEyLDUuOTk4LDE2LjcwOCwxNC44MTEsMTQuNTY1bDExOS44OTEtMjkuMDY5ICAgTDI3LjQ3MywzOTAuNTk3TDAuMyw1MTIuNjl6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" /> */}
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
            <div className={classes.alert}>
              <p>scroll to read more</p>
            </div>
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default withRouter(profile);
