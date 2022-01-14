import React, { useState } from "react";
import PopUp from "../PopUp";
import ClaimForm from "./components/ClaimForm";
import PropTypes from "prop-types";

const Modal = ({ showModal, setShowModal, clickedId }) => {
  return (
    <PopUp showModal={showModal} setShowModal={setShowModal} title="CLAIM">
      <ClaimForm setShowModal={setShowModal} clickedId={clickedId} />
    </PopUp>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default Modal;
