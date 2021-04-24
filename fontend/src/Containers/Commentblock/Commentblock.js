import classes from "./Commentblock.module.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../Components/hoc/axios";
import Showcomment from "../Commentblock/Showcomment/Showcomment"
import Emoji from "../../Components/reusable/emoji"
class commentblock extends Component{
     state={
       docomment:"",
        comments:[],
        openemoji:false,
     }

     docommentHandler =(event) =>{
       let  comment = this.state.docomment;
       let username = localStorage.getItem("username");
        axios
          .post("/addComment/" + username +'/' + this.props.postkey , comment)
          .then((res) => {
            console.log(res);
            this.setState({
              docomment:""
            })
            this.onnewcommentHandler();
          })
          .catch((err) => {
            console.log(err);
          });
     }
     onnewcommentHandler=()=>{
       axios
         .post("/showComments" + "/" + this.props.postkey)
         .then((res) => {
           this.setState({
             comments: res.data,
           });
           console.log(res);
         })
         .catch((err) => {
           console.log(err);
         });
     }
    componentDidMount(){
        axios
          .post(
            "/showComments" +'/' + this.props.postkey)
          .then((res) => {
            
            this.setState({
              comments:res.data,
            })
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    oncommentchangehandler=(event)=>{

      this.setState({
        docomment:event.target.value,
      })

    }

    openemojihandler = ()=>{

      this.setState({
        openemoji:!this.state.openemoji,
      })
    }
    
    addemojiHandler =(selectedemoji)=>{
      this.setState({
        docomment:this.state.docomment + selectedemoji,
      })

      console.log(selectedemoji);
    }
    
    render(){
        let comments = this.state.comments.map((comment) => (<Showcomment commentdata ={comment}/>))
        return (
          <div className={classes.wrap}>
            <div className={classes.emojipicker}>
              {this.state.openemoji ? (
                <Emoji chooseemoji={this.addemojiHandler} />
              ) : null}
            </div>
            <div className={classes.main}>
              <div className={classes.docomment}>
                <img
                  alt="userimage"
                  className={classes.commentimg}
                  src="https://media-exp1.licdn.com/dms/image/C5103AQG51Pq3ZWpNqg/profile-displayphoto-shrink_800_800/0/1587154224992?e=1616630400&v=beta&t=GsPJPpOROPrIkSH_XmLhXUece4_MaZi45R9oaHVn5qM"
                ></img>
                <input
                  type="text"
                  className={classes.commentinput}
                  name="docomment"
                  value={this.state.docomment}
                  onChange={this.oncommentchangehandler}
                  autoComplete="off"
                  placeholder="Add a comment..."
                ></input>
                {/* <Emoji chooseemoji = {this.addemojiHandler}></Emoji> */}

                <img
                  onClick={this.openemojihandler}
                  width="35px"
                  height="35px"
                  style={{ marginLeft: "10px" }}
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8Y2lyY2xlIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3R5bGU9IiIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSIjZmZjYTI4IiBkYXRhLW9yaWdpbmFsPSIjZmZjYTI4IiBjbGFzcz0iIj48L2NpcmNsZT4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgc3R5bGU9IiIgY3g9IjE2MCIgY3k9IjE5MiIgcj0iMzIiIGZpbGw9IiM2ZDRjNDEiIGRhdGEtb3JpZ2luYWw9IiM2ZDRjNDEiPjwvY2lyY2xlPgoJPGNpcmNsZSBzdHlsZT0iIiBjeD0iMzUyIiBjeT0iMTkyIiByPSIzMiIgZmlsbD0iIzZkNGM0MSIgZGF0YS1vcmlnaW5hbD0iIzZkNGM0MSI+PC9jaXJjbGU+Cgk8cGF0aCBzdHlsZT0iIiBkPSJNMjU2LDQxNmMtNDIuNzUyLDAtODIuOTEyLTE2LjY3Mi0xMTMuMTUyLTQ2Ljg4Yy02LjI0LTYuMjQtNi4yNC0xNi4zODQsMC0yMi42MjQgICBzMTYuMzg0LTYuMjQsMjIuNjI0LDBjNDguMzUyLDQ4LjM4NCwxMzIuNjQsNDguMzg0LDE4MS4wMjQsMGM2LjI0LTYuMjQsMTYuMzg0LTYuMjQsMjIuNjI0LDBzNi4yNCwxNi4zODQsMCwyMi42MjQgICBDMzM4LjkxMiwzOTkuMzI4LDI5OC43NTIsNDE2LDI1Niw0MTZ6IiBmaWxsPSIjNmQ0YzQxIiBkYXRhLW9yaWdpbmFsPSIjNmQ0YzQxIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                />

                <button
                  onClick={this.docommentHandler}
                  // onKeyPress={this.docommentHandler}
                  className={classes.commentbutton}
                >
                  Post
                </button>
              </div>

              <div className={classes.viewcomment}></div>
              {comments}
            </div>
          </div>
        );

    }
}

export default withRouter(commentblock);