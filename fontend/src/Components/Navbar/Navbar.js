import React, { Component } from 'react';
import {Link} from "react-router-dom";

class navbar extends Component{

    render(){
        return(
            <div style={{backgroundColor:'white' , width:'100%' , height:'53px', marginBottom:'20px'}}>
                  <Link to='/Signin'> Signin</Link>
                <Link to='/profile/manas'> Userprofile</Link>
            </div>
        )
    }
}

export default navbar;