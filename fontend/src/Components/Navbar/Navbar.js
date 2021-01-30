import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link ,withRouter} from 'react-router-dom'
import Logo from '../../Iconpack/logo.png';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:"#6699E4",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

 function ButtonAppBar(props) {
  const classes = useStyles();
   const[ loggedin , setloggedin] =React.useState(0);
  const toSigninHandler =() =>
  {
      props.history.push("/Signin");
  }

  const toHomeHandler =()=>{
    props.history.push("/newsfeed/" + "manas");
  }
//   if(localStorage.getItem("jwt"))
//   {
//       setloggedin(1);
//   }
//   else
//   {
//       setloggedin(0);
//   }
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Button onClick={toHomeHandler}><img  height='50px'src={Logo}></img></Button>
           {/* <Link to='/newsfeed/manas'><img  height='50px'src={Logo}></img></Link> */}
          </Typography>
          <Button color="inherit" onClick={toSigninHandler}>{props.loggedin}</Button>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
            {/*  */}
            <Link to='/profile/manas'> <img height='30px' width ='30px'src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTMzMy42NzE4NzUgMTIzLjMwODU5NGMwIDMzLjg4NjcxOC0xMi4xNTIzNDQgNjMuMjE4NzUtMzYuMTI1IDg3LjE5NTMxMi0yMy45NzI2NTYgMjMuOTcyNjU2LTUzLjMwODU5NCAzNi4xMjUtODcuMTk1MzEzIDM2LjEyNWgtLjA1ODU5M2MtMzMuODQzNzUtLjAxMTcxOC02My4xNjAxNTctMTIuMTY0MDYyLTg3LjEzMjgxMy0zNi4xMjUtMjMuOTc2NTYyLTIzLjk3NjU2Mi0zNi4xMjUtNTMuMzA4NTk0LTM2LjEyNS04Ny4xOTUzMTIgMC0zMy44NzUgMTIuMTQ4NDM4LTYzLjIxMDkzOCAzNi4xMjUtODcuMTgzNTk0IDIzLjk2MDkzOC0yMy45NjQ4NDQgNTMuMjc3MzQ0LTM2LjExMzI4MTIgODcuMTMyODEzLTM2LjEyNWguMDU4NTkzYzMzLjg3NSAwIDYzLjIxMDkzOCAxMi4xNTIzNDQgODcuMTk1MzEzIDM2LjEyNSAyMy45NzI2NTYgMjMuOTcyNjU2IDM2LjEyNSA1My4zMDg1OTQgMzYuMTI1IDg3LjE4MzU5NHptMCAwIiBmaWxsPSIjZmZiYjg1IiBkYXRhLW9yaWdpbmFsPSIjZmZiYjg1IiBzdHlsZT0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNDI3LjE2Nzk2OSA0MjMuOTQ1MzEyYzAgMjYuNzM0Mzc2LTguNTAzOTA3IDQ4LjM3ODkwNy0yNS4yNTM5MDcgNjQuMzIwMzEzLTE2LjU1NDY4NyAxNS43NTM5MDYtMzguNDQ5MjE4IDIzLjczNDM3NS02NS4wNzAzMTIgMjMuNzM0Mzc1aC0yNDYuNTMxMjVjLTI2LjYyMTA5NCAwLTQ4LjUxNTYyNS03Ljk4MDQ2OS02NS4wNTg1OTQtMjMuNzM0Mzc1LTE2Ljc2MTcxOC0xNS45NTMxMjUtMjUuMjUzOTA2LTM3LjU5Mzc1LTI1LjI1MzkwNi02NC4zMjAzMTMgMC0xMC4yODEyNS4zMzk4NDQtMjAuNDUzMTI0IDEuMDE5NTMxLTMwLjIzNDM3NC42OTE0MDctMTAgMi4wODk4NDQtMjAuODgyODEzIDQuMTUyMzQ0LTMyLjM2MzI4MiAyLjA3ODEyNS0xMS41NzQyMTggNC43NS0yMi41MTU2MjUgNy45NDkyMTktMzIuNTE1NjI1IDMuMzIwMzEyLTEwLjM1MTU2MiA3LjgxMjUtMjAuNTYyNSAxMy4zNzEwOTQtMzAuMzQzNzUgNS43NzM0MzctMTAuMTUyMzQzIDEyLjU1NDY4Ny0xOC45OTYwOTMgMjAuMTU2MjUtMjYuMjc3MzQzIDcuOTY4NzUtNy42MjEwOTQgMTcuNzEwOTM3LTEzLjc0MjE4OCAyOC45NzI2NTYtMTguMjAzMTI2IDExLjIyMjY1Ni00LjQzNzUgMjMuNjY0MDYyLTYuNjg3NSAzNi45NzY1NjItNi42ODc1IDUuMjIyNjU2IDAgMTAuMjgxMjUgMi4xMzY3MTkgMjAuMDMxMjUgOC40ODgyODIgNi4xMDE1NjMgMy45ODA0NjggMTMuMTMyODEzIDguNTExNzE4IDIwLjg5NDUzMiAxMy40NzI2NTYgNi43MDMxMjQgNC4yNzM0MzggMTUuNzgxMjUgOC4yODEyNSAyNy4wMDM5MDYgMTEuOTAyMzQ0IDkuODYzMjgxIDMuMTkxNDA2IDE5Ljg3NSA0Ljk3MjY1NiAyOS43NjU2MjUgNS4yODEyNSAxLjA4OTg0My4wMzkwNjIgMi4xNzk2ODcuMDU4NTk0IDMuMjY5NTMxLjA1ODU5NCAxMC45ODQzNzUgMCAyMi4wOTM3NS0xLjgwMDc4MiAzMy4wNDY4NzUtNS4zMzk4NDQgMTEuMjIyNjU2LTMuNjIxMDk0IDIwLjMxMjUtNy42Mjg5MDYgMjcuMDExNzE5LTExLjkwMjM0NCA3Ljg0Mzc1LTUuMDExNzE5IDE0Ljg3NS05LjUzOTA2MiAyMC44ODY3MTgtMTMuNDYwOTM4IDkuNzU3ODEzLTYuMzYzMjgxIDE0LjgwODU5NC04LjUgMjAuMDQyOTY5LTguNSAxMy4zMDA3ODEgMCAyNS43NDIxODggMi4yNSAzNi45NzI2NTcgNi42ODc1IDExLjI2MTcxOCA0LjQ2MDkzOCAyMS4wMDM5MDYgMTAuNTkzNzUgMjguOTY0ODQzIDE4LjIwMzEyNiA3LjYxMzI4MSA3LjI4MTI1IDE0LjM5NDUzMSAxNi4xMjUgMjAuMTY0MDYzIDI2LjI3NzM0MyA1LjU2MjUgOS43ODkwNjMgMTAuMDYyNSAxOS45OTIxODggMTMuMzcxMDk0IDMwLjMzMjAzMSAzLjIwMzEyNCAxMC4wMTE3MTkgNS44ODI4MTIgMjAuOTUzMTI2IDcuOTYwOTM3IDMyLjUzNTE1NyAyLjA1MDc4MSAxMS40OTIxODcgMy40NTMxMjUgMjIuMzc1IDQuMTQwNjI1IDMyLjM0NzY1Ni42OTE0MDYgOS43NSAxLjAzMTI1IDE5LjkyMTg3NSAxLjA0Mjk2OSAzMC4yNDIxODd6bTAgMCIgZmlsbD0iI2YzNDI4MSIgZGF0YS1vcmlnaW5hbD0iIzZhYTlmZiIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTIxMC4zNTE1NjIgMjQ2LjYyODkwNmgtLjA1ODU5M3YtMjQ2LjYyODkwNmguMDU4NTkzYzMzLjg3NSAwIDYzLjIxMDkzOCAxMi4xNTIzNDQgODcuMTk1MzEzIDM2LjEyNSAyMy45NzI2NTYgMjMuOTcyNjU2IDM2LjEyNSA1My4zMDg1OTQgMzYuMTI1IDg3LjE4MzU5NCAwIDMzLjg4NjcxOC0xMi4xNTIzNDQgNjMuMjE4NzUtMzYuMTI1IDg3LjE5NTMxMi0yMy45NzI2NTYgMjMuOTcyNjU2LTUzLjMwODU5NCAzNi4xMjUtODcuMTk1MzEzIDM2LjEyNXptMCAwIiBmaWxsPSIjZjVhODZjIiBkYXRhLW9yaWdpbmFsPSIjZjVhODZjIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNDI3LjE2Nzk2OSA0MjMuOTQ1MzEyYzAgMjYuNzM0Mzc2LTguNTAzOTA3IDQ4LjM3ODkwNy0yNS4yNTM5MDcgNjQuMzIwMzEzLTE2LjU1NDY4NyAxNS43NTM5MDYtMzguNDQ5MjE4IDIzLjczNDM3NS02NS4wNzAzMTIgMjMuNzM0Mzc1aC0xMjYuNTUwNzgxdi0yMjUuNTM1MTU2YzEuMDg5ODQzLjAzOTA2MiAyLjE3OTY4Ny4wNTg1OTQgMy4yNjk1MzEuMDU4NTk0IDEwLjk4NDM3NSAwIDIyLjA5Mzc1LTEuODAwNzgyIDMzLjA0Njg3NS01LjMzOTg0NCAxMS4yMjI2NTYtMy42MjEwOTQgMjAuMzEyNS03LjYyODkwNiAyNy4wMTE3MTktMTEuOTAyMzQ0IDcuODQzNzUtNS4wMTE3MTkgMTQuODc1LTkuNTM5MDYyIDIwLjg4NjcxOC0xMy40NjA5MzggOS43NTc4MTMtNi4zNjMyODEgMTQuODA4NTk0LTguNSAyMC4wNDI5NjktOC41IDEzLjMwMDc4MSAwIDI1Ljc0MjE4OCAyLjI1IDM2Ljk3MjY1NyA2LjY4NzUgMTEuMjYxNzE4IDQuNDYwOTM4IDIxLjAwMzkwNiAxMC41OTM3NSAyOC45NjQ4NDMgMTguMjAzMTI2IDcuNjEzMjgxIDcuMjgxMjUgMTQuMzk0NTMxIDE2LjEyNSAyMC4xNjQwNjMgMjYuMjc3MzQzIDUuNTYyNSA5Ljc4OTA2MyAxMC4wNjI1IDE5Ljk5MjE4OCAxMy4zNzEwOTQgMzAuMzMyMDMxIDMuMjAzMTI0IDEwLjAxMTcxOSA1Ljg4MjgxMiAyMC45NTMxMjYgNy45NjA5MzcgMzIuNTM1MTU3IDIuMDUwNzgxIDExLjQ5MjE4NyAzLjQ1MzEyNSAyMi4zNzUgNC4xNDA2MjUgMzIuMzQ3NjU2LjY5MTQwNiA5Ljc1IDEuMDMxMjUgMTkuOTIxODc1IDEuMDQyOTY5IDMwLjI0MjE4N3ptMCAwIiBmaWxsPSIjZjUwMDU3IiBkYXRhLW9yaWdpbmFsPSIjMjY4MmZmIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvc3ZnPg==" /></Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar); 
{/* <div style={{backgroundColor:'white' , width:'100%' , height:'53px', marginBottom:'20px'}}>
                  <Link to='/Signin'> Signin</Link>
                <Link to='/profile/manas'> Userprofile</Link>
                <Link to ='/test'>test</Link>
            </div> */}