import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const Navigaation = () => (
    <div>
        <Link to ="/dashboard">
            <h1>
                My App
            </h1>
        </Link>
    </div>
);
export const ConnectedNavigation = connect(state=>state)(Navigaation)