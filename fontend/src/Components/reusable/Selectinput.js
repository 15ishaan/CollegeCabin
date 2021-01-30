import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


const BootstrapInput = withStyles((theme) => ({
  input: {
      color:'grey',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '0.2px solid black',
    fontSize: 16,
    height:'35px',
     padding: '0 20px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


export default function CustomizedSelects(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  
  const handleChange = (event) => {
    setAge(event.target.value);
    props.changed(event);
  };
  return (
    
    
      <FormControl className={classes.margin} variant='outlined'>
        <InputLabel style={{paddingLeft:'20px',paddingTop:'8px',fontSize:'16px'}} htmlFor="demo-customized-select-native">{props.labelname}</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
          name={props.name}
          required
        >
          <option aria-label="None" value="" />
          {/* <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option> */}
          {
         
            props.menulist.map((item,i) => <option key={i}>{item}</option>)
          
          }
        </NativeSelect>
      </FormControl>
    
  );
}
