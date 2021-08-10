import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { connect } from "react-redux";
import * as Yup from 'yup';
import { requestTaskCreation, updateTask } from "../store/mutations";
import SelectFormik from './SelectFormik';

const statusOptions = [
    { key: 1, value: true,label:"Complete"},
    { key: 2, value: false,label: "Open"}
  ];
const NewTodoDialog = ({groupId,dialogOpen,onCancel,groups,taskEdit,CreateNewTask,ModifyTask}) => {
    const groupsOption = []
    groups?.map((group,index)=>{
        groupsOption.push({key:index,value:group?._id,label:group?.name})
    })

    const {user}= useAuth0();
    const [showCloseBtn, setShowCloseBtn] = useState(false)
    return (
        <Dialog
        open={dialogOpen}
        onClose={onCancel}
        >
            <DialogTitle>{taskEdit?._id?"Edit Item" :"Add Item" }</DialogTitle>
            <DialogContent>
                <DialogContentText>{taskEdit?._id?"Edit Existing Task":"Add a New Task"}</DialogContentText>
                <Formik
                initialValues = {{
                    group:taskEdit?.group||groupId,
                    status:taskEdit?.status||false ,
                    title:taskEdit?.name || "",
                    comment:taskEdit?.comment||""
                }}
                validationSchema = {Yup.object({
                    comment: Yup.string().required("Comment is required"),
                    title: Yup.string().required("Provide a title "),
                    group: Yup.string().required("Please Select a group")
                })}
                onSubmit={async(values,{setSubmitting,resetForm})=>{
                    console.log(values)
                    setSubmitting(true)
                    let response = null;
                    if(taskEdit._id){
                         response = await ModifyTask(
                            values.group,
                            values.title,
                            values.comment,
                            values.status,
                            user?.sub,
                            taskEdit?._id
                        );
                    }else{
                         response = await CreateNewTask(
                            values.group,
                            values.title,
                            values.comment,
                            values.status,
                            user?.sub
                        );
                    }
                   
                    console.log(response);
                    setSubmitting(false);
                    resetForm({})
                    showCloseBtn(true);

                }}
                >
                {({isSubmitting,handleSubmit})=>(
                    <Form>
                        <Field type ="text" name="title">
                            {({field,form})=>(
                                form.errors.hasOwnProperty("title")&&
                                form.touched.hasOwnProperty("title")?(
                                    <TextField
                                    error
                                    {...field}
                                    placeholder="Task title"
                                    helperText={form.errors.title}
                                    fullWidth
                                    />
                                ):(
                                    <TextField
                                    {...field}
                                    placeholder="Task title"
                                    fullWidth
                                    />
                                )
                            )}
                        </Field>
                        <SelectFormik label="Status" name="status" options={statusOptions} />
                        <SelectFormik label="Group" name="group" options={groupsOption} />
                        <Field name='comment'>
                            {({field,form})=>(form.errors.hasOwnProperty("comments")&&
                                form.touched.hasOwnProperty("comments")?(
                                    <TextField
                                    error
                                    {...field}
                                    placeholder="Comment"
                                    helperText={form.errors.comments}
                                    fullWidth
                                    />
                                ):(
                                    <TextField
                                    {...field}
                                    placeholder="Comment"
                                    fullWidth
                                    />
                                ))}
                        </Field>
                        {!showCloseBtn?
                        (<DialogActions>
                            <Button type="reset" variant="contained" onClick={onCancel} color='secondary' >Cancel</Button>
                            <Button type="submit" disabled={isSubmitting} variant="contained" color='primary' onClick={handleSubmit}>{taskEdit._id?"Edit" :"Save"}</Button>
                        </DialogActions>
                        ):(<DialogActions>
                            <Button type="reset" variant="contained" onClick={onCancel} color='secondary' >Close</Button>
                        </DialogActions>
                        )}
                    </Form>
                )}
                </Formik>
                
            </DialogContent>
            {/* <DialogActions>
                <Button  color="secondary">Cancel</Button>
                <Button onClick={()=>console.log("Add task")} color="primary">Add</Button>
            </DialogActions> */}
        </Dialog>
    )
}
function mapStateToProps(state) {
    // whatever it returns becomes the props of the Dashoard.
    return {
      groups: state.groups
    };
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      CreateNewTask(groupID, name, comment,status,ownerID) {
        console.log("Creating new Task : ", groupID);
        dispatch(requestTaskCreation(groupID, name, comment,status,ownerID));
      },
      ModifyTask(groupID, name, comment,status,ownerID,taskID){
          dispatch(updateTask(groupID, name, comment,status,ownerID,taskID));
      }
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(NewTodoDialog)
