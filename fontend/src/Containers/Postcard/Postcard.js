import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Postcard.module.css";
import Comments from "../Commentblock/Commentblock";
import axios from "../../Components/hoc/axios";
class postcard extends Component {
  state = {
    liked : this.props.postdata.liked,
    noOfLikes : this.props.postdata.noOfLikes,
    showcomment: 0,
  };

  // componentDidMount(){
  //   axios.post
  // }

  likeHandler = (event) => {
    
    let username = localStorage.getItem("username");
    this.state.liked === false
       ? axios
           .post("/addLike/" + username + "/" + this.props.postdata.id)
           .then((res) => {
             this.setState({
             noOfLikes : res.data,
             liked:true,
            
             })
              console.log(res)
           })
           .catch((err) => {
             console.log(err);
           })
       : axios
           .post("/removeLike/" + username + "/" + this.props.postdata.id)
           .then((res) => {
             this.setState({
             noOfLikes : res.data,
            liked : false
             })
             console.log(res);
           })
           .catch((err) => {
             console.log(err);
           });
  };

  showcommentHandler = (event) => {
    this.setState({
      showcomment: !this.state.showcomment,
    });
  };

  render() {
    console.log(this.state.liked);
    return (
      <div className={classes.head}>
        <div className={classes.main}>
          <div className={classes.userinfo}>
            {/* <img
                  className={classes.userimage}
                  src={this.props.postdata.postsd.image}
                ></img> */}
            <div>
              <h4>{this.props.postdata.username}</h4>
              <p>{this.props.postdata.colName}</p>
            </div>
          </div>
          <div className={classes.postdata}>
            <div className={classes.postcaption}>
              <p>{this.props.postdata.caption}</p>
            </div>
            <div className={classes.postmedia}>
              {this.props.postdata.fileType === "image" ? (
                <img
                  alt="post img"
                  src={"data:img/jpg;base64," + this.props.postdata.fileByte}
                ></img>
              ) : (
                <embed
                style={{width:'100%',height:'500px'}}
                  src={"data:application/pdf;base64," + this.props.postdata.fileByte}
                />
              )}
            </div>
          </div>
          <div className={classes.likescount}>
            <img
              alt="likeicon"
              className={classes.likeicon}
              width="20px"
              height="20px"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQ2OS41MSwzMTdjNy4xNC03Ljk3LDExLjQ5LTE4LjQ5LDExLjQ5LTMwYzAtMjQuODEtMjAuMTktNDUtNDUtNDVoLTg3LjM0YzguNjUtMjYuMjUsMTIuMzQtNjEuMDgsMTIuMzQtNzYuMDFWMTUxICAgIGMwLTMzLjA4LTI2LjkyLTYwLTYwLTYwaC0xNWMtNi44OCwwLTEyLjg4LDQuNjgtMTQuNTUsMTEuMzZsLTguMTcsMzIuNjljLTExLjQ1LDQ1Ljc4LTQ3LjgsOTYuMjktODUuNDIsMTA1LjQ3ICAgIEMxNzEuMjcsMjIzLjg0LDE1NSwyMTIsMTM2LDIxMkg0NmMtOC4yOCwwLTE1LDYuNzItMTUsMTV2MjcwYzAsOC4yOCw2LjcyLDE1LDE1LDE1aDkwYzE3Ljg5LDAsMzMuMzctMTAuNDksNDAuNjItMjUuNjUgICAgbDUxLjU0LDE3LjE4YzE2Ljg1LDUuNjIsMzQuNDEsOC40Nyw1Mi4xOCw4LjQ3SDQwNmMyNC44MSwwLDQ1LTIwLjE5LDQ1LTQ1YzAtNS44NS0xLjEyLTExLjQ1LTMuMTYtMTYuNTggICAgQzQ2Ni45Miw0NDUuMjEsNDgxLDQyNy43Miw0ODEsNDA3YzAtMTEuNTEtNC4zNS0yMi4wMy0xMS40OS0zMGM3LjE0LTcuOTcsMTEuNDktMTguNDksMTEuNDktMzBTNDc2LjY1LDMyNC45Nyw0NjkuNTEsMzE3eiAgICAgTTE1MSw0NjdjMCw4LjI3LTYuNzMsMTUtMTUsMTVINjFWMjQyaDc1YzguMjcsMCwxNSw2LjczLDE1LDE1VjQ2N3ogTTQwNiwzMzJoMzBjOC4yNywwLDE1LDYuNzMsMTUsMTVjMCw4LjI3LTYuNzMsMTUtMTUsMTVoLTMwICAgIGMtOC4yOCwwLTE1LDYuNzItMTUsMTVjMCw4LjI4LDYuNzIsMTUsMTUsMTVoMzBjOC4yNywwLDE1LDYuNzMsMTUsMTVjMCw4LjI3LTYuNzMsMTUtMTUsMTVoLTMwYy04LjI4LDAtMTUsNi43Mi0xNSwxNSAgICBjMCw4LjI4LDYuNzIsMTUsMTUsMTVjOC4yNywwLDE1LDYuNzMsMTUsMTVjMCw4LjI3LTYuNzMsMTUtMTUsMTVIMjgwLjM0Yy0xNC41NCwwLTI4LjkxLTIuMzMtNDIuNy02LjkzTDE4MSw0NTYuMTlWMjcwLjU4ICAgIGMyMy41My00LjQ3LDQ2LjU2LTE5LjM3LDY3LjM1LTQzLjc2YzIwLjMtMjMuODIsMzYuNzYtNTUuNCw0NC4wMy04NC40OWw1LjMzLTIxLjMzSDMwMWMxNi41NCwwLDMwLDEzLjQ2LDMwLDMwdjE0Ljk5ICAgIGMwLDIwLjE0LTYuMyw1OC43Ny0xNC4zNiw3Ni4wMUgyODZjLTguMjgsMC0xNSw2LjcyLTE1LDE1YzAsOC4yOCw2LjcyLDE1LDE1LDE1aDE1MGM4LjI3LDAsMTUsNi43MywxNSwxNWMwLDguMjctNi43MywxNS0xNSwxNSAgICBoLTMwYy04LjI4LDAtMTUsNi43Mi0xNSwxNUMzOTEsMzI1LjI4LDM5Ny43MiwzMzIsNDA2LDMzMnoiIGZpbGw9IiMzZjUxYjUiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPGNpcmNsZSBjeD0iMTA2IiBjeT0iNDM3IiByPSIxNSIgZmlsbD0iIzNmNTFiNSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9jaXJjbGU+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxnPgoJCTxwYXRoIGQ9Ik0zMTYsMGMtOC4yODQsMC0xNSw2LjcxNi0xNSwxNXYzMWMwLDguMjg0LDYuNzE2LDE1LDE1LDE1czE1LTYuNzE2LDE1LTE1VjE1QzMzMSw2LjcxNiwzMjQuMjg0LDAsMzE2LDB6IiBmaWxsPSIjM2Y1MWI1IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxnPgoJCTxwYXRoIGQ9Ik0yNTIuMzYsNjYuMTQ4bC0yMS4yMTMtMjEuMjEzYy01Ljg1Ny01Ljg1OC0xNS4zNTUtNS44NTgtMjEuMjEzLDBjLTUuODU4LDUuODU4LTUuODU4LDE1LjM1NSwwLDIxLjIxM2wyMS4yMTMsMjEuMjEzICAgIGM1Ljg1Nyw1Ljg1NywxNS4zNTYsNS44NTgsMjEuMjEzLDBDMjU4LjIxOCw4MS41MDMsMjU4LjIxOCw3Mi4wMDYsMjUyLjM2LDY2LjE0OHoiIGZpbGw9IiMzZjUxYjUiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQyMi4wNjYsNDQuOTM1Yy01Ljg1Ny01Ljg1OC0xNS4zNTUtNS44NTgtMjEuMjEzLDBMMzc5LjY0LDY2LjE0N2MtNS44NTgsNS44NTgtNS44NTgsMTUuMzU1LDAsMjEuMjEzICAgIGM1Ljg1Nyw1Ljg1OCwxNS4zNTUsNS44NTksMjEuMjEzLDAuMDAxbDIxLjIxMy0yMS4yMTNDNDI3LjkyNCw2MC4yOSw0MjcuOTI0LDUwLjc5Myw0MjIuMDY2LDQ0LjkzNXoiIGZpbGw9IiMzZjUxYjUiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
            />
            <p>{this.state.noOfLikes}</p>
            <img
              alt="commenticon"
              className={classes.likeicon}
              width="20px"
              height="20px"
              style={{ paddingTop: "10px" }}
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTQwNyAuNWgtMzAyYy01Ny44OTg0MzggMC0xMDUgNDcuMTAxNTYyLTEwNSAxMDV2MTYyLjE3MTg3NWMwIDQ2LjE5OTIxOSAzMC4zMzIwMzEgODYuNDM3NSA3NC4yODUxNTYgOTkuMzE2NDA2bDUwLjcxMDkzOCA1MC43MTQ4NDRjMi44MTY0MDYgMi44MTI1IDYuNjI4OTA2IDQuMzk0NTMxIDEwLjYwOTM3NSA0LjM5NDUzMSAzLjk3NjU2MiAwIDcuNzkyOTY5LTEuNTgyMDMxIDEwLjYwNTQ2OS00LjM5NDUzMWw0Ni41MTk1MzEtNDYuNTIzNDM3aDIxNC4yNjk1MzFjNTcuODk4NDM4IDAgMTA1LTQ3LjEwMTU2MyAxMDUtMTA1di0xNjAuNjc5Njg4YzAtNTcuODk4NDM4LTQ3LjEwMTU2Mi0xMDUtMTA1LTEwNXptNzUgMjY1LjY3OTY4OGMwIDQxLjM1NTQ2OC0zMy42NDQ1MzEgNzUtNzUgNzVoLTIyMC40ODA0NjljLTMuOTc2NTYyIDAtNy43OTI5NjkgMS41ODIwMzEtMTAuNjA1NDY5IDQuMzk0NTMxbC00MC4zMDg1OTMgNDAuMzA4NTkzLTQyLjkyOTY4OC00Mi45Mjk2ODdjLTEuOTI1NzgxLTEuOTI1NzgxLTQuMzM5ODQzLTMuMjkyOTY5LTYuOTg0Mzc1LTMuOTQ5MjE5LTMyLjc4OTA2Mi04LjE2MDE1Ni01NS42OTE0MDYtMzcuNDkyMTg3LTU1LjY5MTQwNi03MS4zMzIwMzF2LTE2Mi4xNzE4NzVjMC00MS4zNTU0NjkgMzMuNjQ0NTMxLTc1IDc1LTc1aDMwMmM0MS4zNTU0NjkgMCA3NSAzMy42NDQ1MzEgNzUgNzV6bTAgMCIgZmlsbD0iI2NmMzM2NSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTM1MS4yNDIxODggMTQ0LjMyODEyNWgtMTkwLjQ4NDM3NmMtOC4yODUxNTYgMC0xNSA2LjcxODc1LTE1IDE1IDAgOC4yODUxNTYgNi43MTQ4NDQgMTUgMTUgMTVoMTkwLjQ4NDM3NmM4LjI4NTE1NiAwIDE1LTYuNzE0ODQ0IDE1LTE1IDAtOC4yODEyNS02LjcxNDg0NC0xNS0xNS0xNXptMCAwIiBmaWxsPSIjY2YzMzY1IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMzUxLjI0MjE4OCAxOTcuMzUxNTYyaC0xOTAuNDg0Mzc2Yy04LjI4NTE1NiAwLTE1IDYuNzE0ODQ0LTE1IDE1IDAgOC4yODUxNTcgNi43MTQ4NDQgMTUgMTUgMTVoMTkwLjQ4NDM3NmM4LjI4NTE1NiAwIDE1LTYuNzE0ODQzIDE1LTE1IDAtOC4yODUxNTYtNi43MTQ4NDQtMTUtMTUtMTV6bTAgMCIgZmlsbD0iI2NmMzM2NSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4="
            />
            <p>{this.props.postdata.noOfComments}</p>
          </div>
          <div className={classes.likecomment}>
            <button onClick={this.likeHandler}>
              {this.state.liked ? (
                <img
                  className={classes.bounce}
                  width="25px"
                  height="25px"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTUzLjMzMywyMjRDMjMuOTM2LDIyNCwwLDI0Ny45MzYsMCwyNzcuMzMzVjQ0OGMwLDI5LjM5NywyMy45MzYsNTMuMzMzLDUzLjMzMyw1My4zMzNoNjQgICAgYzEyLjAxMSwwLDIzLjA2MS00LjA1MywzMi0xMC43OTVWMjI0SDUzLjMzM3oiIGZpbGw9IiMzZjUxYjUiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTUxMiwzMDRjMC0xMi44MjEtNS4wNzctMjQuNzY4LTEzLjg4OC0zMy41NzljOS45NjMtMTAuOTAxLDE1LjA0LTI1LjUxNSwxMy42NTMtNDAuNzI1ICAgIGMtMi40OTYtMjcuMTE1LTI2LjkyMy00OC4zNjMtNTUuNjM3LTQ4LjM2M0gzMjQuMzUyYzYuNTI4LTE5LjgxOSwxNi45ODEtNTYuMTQ5LDE2Ljk4MS04NS4zMzNjMC00Ni4yNzItMzkuMzE3LTg1LjMzMy02NC04NS4zMzMgICAgYy0yMi4xNjUsMC0zNy45OTUsMTIuNDgtMzguNjc3LDEyLjk5MmMtMi41MTcsMi4wMjctMy45ODksNS4wOTktMy45ODksOC4zNDF2NzIuMzQxbC02MS40NCwxMzMuMDk5bC0yLjU2LDEuMzAxdjIyOC42NTEgICAgQzE4OC4wMzIsNDc1LjU4NCwyMTAuMDA1LDQ4MCwyMjQsNDgwaDE5NS44MTljMjMuMjMyLDAsNDMuNTYzLTE1LjY1OSw0OC4zNDEtMzcuMjY5YzIuNDUzLTExLjExNSwxLjAyNC0yMi4zMTUtMy44NjEtMzIuMDQzICAgIGMxNS43NjUtNy45MzYsMjYuMzY4LTI0LjE3MSwyNi4zNjgtNDIuNjg4YzAtNy41NTItMS43MjgtMTQuNzg0LTUuMDEzLTIxLjMzM0M1MDEuNDE5LDMzOC43MzEsNTEyLDMyMi40OTYsNTEyLDMwNHoiIGZpbGw9IiMzZjUxYjUiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
                />
              ) : (
                <img
                  width="25px"
                  height="25px"
                  style={{ cursor: "pointer" }}
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTUzLjMzMywyMjRDMjMuOTM2LDIyNCwwLDI0Ny45MzYsMCwyNzcuMzMzVjQ0OGMwLDI5LjM5NywyMy45MzYsNTMuMzMzLDUzLjMzMyw1My4zMzNoNjQgICAgYzEyLjAxMSwwLDIzLjA2MS00LjA1MywzMi0xMC43OTVWMjI0SDUzLjMzM3oiIGZpbGw9IiM3YzdjN2MiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTUxMiwzMDRjMC0xMi44MjEtNS4wNzctMjQuNzY4LTEzLjg4OC0zMy41NzljOS45NjMtMTAuOTAxLDE1LjA0LTI1LjUxNSwxMy42NTMtNDAuNzI1ICAgIGMtMi40OTYtMjcuMTE1LTI2LjkyMy00OC4zNjMtNTUuNjM3LTQ4LjM2M0gzMjQuMzUyYzYuNTI4LTE5LjgxOSwxNi45ODEtNTYuMTQ5LDE2Ljk4MS04NS4zMzNjMC00Ni4yNzItMzkuMzE3LTg1LjMzMy02NC04NS4zMzMgICAgYy0yMi4xNjUsMC0zNy45OTUsMTIuNDgtMzguNjc3LDEyLjk5MmMtMi41MTcsMi4wMjctMy45ODksNS4wOTktMy45ODksOC4zNDF2NzIuMzQxbC02MS40NCwxMzMuMDk5bC0yLjU2LDEuMzAxdjIyOC42NTEgICAgQzE4OC4wMzIsNDc1LjU4NCwyMTAuMDA1LDQ4MCwyMjQsNDgwaDE5NS44MTljMjMuMjMyLDAsNDMuNTYzLTE1LjY1OSw0OC4zNDEtMzcuMjY5YzIuNDUzLTExLjExNSwxLjAyNC0yMi4zMTUtMy44NjEtMzIuMDQzICAgIGMxNS43NjUtNy45MzYsMjYuMzY4LTI0LjE3MSwyNi4zNjgtNDIuNjg4YzAtNy41NTItMS43MjgtMTQuNzg0LTUuMDEzLTIxLjMzM0M1MDEuNDE5LDMzOC43MzEsNTEyLDMyMi40OTYsNTEyLDMwNHoiIGZpbGw9IiM3YzdjN2MiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
                />
              )}
            </button>
            <p>Like</p>
            <button onClick={this.showcommentHandler}>
              <img
                width="25px"
                height="25px"
                style={{ marginTop: "6px", cursor: "pointer" }}
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTQwNyAuNWgtMzAyYy01Ny44OTg0MzggMC0xMDUgNDcuMTAxNTYyLTEwNSAxMDV2MTYyLjE3MTg3NWMwIDQ2LjE5OTIxOSAzMC4zMzIwMzEgODYuNDM3NSA3NC4yODUxNTYgOTkuMzE2NDA2bDUwLjcxMDkzOCA1MC43MTQ4NDRjMi44MTY0MDYgMi44MTI1IDYuNjI4OTA2IDQuMzk0NTMxIDEwLjYwOTM3NSA0LjM5NDUzMSAzLjk3NjU2MiAwIDcuNzkyOTY5LTEuNTgyMDMxIDEwLjYwNTQ2OS00LjM5NDUzMWw0Ni41MTk1MzEtNDYuNTIzNDM3aDIxNC4yNjk1MzFjNTcuODk4NDM4IDAgMTA1LTQ3LjEwMTU2MyAxMDUtMTA1di0xNjAuNjc5Njg4YzAtNTcuODk4NDM4LTQ3LjEwMTU2Mi0xMDUtMTA1LTEwNXptLTI2MS4yNDIxODggMjExLjg1MTU2MmMwLTguMjg1MTU2IDYuNzE0ODQ0LTE1IDE1LTE1aDE5MC40ODQzNzZjOC4yODUxNTYgMCAxNSA2LjcxNDg0NCAxNSAxNSAwIDguMjg1MTU3LTYuNzE0ODQ0IDE1LTE1IDE1aC0xOTAuNDg0Mzc2Yy04LjI4NTE1NiAwLTE1LTYuNzE0ODQzLTE1LTE1em0yMDUuNDg0Mzc2LTM4LjAyMzQzN2gtMTkwLjQ4NDM3NmMtOC4yODUxNTYgMC0xNS02LjcxNDg0NC0xNS0xNSAwLTguMjgxMjUgNi43MTQ4NDQtMTUgMTUtMTVoMTkwLjQ4NDM3NmM4LjI4NTE1NiAwIDE1IDYuNzE4NzUgMTUgMTUgMCA4LjI4NTE1Ni02LjcxNDg0NCAxNS0xNSAxNXptMCAwIiBmaWxsPSIjZjUwMDU3IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvc3ZnPg=="
              />
            </button>
            <p>Comment</p>
          </div>
        </div>
        {this.state.showcomment ? (
          <Comments postkey={this.props.postdata.id}></Comments>
        ) : null}
      </div>
    );
  }
}

export default withRouter(postcard);
