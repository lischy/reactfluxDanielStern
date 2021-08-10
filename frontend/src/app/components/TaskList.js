import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from "@material-ui/core";
// import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import NewTodoDialog from "./NewTodoDialog";

const useStyles = makeStyles((theme)=>({
  fab: {
    position: 'relative',
    bottom: theme.spacing(4),
    right: theme.spacing(4)
}
}))
export const TaskList = ({ tasks, name, id, CreateNewTask }) =>{
const classes = useStyles();
const [taskEdit, setTaskEdit] = useState({});
  const {isAuthenticated} = useAuth0();
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleDialogOpen(e) {
    e.preventDefault();
    setTaskEdit({});
    setDialogOpen(true);
}
  function handleDialogCancel() {
    setDialogOpen(false);
}
function handleEdit(e,todo){
  e.preventDefault();
  setTaskEdit(todo)
  setDialogOpen(true);
}
  return (
  <div className="card p-2 m-2">
    <h3>{name}</h3>
    <div className="card p-2 m-2">
      {tasks && tasks.length>0 ? tasks.map((task) => {
        return(
        <>
          <div className="card mt-2 p-2">
            <Button onClick={(e)=> handleEdit(e,task)}>
            {task.name}
            </Button>
            </div>        
       </>
      )}):
      <>
      <div>No task, Add one </div>
      
      </>
      }
      <Fab
         onClick={(e) => handleDialogOpen(e)}
         // onClick={() => CreateNewTask(id)}
         color="primary"
       >
         <AddIcon />
       </Fab>
      
    </div>
   
    <NewTodoDialog dialogOpen={dialogOpen} onCancel={handleDialogCancel} groupId={id} taskEdit={taskEdit || null}/>
  </div>
)};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    CreateNewTask(id) {
      dispatch(requestTaskCreation(id));
    },
  };
};
const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: groupID,
    alltasks: state.tasks,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

export const ConnnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
