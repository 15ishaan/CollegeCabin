import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import classes from "./Userprofile.module.css";
import schoolicon from "../../Iconpack/school.png";
import townicon from "../../Iconpack/town.png";
import course from "../../Iconpack/online-course.png";
import Editprofile from "../Userprofile/Uploadpicmodal/uploadpicmodal"
class profile extends Component {

  state ={
    profilePic:null
  }
  
  changeDpHandler = (event) =>{
    console.log(event.target.files[0]);
  }

  render() {
    //const progress = 20;
    //console.log(this.props);
    return (
      <div >
        <div className={classes.Main}>
        <div className={classes.Photobar}>
          <div className={classes.Userimage}>
            <img
              height="150px"
              width="150px"
              alt='img'
              src="https://instagram.fdel1-4.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/79167405_564083314446636_1594084142532643441_n.jpg?_nc_ht=instagram.fdel1-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=Qx69g48fQDEAX9oRxlc&tp=1&oh=ce7225ef99378d7812557156b28aefc8&oe=5FF54C8B"
            ></img>
            <div className={classes.Openprofilemodal}>
            <Editprofile  />
            </div>
            {/* <input type='file' onChange={this.changeDpHandler}></input> */}
            {/* <img className={classes.editicon} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUyOC44OTkgNTI4Ljg5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDApIj4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGQ9Ik0zMjguODgzLDg5LjEyNWwxMDcuNTksMTA3LjU4OWwtMjcyLjM0LDI3Mi4zNEw1Ni42MDQsMzYxLjQ2NUwzMjguODgzLDg5LjEyNXogTTUxOC4xMTMsNjMuMTc3bC00Ny45ODEtNDcuOTgxICAgYy0xOC41NDMtMTguNTQzLTQ4LjY1My0xOC41NDMtNjcuMjU5LDBsLTQ1Ljk2MSw0NS45NjFsMTA3LjU5LDEwNy41OWw1My42MTEtNTMuNjExICAgQzUzMi40OTUsMTAwLjc1Myw1MzIuNDk1LDc3LjU1OSw1MTguMTEzLDYzLjE3N3ogTTAuMyw1MTIuNjljLTEuOTU4LDguODEyLDUuOTk4LDE2LjcwOCwxNC44MTEsMTQuNTY1bDExOS44OTEtMjkuMDY5ICAgTDI3LjQ3MywzOTAuNTk3TDAuMyw1MTIuNjl6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" /> */}
          </div>
          <div className={classes.Username}>
            <h3>Manas Saxena </h3>
          </div>
        </div>
        <div className={classes.Info}>
          <h4>
            <img
            alt='schoolicon'
              width="30px"
              height="30px"
              style={{ marginRight: "20px" }}
              src={schoolicon}
            ></img>
            Ajay Kumar Garg Engineering College,
          </h4>
          <h4>
            <img
            alt='town icon'
              width="30px"
              height="30px"
              style={{ marginRight: "20px" }}
              src={townicon}
            ></img>
            Ghaziabad
          </h4>
          <img
          alt='courseicon'
            width="30px"
            height="30px"
            style={{ marginRight: "20px", marginTop: "5px", marginLeft: "5px" }}
            src={course}
          ></img>
          <p>B.tech</p>
          <p>IT</p>
          <p>2nd Year</p>
        </div>

        <Link
          className={classes.Editdetails}
          to={"/editdetails" + "/" + this.props.match.params.userename}>
          Edit Details
        </Link>
        </div>
        <div className={classes.bio}>
          <h3>About me</h3>
          <div className={classes.biocontent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
          <div className={classes.alert}>
            <alert >
            scroll to read more
            </alert>
            </div>
        </div>
        
      </div>
    );
  }
}

export default withRouter(profile);
