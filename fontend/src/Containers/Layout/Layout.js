import React ,{Component}from "react";
import Signin from "../Auth/Signin.js";
import Signup from "../Auth/Signup.js";
import { Link, Route, Switch,withRouter} from 'react-router-dom';
import Userprofile from "../Userprofile/Userprofile";
import Navbar from '../../Components/Navbar/Navbar';
import Details from '../../Containers/Detailsform/Detailsform';
import Test from '../../test'
import Newsfeed from "../Newsfeed/Newsfeed.js";
class layout extends Component {
    render(){
        let loggedin ;
        if(localStorage.getItem("jwt"))
        {
            loggedin = 'Signout';
        }
        else{
            loggedin = 'Signin';
        }
        return(
            <div>

                
                {/* <Link to='/Signin'> Signin</Link>
                <Link to='/profile/manas'> Userprofile</Link> */}
                    <Navbar loggedin={loggedin}/>
                   <div style={{height:'90px'}}></div>
                <Switch>
                    <Route path='/newsfeed/:username' exact render={() => (<Newsfeed></Newsfeed>)} ></Route>
                    <Route path='/Signup' exact render={() => (<Signup></Signup>)}></Route>
                    <Route path='/Signin' exact render={() => (<Signin></Signin>)}></Route>
                    <Route path='/profile/:userename' exact render={() => (<Userprofile></Userprofile>)}></Route>
                    <Route path='/test' exact render={() => (<Test></Test>)}></Route>
                    <Route path='/editdetails/:username' exact render={()=> (<Details></Details>)}></Route>
                </Switch>
             
            </div>
        );

    }
}

export default withRouter(layout);