import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom";
import classes from "./Userprofile.module.css";
import schoolicon from "../../Iconpack/school.png";
import townicon from "../../Iconpack/town.png";
import course from "../../Iconpack/online-course.png";
class profile extends Component {

    render(){
        return (
            
            <div className={classes.Main}>
               <div className ={classes.Photobar}>
                    <div className={classes.Userimage }>
                       <img height='150px' width ='150px' src='https://instagram.fdel1-4.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/79167405_564083314446636_1594084142532643441_n.jpg?_nc_ht=instagram.fdel1-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=Qx69g48fQDEAX9oRxlc&tp=1&oh=ce7225ef99378d7812557156b28aefc8&oe=5FF54C8B'></img>
                    </div>
                    <div className={classes.Username}>
                        <h3>Manas Saxena </h3>
                    </div>
               </div>
               <div className ={classes.Info}>
               <h4><img width='30px' height ="30px" style={{marginRight:'20px'}}src={schoolicon}></img>Ajay Kumar Garg Engineering College,</h4>
               <h4><img width='30px' height ="30px" style={{marginRight:'20px'}}src={townicon}></img>Ghaziabad</h4>
               <img width='30px' height ="30px" style={{marginRight:'20px' , marginTop:'5px', marginLeft:'5px'}}src={course}></img>
                <p>B.tech</p>
                <p>IT</p>
                <p>2nd Year</p>
               </div>
               
                   <Link className = {classes.Editdetails}>Edit Details</Link>
              
            </div>
           
        )
    }

}

export default withRouter(profile);