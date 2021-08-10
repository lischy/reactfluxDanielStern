import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { ConnnectedTaskList } from "./TaskList";

export const Dashboard = ({ getuserTasks, groups }) =>{
  const{user,isAuthenticated} = useAuth0();
  // useEffect(async() => {
  //   try {
  //     const response = await Axios.get('someur');
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])
  useEffect(() => {
    if(isAuthenticated){
      getuserTasks(user)
    }
  }, [])
  return(
    <>
      <h2>Dashboard</h2>
      {console.log(groups)}
      <div className="row">
        {groups && groups.map((group) => (
          <ConnnectedTaskList
            key={group._id}
            id={group._id}
            name={group.name}
            className="col-sm"
          />
        ))}
      </div>
    </>
  )};
// connnect , mapsateToProps to select part of the data from the store.
function mapStateToProps(state) {
  // whatever it returns becomes the props of the Dashoard.
  return {
    groups: state.groups
  };
}
const mapDispatchToProps = (dispatch) => ({
  getuserTasks(user) {
    console.log(user)
    const userId = user.sub;
    dispatch(mutations.getUserTasks(userId));
  }
});
// react component + matchStateToProps = connectedComponent
export const ConnectedDashboard = connect(mapStateToProps,mapDispatchToProps)(Dashboard); // react-redux component
