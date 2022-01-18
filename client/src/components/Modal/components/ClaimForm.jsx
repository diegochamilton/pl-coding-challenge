import React, { useState } from "react";
import PropTypes from "prop-types";
import { GrBitcoin } from "react-icons/gr";
import { sendClaim } from "../../../api/claims.js";
import useApi from "../../../hooks/useApi";
import styles from "./claimform.module.scss";
import { ethers } from "ethers";

const ClaimForm = ({ setShowModal, clickedId }) => {
  const { data, error, isLoading, setError, callApi } = useApi(null, true);
  const [ethAddress, setEthAddress] = useState("");

  const handleClick = async () => {
    const isValidAddress = await ethers.utils.isAddress(ethAddress);
    if (isValidAddress) {
      await callApi(sendClaim, { claimId: clickedId, address: ethAddress });
    } else {
      setError("Invalid etherum address. Please try again");
      return;
    }
    setShowModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <GrBitcoin className={styles.icon} />
      <div className={styles.modalSection}>
        <label>Transfer To</label>
        <input
          value={ethAddress}
          onChange={(e) => {
            setEthAddress(e.target.value);
          }}
        ></input>
        {error && <span className={styles.error}>{error}</span>}
      </div>
      <div className={styles.modalSection}>
        <button className={styles.claim} onClick={handleClick}>
          Claim
        </button>
        <button
          className={styles.back}
          onClick={() => {
            setShowModal(false);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

ClaimForm.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  clickedId: PropTypes.number,
};

export default ClaimForm;
