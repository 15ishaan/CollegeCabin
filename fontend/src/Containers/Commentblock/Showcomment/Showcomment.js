import React , {Component} from "react"
import { withRouter } from "react-router-dom";
import classes from "./Showcomment.module.css";
class showcomment extends Component{
    render(){
        return (
          <div className={classes.main}>
            <div className={classes.userimg}>
              <img
                alt="post img"
                src={"data:img/jpg;base64," + this.props.commentdata.picByte}
              ></img>
            </div>
            <div className={classes.comment}>
              <div className={classes.userinfo}>
                <h5>Manas Saxena</h5>
                <p>Ajay Kumar Garg engineering college</p>
              </div>
              <div className={classes.commentdata}>
                {this.props.commentdata.comments}
              </div>
            </div>
          </div>
        );
    }
}

export default withRouter(showcomment);