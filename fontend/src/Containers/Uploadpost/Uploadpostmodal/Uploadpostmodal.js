import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import classes from "../Uploadpostmodal/Uploadpostmodal.module.css";
import axios from "../../../Components/hoc/axios"
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [file, setfile] = React.useState(null);
  const[filetype, setfiletype] = React.useState("null");
  const[caption , setcaption ] = React.useState("");
  // const [tempfile, settempfile] = React.useState(
  //   "https://static.remove.bg/remove-bg-web/2a274ebbb5879d870a69caae33d94388a88e0e35/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg"
  // );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setfile(null);
    setfiletype("null");
    setOpen(false);
  };

   const onChangeHandler=(event) =>{
         setfile(event.target.files[0]);
         if(event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/jpg")
         setfiletype("image");
         else if(event.target.files[0].type === "application/pdf")
         setfiletype("document");
         console.log(event.target.files[0].type)
    }
    const captionchangeHandler =(event) =>{
      setcaption(event.target.value);
    }

  const submit = () => {
    let fd = new FormData();
    //console.log(file);
    var filedata = file;
    //console.log(filedata);
    //console.log(filetype)
    fd.append("file",filedata,filedata.name);
    fd.append("caption" , caption);
    const username = localStorage.getItem("username");
    axios.post(
      "/uploadPost/file/" +
        username +
        "/" +
        filetype,
      fd,
      {
        onUploadProgress: (progressEvent) => {
          console.log(
            "upload Progress" +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
          // console.log(String(Math.round((progressEvent.loaded/progressEvent.total) *100)));
        },
      }
    )
      .then((response) => {
        console.log(response);
         props.onpostupload();
         handleClose();
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //console.log(file);
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{
          height: "40px",
          width: "100%",
          borderRadius: "25px",
          padding: "0px",
        }}
      >
        {props.display}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.title}>
          <h2>Create a post</h2>

          <button onClick={handleClose} className={classes.button}>
            <img
              alt="user img"
              height="20px"
              width="20px"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMi4wMDEgNTEyLjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjg0LjI4NiwyNTYuMDAyTDUwNi4xNDMsMzQuMTQ0YzcuODExLTcuODExLDcuODExLTIwLjQ3NSwwLTI4LjI4NWMtNy44MTEtNy44MS0yMC40NzUtNy44MTEtMjguMjg1LDBMMjU2LDIyNy43MTcgICAgTDM0LjE0Myw1Ljg1OWMtNy44MTEtNy44MTEtMjAuNDc1LTcuODExLTI4LjI4NSwwYy03LjgxLDcuODExLTcuODExLDIwLjQ3NSwwLDI4LjI4NWwyMjEuODU3LDIyMS44NTdMNS44NTgsNDc3Ljg1OSAgICBjLTcuODExLDcuODExLTcuODExLDIwLjQ3NSwwLDI4LjI4NWMzLjkwNSwzLjkwNSw5LjAyNCw1Ljg1NywxNC4xNDMsNS44NTdjNS4xMTksMCwxMC4yMzctMS45NTIsMTQuMTQzLTUuODU3TDI1NiwyODQuMjg3ICAgIGwyMjEuODU3LDIyMS44NTdjMy45MDUsMy45MDUsOS4wMjQsNS44NTcsMTQuMTQzLDUuODU3czEwLjIzNy0xLjk1MiwxNC4xNDMtNS44NTdjNy44MTEtNy44MTEsNy44MTEtMjAuNDc1LDAtMjguMjg1ICAgIEwyODQuMjg2LDI1Ni4wMDJ6IiBmaWxsPSIjNjY2NjY2IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
            />
          </button>
        </div>
        <DialogContent>
          <div className={classes.user}>
            <h4>Manas Saxena</h4>
          </div>
          <div className={classes.content}>
            <textarea
              name="caption"
              placeholder="What do you want to talk about?"
              rows="4"
              className={classes.caption}
              value={caption}
              onChange={captionchangeHandler}
            ></textarea>
          </div>
          <div>
            {file === null ? (
              <p></p>
            ) : (
              <h6 className={classes.file}>Added file : {file.name}</h6>
            )}
            {/* <h6 className={classes.file}>hello</h6> */}
          </div>
          <div className={classes.post}>
            <div className={classes.adddocument}>
              <label
                style={{ cursor: filetype !== "null" ? "no-drop" : "pointer" }}
                htmlFor="image"
              >
                <div>
                  <img
                    height="25px"
                    width="25px"
                    alt="img"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDU1MC44MDEgNTUwLjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPHBhdGggZD0iTTUxNS44MjgsNjEuMjAxSDM0Ljk3MkMxNS42NTksNjEuMjAxLDAsNzYuODU5LDAsOTYuMTcydjM1OC40NThDMCw0NzMuOTQyLDE1LjY1OSw0ODkuNiwzNC45NzIsNDg5LjZoNDgwLjg1NiAgIGMxOS4zMTQsMCwzNC45NzMtMTUuNjU4LDM0Ljk3My0zNC45NzFWOTYuMTcyQzU1MC44MDEsNzYuODU5LDUzNS4xNDMsNjEuMjAxLDUxNS44MjgsNjEuMjAxeiBNNTE1LjgyOCw5Ni4xNzJWMzUwLjUxbC02OC45Mi02Mi42NiAgIGMtMTAuMzU5LTkuNDE2LTI2LjI4OS05LjA0LTM2LjE4NiwwLjg2NmwtNjkuNzUyLDY5Ljc0MUwyMDMuNDM4LDE5NC4xNzljLTEwLjM5Ni0xMi40MTUtMjkuNDM4LTEyLjUzNy0zOS45OS0wLjI3MUwzNC45NzIsMzQzLjIxOSAgIFY5Ni4xNzJINTE1LjgyOHogTTM2Ny4yMDEsMTg3Ljk3MmMwLTI2LjU2MSwyMS41MjMtNDguMDg2LDQ4LjA4NC00OC4wODZjMjYuNTYyLDAsNDguMDg2LDIxLjUyNSw0OC4wODYsNDguMDg2ICAgYzAsMjYuNTYxLTIxLjUyMyw0OC4wODUtNDguMDg2LDQ4LjA4NUMzODguNzI1LDIzNi4wNTgsMzY3LjIwMSwyMTQuNTMzLDM2Ny4yMDEsMTg3Ljk3MnoiIGZpbGw9IiM3MGI1ZjkiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
                  />
                  <h4>Photo</h4>
                </div>
              </label>
              <input
                type="file"
                onChange={onChangeHandler}
                style={{ display: "none" }}
                disabled={filetype !== "null" ? true : false}
                name="file"
                accept=".jpeg,.png,jpg"
                id="image"
              ></input>

              <label
                style={{ cursor: filetype !== "null" ? "no-drop" : "pointer" }}
                htmlFor="document"
              >
                <div>
                  {/* style={{ cursor: true?'no-drop':'pointer'}} */}
                  <img
                    height="25px"
                    width="25px"
                    alt="img"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDU1MC44MDEgNTUwLjgwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNMTYwLjM4MSwyODIuMjI1YzAtMTQuODMyLTEwLjI5OS0yMy42ODQtMjguNDc0LTIzLjY4NGMtNy40MTQsMC0xMi40MzcsMC43MTUtMTUuMDcxLDEuNDMyVjMwNy42ICAgYzMuMTE0LDAuNzA3LDYuOTQyLDAuOTQ5LDEyLjE5MiwwLjk0OUMxNDguNDE5LDMwOC41NDksMTYwLjM4MSwyOTguNzQsMTYwLjM4MSwyODIuMjI1eiIgZmlsbD0iI2U3YTMzZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPgoJPHBhdGggZD0iTTI3Mi44NzUsMjU5LjAxOWMtOC4xNDUsMC0xMy4zOTcsMC43MTctMTYuNTE5LDEuNDM1djEwNS41MjNjMy4xMTYsMC43MjksOC4xNDIsMC43MjksMTIuNjksMC43MjkgICBjMzMuMDE3LDAuMjMxLDU0LjU1NC0xNy45NDYsNTQuNTU0LTU2LjQ3NEMzMjMuODQyLDI3Ni43MTksMzA0LjIxNSwyNTkuMDE5LDI3Mi44NzUsMjU5LjAxOXoiIGZpbGw9IiNlN2EzM2UiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTxwYXRoIGQ9Ik00ODguNDI2LDE5Ny4wMTlINDc1LjJ2LTYzLjgxNmMwLTAuMzk4LTAuMDYzLTAuNzk5LTAuMTE2LTEuMjAyYy0wLjAyMS0yLjUzNC0wLjgyNy01LjAyMy0yLjU2Mi02Ljk5NUwzNjYuMzI1LDMuNjk0ICAgYy0wLjAzMi0wLjAzMS0wLjA2My0wLjA0Mi0wLjA4NS0wLjA3NmMtMC42MzMtMC43MDctMS4zNzEtMS4yOTUtMi4xNTEtMS44MDRjLTAuMjMxLTAuMTU1LTAuNDY0LTAuMjg1LTAuNzA2LTAuNDE5ICAgYy0wLjY3Ni0wLjM2OS0xLjM5My0wLjY3NS0yLjEzMS0wLjg5NmMtMC4yLTAuMDU2LTAuMzgtMC4xMzgtMC41OC0wLjE5QzM1OS44NywwLjExOSwzNTkuMDM3LDAsMzU4LjE5MywwSDk3LjIgICBjLTExLjkxOCwwLTIxLjYsOS42OTMtMjEuNiwyMS42MDF2MTc1LjQxM0g2Mi4zNzdjLTE3LjA0OSwwLTMwLjg3MywxMy44MTgtMzAuODczLDMwLjg3M3YxNjAuNTQ1ICAgYzAsMTcuMDQzLDEzLjgyNCwzMC44NywzMC44NzMsMzAuODdoMTMuMjI0VjUyOS4yYzAsMTEuOTA3LDkuNjgyLDIxLjYwMSwyMS42LDIxLjYwMWgzNTYuNGMxMS45MDcsMCwyMS42LTkuNjkzLDIxLjYtMjEuNjAxICAgVjQxOS4zMDJoMTMuMjI2YzE3LjA0NCwwLDMwLjg3MS0xMy44MjcsMzAuODcxLTMwLjg3di0xNjAuNTRDNTE5LjI5NywyMTAuODM4LDUwNS40NywxOTcuMDE5LDQ4OC40MjYsMTk3LjAxOXogTTk3LjIsMjEuNjA1ICAgaDI1MC4xOTN2MTEwLjUxM2MwLDUuOTY3LDQuODQxLDEwLjgsMTAuOCwxMC44aDk1LjQwN3Y1NC4xMDhIOTcuMlYyMS42MDV6IE0zNjIuMzU5LDMwOS4wMjNjMCwzMC44NzYtMTEuMjQzLDUyLjE2NS0yNi44Miw2NS4zMzMgICBjLTE2Ljk3MSwxNC4xMTctNDIuODIsMjAuODE0LTc0LjM5NiwyMC44MTRjLTE4LjksMC0zMi4yOTctMS4xOTctNDEuNDAxLTIuMzg5VjIzNC4zNjVjMTMuMzk5LTIuMTQ5LDMwLjg3OC0zLjM0Niw0OS4zMDQtMy4zNDYgICBjMzAuNjEyLDAsNTAuNDc4LDUuNTA4LDY2LjAzOSwxNy4yMjZDMzUxLjgyOCwyNjAuNjksMzYyLjM1OSwyODAuNTQ3LDM2Mi4zNTksMzA5LjAyM3ogTTgwLjcsMzkzLjQ5OVYyMzQuMzY1ICAgYzExLjI0MS0xLjkwNCwyNy4wNDItMy4zNDYsNDkuMjk2LTMuMzQ2YzIyLjQ5MSwwLDM4LjUyNyw0LjMwOCw0OS4yOTEsMTIuOTI4YzEwLjI5Miw4LjEzMSwxNy4yMTUsMjEuNTM0LDE3LjIxNSwzNy4zMjggICBjMCwxNS43OTktNS4yNSwyOS4xOTgtMTQuODI5LDM4LjI4NWMtMTIuNDQyLDExLjcyOC0zMC44NjUsMTYuOTk2LTUyLjQwNywxNi45OTZjLTQuNzc4LDAtOS4xLTAuMjQzLTEyLjQzNS0wLjcyM3Y1Ny42N0g4MC43ICAgVjM5My40OTl6IE00NTMuNjAxLDUyMy4zNTNIOTcuMlY0MTkuMzAyaDM1Ni40VjUyMy4zNTN6IE00ODQuODk4LDI2Mi4xMjdoLTYxLjk4OXYzNi44NTFoNTcuOTEzdjI5LjY3NGgtNTcuOTEzdjY0Ljg0OGgtMzYuNTkzICAgVjIzMi4yMTZoOTguNTgyVjI2Mi4xMjd6IiBmaWxsPSIjZTdhMzNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                  />
                  <h4>Document</h4>
                </div>
              </label>
              <input
                style={{ display: "none" }}
                accept=".pdf,.doc"
                name="file"
                onChange={onChangeHandler}
                disabled={filetype !== "null" ? true : false}
                type="file"
                id="document"
              ></input>
            </div>
            <div>
              <Button onClick={submit} color="primary">
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
