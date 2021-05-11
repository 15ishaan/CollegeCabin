import React from 'react';
import { Component } from 'react';
import classes from './userDetails.module.css';
import {withRouter} from 'react-router-dom';
import axios from '../../Components/hoc/axios'

class userdetails extends Component{
  state={
    profilePic:null,
    name:'',
    username:'',
    collegeName:'',
    branch:'',
    sem:''
  }
  componentDidMount(){
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
        });
        if (this.state.collegename === null) {
          this.props.history.push("/editdetails/" + this.state.username);
        }
      })
      .catch((error) => {

      });
  }
   toBookmark=()=>{
     this.props.history.push("/bookmarked/" + this.state.username)
   }
    render(){
        
        return (
          <div className={classes.main}>
            <div className={classes.userimg}>
              <div className={classes.background}></div>
              <div className={classes.img}>
                {this.state.profilePic === null ? (
                  <img
                    height="100px"
                    width="100px"
                    alt="img"
                    src="https://img.icons8.com/color/144/000000/circled-user-male-skin-type-4--v2.gif"
                  />
                ) : (
                  <img
                    src={"data:img/jpg;base64," + this.state.profilePic}
                    height="100px"
                    width="100px"
                    alt="user image"
                  />
                )}
              </div>
            </div>
            <div className={classes.userdetails}>
              <h3>{this.state.name}</h3>
              <h5>{this.state.collegename}</h5>
              {/* <h6>Btech IT 4sem</h6> */}

              <h6>
                Btech{"  " + this.state.branch + "  "}
                {this.state.sem + " sem"}
              </h6>
            </div>
            <hr></hr>
            <div className={classes.saveditems}>
              <img
                style={{ height: "30px", width: "30px" }}
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQxNi42NjcsMEg5NS4zMzRjLTguMjg0LDAtMTUsNi43MTYtMTUsMTV2NDgyYzAsNi4wNjcsMy42NTUsMTEuNTM2LDkuMjYsMTMuODU4YzEuODU2LDAuNzY5LDMuODA1LDEuMTQyLDUuNzM3LDEuMTQyICAgIGMzLjkwMywwLDcuNzQtMS41MjMsMTAuNjA5LTQuMzk0bDE1MC4wNjMtMTUwLjA2Mkw0MDYuMDYsNTA3LjYwNmM0LjI5LDQuMjkxLDEwLjc0MSw1LjU3MywxNi4zNDcsMy4yNTIgICAgYzUuNjA1LTIuMzIyLDkuMjYtNy43OTEsOS4yNi0xMy44NThWMTVDNDMxLjY2Nyw2LjcxNiw0MjQuOTUyLDAsNDE2LjY2NywweiIgZmlsbD0iI2Y1MDA1NyIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
              />
              <h4 onClick={this.toBookmark}>My Saved Items</h4>
            </div>
          </div>
        );
    }
}

export default withRouter(userdetails);