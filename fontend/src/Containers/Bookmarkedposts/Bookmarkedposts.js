import { Component } from "react";
import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Bookmarkedposts.module.css";
import Userdetails from "../../Containers/userdetails/userDetails"
import Postcard from "../Postcard/BookmarkPostcard.js";
import Loader from "../../Components/reusable/Loader/Loader";
import axios from "../../Components/hoc/axios";
class newsfeed extends Component {
  state = {
    posts: [],
    loading: true,
  };


  componentDidMount() {
    let username = localStorage.getItem("username");
    console.log(username);
    axios
      .get("/myBookmarks/" + username)
      .then((response) => {
        console.log(response.data);
        this.setState({
          posts: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    // console.log(this.state.posts);
    let posts = this.state.posts.map((post,i) => (
      <Postcard key = {i} postid={post} />
      // console.log(post)
    ));
    let content;

    if (this.state.loading === true) {
      content = <Loader></Loader>;
    } else {
      content = (
        <div className={classes.Main}>
          <div className={classes.userdetails} style={{ width: "300px" }}>
            <Userdetails></Userdetails>
          </div>
          <div className={classes.posts}>
            <div className={classes.savedposts}>
              <img
                style={{ height: "60px", width: "60px" }}
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQxNi42NjcsMEg5NS4zMzRjLTguMjg0LDAtMTUsNi43MTYtMTUsMTV2NDgyYzAsNi4wNjcsMy42NTUsMTEuNTM2LDkuMjYsMTMuODU4YzEuODU2LDAuNzY5LDMuODA1LDEuMTQyLDUuNzM3LDEuMTQyICAgIGMzLjkwMywwLDcuNzQtMS41MjMsMTAuNjA5LTQuMzk0bDE1MC4wNjMtMTUwLjA2Mkw0MDYuMDYsNTA3LjYwNmM0LjI5LDQuMjkxLDEwLjc0MSw1LjU3MywxNi4zNDcsMy4yNTIgICAgYzUuNjA1LTIuMzIyLDkuMjYtNy43OTEsOS4yNi0xMy44NThWMTVDNDMxLjY2Nyw2LjcxNiw0MjQuOTUyLDAsNDE2LjY2NywweiIgZmlsbD0iI2Y1MDA1NyIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
              />
              <div>
                <h3>Your Saved Items</h3>
                <p>Anything you save is private .Successfully saved {this.state.posts.length} items</p>
              </div>
            </div>
            {/* <Postcard></Postcard>
          <Postcard></Postcard>
          <Postcard></Postcard> */}
            {posts}
          </div>
          <div className={classes.topcontri} style={{ width: "300px" }}>
            <div
              style={{
                height: "300px",
                width: "225px",
                border: "2px solid grey",
                margin: "0 auto",
              }}
            ></div>
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default withRouter(newsfeed);
