import React, { useState } from 'react'
import "./todo.css";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import moment from 'moment';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

const TodoApp = () => {


    const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };



const [note, setNote] = useState("");

const [theDate, setTheDate] = useState(new Date().toISOString().slice(0,10));

const [theTime, setTheTime]=useState()

console.log("theTime: ", theTime);

const [todos, setTodos] = useState([{
    theText: "sample note",
    isDone: false,
    theDate: theDate,
    theTime: theTime && theTime
}]);


const setNoteValue = ()=>{

    if(!note) return
    addNotes(note, theDate, theTime);
    setNote("");
}


const addNotes = (theText, theDate)=>{

    setTodos([...todos, {theText, theDate, theTime}]);

}


    const isChecked = (index)=>{

        const newTodo = [...todos];
        newTodo[index].isDone = !newTodo[index].isDone;

        setTodos(newTodo);

    }

    const [editedValue, setEditedValue] = useState("");


    const [index, setIndex] = useState();

    const theUpdatebtn = ()=>{

        console.log("index: ", index);

        const newTodo = [...todos];
        newTodo[index].theText = editedValue;

        if(!editedValue) return
        setTodos(newTodo);

        setEditedValue("")
        setOpen(!open);
    }



    const editFunction = (index)=>{

        setIndex(index)

        setOpen(!open);
    }





  return (
    <div className='mainContainer'>


            <div className='mainContainer4'>
                <div>
                    <input type="text" value={note} onChange={(event)=> setNote(event.target.value) } className='todoText' />
                </div>

                <div className='theTime'>
                    <input type='time' style={{border:'1px solid silver', color:'blue', borderRadius:'4px'}} value={theTime} onChange={(e)=>{ setTheTime(e.currentTarget.value) }} />
                </div>

                <div className='theDate'>
                    <input type="date" style={{border:'1px solid silver', color:'blue', borderRadius:'4px'}} value={theDate} onChange={(e)=>{setTheDate(e.target.value)}}/>
                </div>

                
                
                <div>
                    <button className='todoAddButton' onClick={()=>{setNoteValue()}}>ADD</button>
                </div>
            </div>

        <div className='mainContainer3'>
            
            
            {
                todos && todos.map( (res, index)=>{

                    
                    return(
                         <div className='bodyContainer' key={index}>
                            <div>
                                <input type="checkbox" onClick={ ()=> isChecked(index)}/>
                                <label style={todos[index].isDone === true ? {marginLeft: '10px', color: 'white', textDecoration: "line-through",textDecorationColor: 'red'} : {marginLeft: '10px', color: 'white', textDecoration:'none'}}>{res.theText}</label>
                            </div>

                            <div>
                                <p style={todos[index].isDone === true ? {color:'grey'} : {color:'blue'}}>{res.theTime && res.theTime}</p>
                            </div>


                            <div>
                                <p style={todos[index].isDone === true ? {color:'grey'} : {color:'blue'}}>{res.theDate && moment(res.theDate).format('DD-MM-YYYY')}</p>
                            </div>
                            
                            {
                                todos[index].isDone === true ? <label style={{color:'green', marginLeft:'70px'}}>completed</label> 

                            
                                                            : 
                            
                                                            <label style={{color:'red', marginLeft:'70px'}}>pending</label>
                                        }

                                        <div style={todos[index].isDone === true ? {cursor:'not-allowed', opacity:'0.5'} : {cursor:'pointer'}}>
                                            <button className='editButton' style={todos[index].isDone === true ? {pointerEvents: 'none', width:'40px'} : {pointerEvents: 'auto', width:'40px'}}   onClick={()=> editFunction(index)}>Edit</button> 
                                        </div>


                        </div>
                        
                        )
                }) 
            }
                
                

            </div>



            <div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    
                    <DialogContent>
                    
                        <input type="text" value={editedValue} onChange={ (event)=>{ setEditedValue(event.target.value)}}/>

                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={()=> {theUpdatebtn()}}>
                        Update
                    </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
    </div>
  )
}

export default TodoApp