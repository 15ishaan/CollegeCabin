import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from '@material-ui/core';
import Progress  from '../../../Components/reusable/progress'
import Axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
    const[file , setfile] = React.useState(null);
    let[Progressbar,setProgressbar] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };
  let inputRef = React.useRef(null);
  const fileInput = React.useRef(null);
  const handleClose = () => {
    setProgressbar (0);
    setfile(null);
    
    setOpen(false); 
  };

 const onChangeHandler=(event) =>{
      setfile(event.target.files[0]);
      setProgressbar(50);
      
  }
  const handleClick = event => {
      inputRef.current.click();
  };

  const submit =() =>
  {
     
    let fd = new FormData();
    //console.log(file);
    var filedata = file;
    console.log(filedata);
    fd.append('image' , filedata , filedata.name);
     //console.log(fd.get('images'));
    const username = localStorage.getItem("username");
    Axios.post("http://00409ed8638e.ngrok.io/image/" + username, fd,{
      onUploadProgress:progressEvent =>{
        console.log('upload Progress' + Math.round((progressEvent.loaded/progressEvent.total) *100)+'%')
        // setProgressbar(String(Math.round((progressEvent.loaded/progressEvent.total) *100)));
      }
    })
    .then((response) =>{
        
        console.log(response);
         this.props.history.push("/profile/" + this.props.match.params.userename)
    })
    .catch((error) =>{
        console.log(error);
    })
 }

  //console.log(file);
  return (

    <div>
      <Button onClick={handleClickOpen}>
      <img alt='img' style={{height:'20px' ,width:'20px'}} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUyOC44OTkgNTI4Ljg5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDApIj4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGQ9Ik0zMjguODgzLDg5LjEyNWwxMDcuNTksMTA3LjU4OWwtMjcyLjM0LDI3Mi4zNEw1Ni42MDQsMzYxLjQ2NUwzMjguODgzLDg5LjEyNXogTTUxOC4xMTMsNjMuMTc3bC00Ny45ODEtNDcuOTgxICAgYy0xOC41NDMtMTguNTQzLTQ4LjY1My0xOC41NDMtNjcuMjU5LDBsLTQ1Ljk2MSw0NS45NjFsMTA3LjU5LDEwNy41OWw1My42MTEtNTMuNjExICAgQzUzMi40OTUsMTAwLjc1Myw1MzIuNDk1LDc3LjU1OSw1MTguMTEzLDYzLjE3N3ogTTAuMyw1MTIuNjljLTEuOTU4LDguODEyLDUuOTk4LDE2LjcwOCwxNC44MTEsMTQuNTY1bDExOS44OTEtMjkuMDY5ICAgTDI3LjQ3MywzOTAuNTk3TDAuMyw1MTIuNjl6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" />

      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select Your Profile Pic</DialogTitle>
        <DialogContent>
          <DialogContentText style={{display:'flex' ,justifyContent:'center'}}>
           { Progressbar === 0?
           <div>
           <InputLabel htmlFor='fi'style={{color:'#3f51b5' ,textAlign:'center',cursor:'pointer', fontSize:'14px'}}>
             <img height='45px' width='45px' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMCwwKSI+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNDMyIDBoLTM1MmMtNDQuMTEzMjgxIDAtODAgMzUuODg2NzE5LTgwIDgwdjI4MGMwIDQ0LjExMzI4MSAzNS44ODY3MTkgODAgODAgODBoMjczYzExLjA0Njg3NSAwIDIwLTguOTUzMTI1IDIwLTIwcy04Ljk1MzEyNS0yMC0yMC0yMGgtNzMuNjY0MDYybC00NS45ODQzNzYtNTkuNjU2MjUgMTQ1LjcyMjY1Ny0xODUuMzQ3NjU2IDk4LjA5NzY1NiAxMDguNDIxODc1YzUuNTQ2ODc1IDYuMTM2NzE5IDE0LjMwMDc4MSA4LjIxODc1IDIyLjAxOTUzMSA1LjI0NjA5MyA3LjcxNDg0NC0yLjk3NjU2MiAxMi44MDg1OTQtMTAuMzk0NTMxIDEyLjgwODU5NC0xOC42NjQwNjJ2LTE3MGMwLTQ0LjExMzI4MS0zNS44ODY3MTktODAtODAtODB6bTQwIDE5OC4wODU5MzgtNzkuMTY3OTY5LTg3LjUwMzkwN2MtMy45NTMxMjUtNC4zNzEwOTMtOS42NDA2MjUtNi43ODUxNTYtMTUuNTIzNDM3LTYuNTcwMzEyLTUuODg2NzE5LjIwNzAzMS0xMS4zODY3MTkgMi45OTYwOTMtMTUuMDMxMjUgNy42Mjg5MDZsLTE1NC4xMTcxODggMTk2LjAyMzQzNy01Mi4zMjAzMTItNjcuODc1Yy0zLjc4NTE1Ni00LjkxMDE1Ni05LjYzNjcxOS03Ljc4OTA2Mi0xNS44Mzk4NDQtNy43ODkwNjItLjAwMzkwNiAwLS4wMDc4MTIgMC0uMDExNzE5IDAtNi4yMDMxMjUuMDAzOTA2LTEyLjA1ODU5MyAyLjg4NjcxOS0xNS44Mzk4NDMgNy44MDQ2ODhsLTQ0LjAxNTYyNiA1Ny4yMTg3NWMtNi43MzQzNzQgOC43NTc4MTItNS4wOTc2NTYgMjEuMzEyNSAzLjY1NjI1IDI4LjA0Njg3NCA4Ljc1NzgxMyA2LjczODI4MiAyMS4zMTI1IDUuMDk3NjU3IDI4LjA1MDc4Mi0zLjY1NjI1bDI4LjE3NTc4MS0zNi42MzI4MTIgODguODE2NDA2IDExNS4yMTg3NWgtMTQ4LjgzMjAzMWMtMjIuMDU0Njg4IDAtNDAtMTcuOTQ1MzEyLTQwLTQwdi0yODBjMC0yMi4wNTQ2ODggMTcuOTQ1MzEyLTQwIDQwLTQwaDM1MmMyMi4wNTQ2ODggMCA0MCAxNy45NDUzMTIgNDAgNDB6bTAgMCIgZmlsbD0iI2Y1MDA1NyIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTE0MCA3MmMtMzMuMDg1OTM4IDAtNjAgMjYuOTE0MDYyLTYwIDYwczI2LjkxNDA2MiA2MCA2MCA2MCA2MC0yNi45MTQwNjIgNjAtNjAtMjYuOTE0MDYyLTYwLTYwLTYwem0wIDgwYy0xMS4wMjczNDQgMC0yMC04Ljk3MjY1Ni0yMC0yMHM4Ljk3MjY1Ni0yMCAyMC0yMCAyMCA4Ljk3MjY1NiAyMCAyMC04Ljk3MjY1NiAyMC0yMCAyMHptMCAwIiBmaWxsPSIjZjUwMDU3IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNDY4LjQ3NjU2MiAzMDIuOTQxNDA2Yy0uMDU4NTkzLS4wNTg1OTQtLjExNzE4Ny0uMTIxMDk0LS4xNzU3ODEtLjE3OTY4Ny05LjQ1MzEyNS05LjUxOTUzMS0yMi4wMjczNDMtMTQuNzYxNzE5LTM1LjQxMDE1Ni0xNC43NjE3MTktMTMuMzQzNzUgMC0yNS44ODI4MTMgNS4yMTA5MzgtMzUuMzI0MjE5IDE0LjY3NTc4MWwtMzguNjEzMjgxIDM4LjA4NTkzOGMtNy44NjMyODEgNy43NTM5MDYtNy45NDkyMTkgMjAuNDE3OTY5LS4xOTE0MDYgMjguMjgxMjUgNy43NTM5MDYgNy44NjMyODEgMjAuNDE3OTY5IDcuOTUzMTI1IDI4LjI4MTI1LjE5NTMxMmwyNS44NDc2NTYtMjUuNDkyMTg3djExMi4yNTM5MDZjMCAxMS4wNDY4NzUgOC45NTMxMjUgMjAgMjAgMjBzMjAtOC45NTMxMjUgMjAtMjB2LTExMS42NDQ1MzFsMjQuNzM4MjgxIDI1LjU1NDY4N2MzLjkyMTg3NSA0LjA1NDY4OCA5LjE0NDUzMiA2LjA4OTg0NCAxNC4zNzEwOTQgNi4wODk4NDQgNS4wMTE3MTkgMCAxMC4wMjczNDQtMS44NzEwOTQgMTMuOTEwMTU2LTUuNjI4OTA2IDcuOTM3NS03LjY4MzU5NCA4LjE0MDYyNS0yMC4zNDM3NS40NTcwMzItMjguMjgxMjV6bTAgMCIgZmlsbD0iI2Y1MDA1NyIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4=" /></InputLabel>
              <h6 style={{margin:'0',cursor:'pointer'}}>click to select image</h6>
           <Input
           id='fi' 
           style= {{display:'none'}} 
           type='file'
            onChange={onChangeHandler}
            ref ={inputRef}
            />
            </div>
            :<Progress Complete={Progressbar}></Progress> }
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>CANCEL</Button>
          <Button onClick={submit} disabled = { file ===null?true:false} color='primary'>SUBMIT</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}


// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';
// import { Input } from '@material-ui/core';

// export default function ResponsiveDialog() {
//   const [open, setOpen] = React.useState(false);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button  onClick={handleClickOpen}>
//       <img style={{height:'20px' ,width:'20px'}} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUyOC44OTkgNTI4Ljg5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDApIj4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGQ9Ik0zMjguODgzLDg5LjEyNWwxMDcuNTksMTA3LjU4OWwtMjcyLjM0LDI3Mi4zNEw1Ni42MDQsMzYxLjQ2NUwzMjguODgzLDg5LjEyNXogTTUxOC4xMTMsNjMuMTc3bC00Ny45ODEtNDcuOTgxICAgYy0xOC41NDMtMTguNTQzLTQ4LjY1My0xOC41NDMtNjcuMjU5LDBsLTQ1Ljk2MSw0NS45NjFsMTA3LjU5LDEwNy41OWw1My42MTEtNTMuNjExICAgQzUzMi40OTUsMTAwLjc1Myw1MzIuNDk1LDc3LjU1OSw1MTguMTEzLDYzLjE3N3ogTTAuMyw1MTIuNjljLTEuOTU4LDguODEyLDUuOTk4LDE2LjcwOCwxNC44MTEsMTQuNTY1bDExOS44OTEtMjkuMDY5ICAgTDI3LjQ3MywzOTAuNTk3TDAuMyw1MTIuNjl6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" />
//       </Button>
//       <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">{"Select Picture"}</DialogTitle>
        
//         <DialogActions >
//          <Input type='file' onChange={this.onChangeHandler}></Input>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
