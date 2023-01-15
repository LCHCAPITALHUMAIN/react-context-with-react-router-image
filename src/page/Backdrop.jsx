import React from "react";
import PropTypes from 'prop-types';
import "./Backdrop.css";

const Backdrop = (props)=> 
props.show ? <div className="Backdrop" onClick={props.click} /> : null;
 
export default Backdrop;
