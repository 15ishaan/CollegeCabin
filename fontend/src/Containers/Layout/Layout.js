import React ,{Component}from "react";
import Signin from "../Auth/Signin.js";
import Signup from "../Auth/Signup.js";
import { Link, Route, Switch,withRouter} from 'react-router-dom';
class layout extends Component {
    render(){
        return(
            <div>
                <Link to='/Signin'> Signin</Link>
                <Switch>
                    <Route path='/Signup' exact render={() => (<Signup></Signup>)}></Route>
                    <Route path='/Signin' exact render={() => (<Signin></Signin>)}></Route>
                </Switch>
            </div>
        );

    }
}

export default withRouter(layout);