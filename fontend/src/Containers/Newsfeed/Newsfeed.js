import { Component } from "react";
import React from 'react' ;
import {withRouter} from 'react-router-dom';
import Uploadpost from '../Uploadpost/Uploadpost';
import classes from './Newsfeed.module.css'
import Postcard from "../Postcard/Postcard";
import Loader from "../../Components/reusable/Loader/Loader";
import axios from "../../Components/hoc/axios"
class newsfeed extends Component {
  state = {
    posts: [
     
    ],
    loading:true,
  };

  postUploadHandler =()=>{
    let username = localStorage.getItem("username");
    console.log(username);
    axios
      .get("/allPost/" + username)
      .then((response) => {
        console.log(response);
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
  componentDidMount() {
    let username = localStorage.getItem("username")
    console.log(username);
    axios.get("/allPost/" + username)
      .then((response) => {
        console.log(response);
        this.setState({
          posts: response.data,
          loading:false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading:false
        })
      });
  }
  render() {
    let posts = this.state.posts.map((post) => <Postcard key={post.id} postdata={post} />);
    let content;

    if(this.state.loading === true)
    {
      content =<Loader></Loader>
    }
    else{
      content = (
        <div className={classes.Main}>
          <div className={classes.userdetails} style={{ width: "300px" }}>
            <div
              style={{
                height: "300px",
                width: "225px",
                border: "2px solid grey",
                margin: "auto",
              }}
            ></div>
          </div>
          <div className={classes.posts}>
            <Uploadpost onpostupload={this.postUploadHandler}></Uploadpost>
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
    return (
      <div>
        {content}
      </div>
    );
  }
} 

export default withRouter(newsfeed);