import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { getClaims } from "../../api/claims.js";
import Modal from "../Modal";
import styles from "./table.module.scss";
import Loading from "../Loading";

const Table = () => {
  const [showModal, setShowModal] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const { data, error, callApi, isLoading } = useApi([], true);

  useEffect(() => {
    callApi(getClaims);
  }, []);

  const headerFields = [
    "YOUR EARNINGS",
    "REWARD",
    "UNCLAIMED",
    "TOTAL CLAIMED",
    "XYZ EARNED",
    "TOTAL (USD)",
    "WEEKLY RANK",
  ];

  if (isLoading) return <Loading />;
  if (data.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <div className={`${styles.tableRow} ${styles.head}`}>
          {headerFields.map((field, i) => {
            return (
              <div key={i} className={styles.fieldWrapper}>
                <div
                  className={
                    i >= 1 && i < headerFields.length - 1
                      ? styles.fieldContent
                      : ""
                  }
                >
                  {field}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.tableBody}>
          {data.map((field, i) => {
            return (
              <div
                key={`field_${i}`}
                className={`${styles.tableRow} ${styles.body}`}
              >
                <div className={styles.buttonField}>
                  <button
                    className={styles.claimButton}
                    onClick={() => {
                      setShowModal(true);
                      setClickedId(field.claimId);
                    }}
                  >
                    Claim
                  </button>
                  <span style={{ paddingLeft: "20px" }}>Some Activity</span>
                </div>
                {Object.keys(field).map((key, i) => {
                  if (i === 0) return;
                  return (
                    <div className={styles.fieldWrapper} key={i}>
                      <div
                        className={
                          i < Object.keys(field).length - 1
                            ? styles.fieldContent
                            : ""
                        }
                      >
                        {i === 5 && "$"}
                        {field[key].toLocaleString("en-US")}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        clickedId={clickedId}
      />
    </div>
  );
};

export default Table;
