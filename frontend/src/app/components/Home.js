import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

const Home = ({getGroups}) => {
    useEffect(() => {
        getGroups();
    }, [])
    return (
        <div>
            <Typography>Home page, nothing to see here procced to dashboard.</Typography>
            <Typography> you can use, email : wayidi6180@100xbit.com and password: Mypass@0 to see my items</Typography>
            <Typography>
                {`This is a simple to do application.
                Basically it creates an item for specific logged in user.
                Users are authorized using auth0 which handles renewing of JSON
                WEB TOKENS (JWT) for users. User can only see his/her items.
                `}
            </Typography>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>({
    getGroups(){
        dispatch(mutations.getGroups())
    }
})

export default connect (null,mapDispatchToProps)(Home);
