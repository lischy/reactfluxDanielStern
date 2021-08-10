/* eslint-disable import/prefer-default-export */
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles({
    navContainer:{
        display:"flex"
    },
    dashBoardLink:{
        flex:1
    }
})
const Navigation = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const classes = useStyles()
    return(
        isLoading?
        <div>Loading...</div>
        :(
            isAuthenticated ? 
                <div className={classes.navContainer}>
                    <Link to ="/dashboard" className={classes.dashBoardLink}>
                        <h1>
                            Dashboard
                        </h1>
                    </Link>

                    <LogoutButton /> 
                </div>:
                <div className={classes.navContainer}>
                    <Typography className={classes.dashBoardLink}>Login to access the dashboard</Typography>
                    <LoginButton />
                </div>
        )
)};
export const ConnectedNavigation = connect(state=>state)(Navigation)