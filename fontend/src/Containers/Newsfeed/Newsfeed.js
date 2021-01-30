import { Component } from "react";
import React from 'react' ;
import {withRouter} from 'react-router-dom';
import Uploadpost from '../Uploadpost/Uploadpost';
import classes from './Newsfeed.module.css'
class newsfeed extends Component{
    render(){
        return(
            <div className={classes.Main}>
            <div style={{width:'216px'}}>
            user details
            </div>
            <div>
                <Uploadpost></Uploadpost>
                
            </div>
            <div style={{width:'216px'}}>
                top contri
            </div>
            </div>

        )
    }
} 

export default withRouter(newsfeed);