import React from "react";
import PropTypes from 'prop-types';
import "./Modal.css";
import Auxiliary from "./Auxiliary";
import Backdrop from "./Backdrop";

const Modal = (props) => (
  <Auxiliary>
    <Backdrop show={props.show} />
    <div
      className="Modal"
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    ></div>
  </Auxiliary>
);
 
export default Modal;
