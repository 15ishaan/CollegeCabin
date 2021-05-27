import React ,{Component}from "react";
import Signin from "../Auth/Signin.js";
import Signup from "../Auth/Signup.js";
import { Redirect, Route, Switch,withRouter} from 'react-router-dom';
import Userprofile from "../Userprofile/Userprofile";
import Navbar from '../../Components/Navbar/Navbar';
import Details from '../../Containers/Detailsform/Detailsform';
import Test from '../../test'
import Newsfeed from "../Newsfeed/Newsfeed.js";
import Bookmarkedposts from "../Bookmarkedposts/Bookmarkedposts"
import Needpass from "../Auth/Needpass"
import Editpassword from "../../Containers/Editpassword/Editpassword";
import Forgetpassword from "../Forgetpassword/Forgetpassword" 
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
                   <div style={{height:'70px'}}></div>
                <Switch>
                   {
                       loggedin==='Signout'?
                    <Route path='/newsfeed/:username' exact render={() => (<Newsfeed></Newsfeed>)} ></Route>
                    :<Route path='/newsfeed/:username' exact render={() => (<Redirect to="/Signin"></Redirect>)} ></Route>
                    }
                    {
                        loggedin ==='Signout'?
                        <Route path='/Signup' exact render={() => (<Redirect to ={'/newsfeed/' + localStorage.getItem('username')}/>)}></Route>:
                        <Route path='/Signup' exact render={() => (<Signup></Signup>)}></Route>

                    }
                    {
                        loggedin === 'Signout'?
                        <Route path='/Signin' exact render={() => (<Redirect to = {'/newsfeed/' + localStorage.getItem('username')}></Redirect>)}></Route>
                        :<Route path='/Signin' exact render={() => (<Signin></Signin>)}></Route>
                    }
                    {
                        loggedin === 'Signout'?
                        <Route path='/profile/:userename' exact render={() => (<Userprofile></Userprofile>)}></Route>:
                        <Route path='/profile/:userename' exact render={() => (<Redirect to='/Signin' />)}></Route>

                    }

                    <Route path='/test' exact render={() => (<Test></Test>)}></Route>
                    {
                        loggedin === 'Signout'?
                        <Route path='/bookmarked/:username' exact render={()=><Bookmarkedposts></Bookmarkedposts>} />
                        :<Route path='/bookmarked/:username' exact render={()=>(<Redirect to ='/Signin'></Redirect>)} />
                    }  
                    { 
                        loggedin === 'Signout'?
                        <Route path='/editdetails/:username' exact render={()=> (<Details></Details>)}></Route>
                        :<Route path='/editdetails/:username' exact render={()=> (<Redirect to ='/Signin' ></Redirect>)}></Route>
                        
                    }
                    { 
                        loggedin === 'Signout'?
                        <Route path='/editpassword/:username' exact render={()=> (<Editpassword></Editpassword>)}></Route>
                        :<Route path='/editpassword/:username' exact render={()=> (<Redirect to ='/Signin' ></Redirect>)}></Route>
                        
                    }
                    {
                        loggedin === 'Signin'?
                    <Route path="/needpass/:username" exact render={()=>(<Needpass></Needpass>)}></Route>
                    :<Route path="/needpass/:username" exact render={()=>(<Redirect to='/Signin'></Redirect>)}></Route>
                       
                    }
                    <Route path ='/forgetpass' exact render={()=>(<Forgetpassword></Forgetpassword>)}></Route>
                    <Route path ='*' render={()=>(<h1>404 NOT FOUND</h1>)}/>
                </Switch>
             
            </div>
        );

    }
}

export default withRouter(layout);