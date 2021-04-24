import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classes from "../Detailsform/Detailsform.module.css";
import axios from '../../Components/hoc/axios'
import Select from '../../Components/reusable/Selectinput';
class details extends Component {
  state = {
    collegeName: "",
    branch: "",
    semester: "",
    gender: "",
    dob: "",
    bio: "",
    componentcollegename:{
      label:'College Name*',
      name:"collegeName",
      menu:["Ajay Kumar Garg Engineering College" , "Krishna Institute of Information Technology" ,"JSS Acandemy of Technical Education", "Institue of Engineering and Technology" , "ABES Institue of Technology"]
    },
    componentbranchname:{
      label:"Branch Name*",
      name:"branch",
      menu:["Computer Science","Information Technology","Electronics and Communication","Electrical","Mechanical","Civil"],
    },
    componentyearname:{
      label:"Semester*",
      name:"semester",
      menu:["1st" , "2nd" , "3rd" , "4th","5th","6th","7th","8th"]
    }

  };
  submit = (e) => {
    
        e.preventDefault();
    
      const Data = {
        collegeName:this.state.collegeName,
        branch:this.state.branch,
        sem:this.state.semester,
        gender:this.state.gender,
        birthdate:this.state.dob,
        bio:this.state.bio,
        username:localStorage.getItem("username")
      };
      console.log(Data);
      axios.post("/UserDetails",Data,{
        onUploadProgress: ProgressEvent =>{
          console.log(ProgressEvent.loaded/ProgressEvent.total*100);
        }
      })
      .then((response) =>{

        console.log(response);
        this.props.history.push("/profile/"+localStorage.getItem("username"))
      })
      .catch((error)=>{
        console.log(error);
      })
      
    }
  
  onChangeHandler = (event) =>
  {
    let name = event.target.name;
    let value = event.target.value;
    
    this.setState({
      [name]:value
    })
    
  }
    
  

  // validate =() =>{

  //   if(this.state.semester >=5)
  //   {
  //     console.log("enter valid semester");
  //   }
  // }
  render() {
   
    return (
      <div className={classes.Form}>
        <div className={classes.Avtar}>
          <img
          alt='img'
            style={{ height: "50x", width: "50px" }}
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxjaXJjbGUgcj0iMjU2IiBjeD0iMjU2IiBjeT0iMjU2IiBmaWxsPSIjZjUwMDU3IiBzaGFwZT0iY2lyY2xlIj48L2NpcmNsZT48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjcsMCwwLDAuNywxMDYuODAwMDIyODg4MTgzNiw3Ni44MDAwMDAwMDAwMDAwMSkiPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQxNC4wMDcsMTQ4Ljc1YzUuNTIyLDAsMTAtNC40NzcsMTAtMTBWMzBjMC0xNi41NDItMTMuNDU4LTMwLTMwLTMwaC0zNjRjLTE2LjU0MiwwLTMwLDEzLjQ1OC0zMCwzMHY0NTIgICAgYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzJjMC01LjUyMy00LjQ3OC0xMC0xMC0xMGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMFY0ODIgICAgYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMGMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NSAgICBDNDA0LjAwNywxNDQuMjczLDQwOC40ODUsMTQ4Ljc1LDQxNC4wMDcsMTQ4Ljc1eiIgZmlsbD0iI2ZmZmRmZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjEyLjAwNyw1NGMtNTAuNzI5LDAtOTIsNDEuMjcxLTkyLDkyYzAsMjYuMzE3LDExLjExLDUwLjA4NSwyOC44ODIsNjYuODY5YzAuMzMzLDAuMzU2LDAuNjg3LDAuNjkzLDEuMDc0LDEgICAgYzE2LjM3MSwxNC45NzksMzguMTU4LDI0LjEzLDYyLjA0MywyNC4xM2MyMy44ODUsMCw0NS42NzItOS4xNTIsNjIuMDQzLTI0LjEzYzAuMzg3LTAuMzA3LDAuNzQxLTAuNjQ1LDEuMDc0LTEgICAgYzE3Ljc3NC0xNi43ODQsMjguODg0LTQwLjU1MiwyOC44ODQtNjYuODY5QzMwNC4wMDcsOTUuMjcxLDI2Mi43MzYsNTQsMjEyLjAwNyw1NHogTTIxMi4wMDcsMjE4ICAgIGMtMTYuMzI5LDAtMzEuMzk5LTUuNDcyLTQzLjQ5MS0xNC42NjhjOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyYzE4LjMwMSwwLDM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyICAgIEMyNDMuNDA1LDIxMi41MjgsMjI4LjMzNiwyMTgsMjEyLjAwNywyMTh6IE0xOTYuMDA3LDE0MnYtNi41YzAtOC44MjIsNy4xNzgtMTYsMTYtMTZzMTYsNy4xNzgsMTYsMTZ2Ni41YzAsOC44MjItNy4xNzgsMTYtMTYsMTYgICAgUzE5Ni4wMDcsMTUwLjgyMiwxOTYuMDA3LDE0MnogTTI2OS45NDcsMTg4LjY4M2MtNy4zNzUtMTAuOTM4LTE3LjU5Ni0xOS40NDUtMjkuNDYzLTI0LjY5N2M0LjcxLTYuMDg3LDcuNTIzLTEzLjcxMiw3LjUyMy0yMS45ODYgICAgdi02LjVjMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NiAgICBjLTExLjg2Nyw1LjI1Mi0yMi4wODgsMTMuNzU5LTI5LjQ2MywyNC42OTdjLTguODI5LTExLjk1My0xNC4wNi0yNi43MTYtMTQuMDYtNDIuNjgzYzAtMzkuNzAxLDMyLjI5OS03Miw3Mi03MnM3MiwzMi4yOTksNzIsNzIgICAgQzI4NC4wMDcsMTYxLjk2NywyNzguNzc2LDE3Ni43MywyNjkuOTQ3LDE4OC42ODN6IiBmaWxsPSIjZmZmZGZkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxnPgoJCTxwYXRoIGQ9Ik0yNjYuMDA3LDQzOGgtNTRjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoNTRjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDQzOCwyNjYuMDA3LDQzOHoiIGZpbGw9IiNmZmZkZmQiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6IiBmaWxsPSIjZmZmZGZkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxnPgoJCTxwYXRoIGQ9Ik0yNjYuMDA3LDMyNmgtMTQyYy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwaDE0MmM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksMzI2LDI2Ni4wMDcsMzI2eiIgZmlsbD0iI2ZmZmRmZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNODguMzY2LDI3Mi45M2MtMS44NTktMS44Ni00LjQzOS0yLjkzLTcuMDc5LTIuOTNjLTIuNjMxLDAtNS4yMTEsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3ICAgIHMxLjA2OSw1LjIxLDIuOTMsNy4wN2MxLjg3LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjEtMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDcgICAgUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiIGZpbGw9IiNmZmZkZmQiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTg4LjM2NiwzMjguOTNjLTEuODY5LTEuODYtNC40MzktMi45My03LjA3OS0yLjkzYy0yLjYzMSwwLTUuMiwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcgICAgczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNyAgICBTOTAuMjI3LDMzMC43OSw4OC4zNjYsMzI4LjkzeiIgZmlsbD0iI2ZmZmRmZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNODguMzY2LDM4NC45M2MtMS44NjktMS44Ni00LjQzOS0yLjkzLTcuMDc5LTIuOTNjLTIuNjMxLDAtNS4yLDEuMDctNy4wNywyLjkzYy0xLjg2LDEuODYtMi45Myw0LjQ0LTIuOTMsNy4wNyAgICBzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NTksMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMi0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNyAgICBTOTAuMjI3LDM4Ni43OSw4OC4zNjYsMzg0LjkzeiIgZmlsbD0iI2ZmZmRmZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjY2LjAwNywyNzBoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDI3MCwyNjYuMDA3LDI3MHoiIGZpbGw9IiNmZmZkZmQiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQ5MS4wMDIsMTMwLjMyYy05LjcxNS01LjYwOS0yMS4wMzMtNy4wOTktMzEuODcxLTQuMTk2Yy0xMC44MzYsMi45MDQtMTkuODk0LDkuODU0LTI1LjUwMiwxOS41NjlMMzA3Ljc4NywzNjMuNjU2ICAgIGMtMC42ODksMS4xOTUtMS4xMjUsMi41Mi0xLjI3OCwzLjg5MWwtOC44NTgsNzkuMzQ0Yy0wLjQ0LDMuOTQ4LDEuNDk4LDcuNzgzLDQuOTM4LDkuNzdjMS41NTMsMC44OTYsMy4yNzgsMS4zNCw0Ljk5OSwxLjM0ICAgIGMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMgICAgQzUxNy45NTQsMTY3LjYzOCw1MTEuMDU4LDE0MS45LDQ5MS4wMDIsMTMwLjMyeiBNMzIwLjA2Myw0MjYuMzk0bDQuNjI2LTQxLjQzMmwyOC45NDIsMTYuNzFMMzIwLjA2Myw0MjYuMzk0eiBNMzY4LjIxMywzODYuOTk2ICAgIGwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3MyAgICBjMi45MzgtNS4wODksNy42ODItOC43MjksMTMuMzU4LTEwLjI1YzUuNjc4LTEuNTIyLDExLjYwNi0wLjc0LDE2LjY5NCwyLjE5OGM1LjA4OSwyLjkzOCw4LjcyOSw3LjY4MiwxMC4yNSwxMy4zNTggICAgQzQ5Mi43NzIsMTY2LjY3NSw0OTEuOTkyLDE3Mi42MDQsNDg5LjA1NCwxNzcuNjkzeiIgZmlsbD0iI2ZmZmRmZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
          />

          <h3> User Details</h3>
        </div>
        <form className={classes.main}>
          
            {/* <input
              type="text"
              onChange={this.onChangeHandler}
              placeholder="College name*"
              value={this.state.collegeName}
              name="collegeName"
              required
            ></input> */}
            <div>
            <Select changed={this.onChangeHandler} menulist ={this.state.componentcollegename.menu} name={this.state.componentcollegename.name} labelname={this.state.componentcollegename.label}></Select>
          </div>
          <div>
            {/* <input
              type="text"
              onChange={this.onChangeHandler}
              placeholder="Branch*"
              value={this.state.branch}
              name="branch"
              required
            ></input> */}
            <Select changed={this.onChangeHandler} menulist ={this.state.componentbranchname.menu}  name={this.state.componentbranchname.name} labelname={this.state.componentbranchname.label}></Select>
          </div>
          <div>
            {/* <input
              type="text"
              onChange={this.onChangeHandler}
              placeholder="Semester"
              value={this.state.semester}
              name="semester"
              required
            ></input> */}
           <Select changed={this.onChangeHandler} menulist ={this.state.componentyearname.menu} name={this.state.componentyearname.name}labelname={this.state.componentyearname.label}></Select>
          </div>
          <p>Gender*</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft:'35px',
              width:'80%'
            }}
          >
            <div>
            <label>Male</label><br></br>
            <input
              style={{ height: "20px", width: "60px" }}
              type="radio"
              onChange={this.onChangeHandler}
              placeholder="Gender"
              value='Male'
              name="gender"
              required
            ></input>
            </div>
            <div>
            <label>Female</label><br></br>
            <input
              style={{ height: "20px", width: "60px" }}
              type="radio"
              onChange={this.onChangeHandler}
              placeholder="Gender"
              value='Female'
              name="gender"
              required
            ></input>
            </div>
            <div>
            <label>Other</label><br></br>
            <input
              style={{ height: "20px", width: "60px" }}
              type="radio"
              onChange={this.onChangeHandler}
              placeholder="Gender"
              value='Other'
              name="gender"
              required
            ></input>
            </div>
          </div>
          <div>
            <input
              style={{color:'grey'}}
              type="date"
              onChange={this.onChangeHandler}
              placeholder="Date of birth"
              value={this.state.dob}
              name="dob"
              required
            ></input>
          </div>
          <div>
            <input
              style={{color:'grey',height:'100px'}}
              type="text"
              onChange={this.onChangeHandler}
              placeholder="About yourself"
              value={this.state.bio}
              name="bio"
              required
            ></input>
          </div>

          <div style={{ height: "35px" ,marginTop:"50px" }}>
            <button onClick={this.submit} className={classes.Submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(details);
