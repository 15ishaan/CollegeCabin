import React ,{Component}from "react";
import Signin from "../Auth/Signin.js";
import Signup from "../Auth/Signup.js";
import { Link, Route, Switch,withRouter} from 'react-router-dom';
import Userprofile from "../Userprofile/Userprofile";
import Navbar from '../../Components/Navbar/Navbar'
class layout extends Component {
    render(){
        return(
            <div style={{ backgroundColor:"#F3F2EF" , minHeight:'100vh'}}>

                
                {/* <Link to='/Signin'> Signin</Link>
                <Link to='/profile/manas'> Userprofile</Link> */}
                    <Navbar/>
                <Switch>
                    <Route path='/Signup' exact render={() => (<Signup></Signup>)}></Route>
                    <Route path='/Signin' exact render={() => (<Signin></Signin>)}></Route>
                    <Route path='/profile/:userename' exact render={() => (<Userprofile></Userprofile>)}></Route>
                </Switch>
            </div>
        );

    }
}

export default withRouter(layout);