import axios from '../../Components/hoc/axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import classes from "./Topcontri.module.css"

class topcontri extends Component{
    state={
        topcontri:[],
    }

    componentDidMount(){
        axios
          .get("/allUser")
          .then((res) => {
            
            this.setState({
              topcontri: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
    }

    render(){
      console.log(this.state.topcontri)
      let contributors = this.state.topcontri.slice(0,3).map((user ,id)=>(
         <li key={id}>
           <Link className={classes.user} to={"/profile/manassaxena"}>
             <img
               className={classes.userimg}
               src={"data:img/jpg;base64," + user.picByte}
             ></img>
             <div>
               <h3>{user.firstName + user.lastName}</h3>
               <h5>{user.collegeName}</h5>
             </div>
           </Link>
         </li>
      ));
        return (
          <div className={classes.main}>
            <h2>TOP CONTRIBUTORS</h2>
            <hr></hr>
            <div className={classes.list}>
              <ul>
                {contributors}
                
              </ul>
            </div>
          </div>
        );
    }
}

export default topcontri;