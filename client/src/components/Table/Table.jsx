import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { getClaims } from "../../api/claims.js";
import Modal from "../Modal";
import styles from "./table.module.scss";
import Loading from "../Loading";
import { BiDownvote as Down } from "react-icons/bi";
import { BiUpvote as Up } from "react-icons/bi";

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
      <MobileCard data={data} setShowModal={setShowModal} />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        clickedId={clickedId}
      />
    </div>
  );
};

const MobileCard = ({ data, setShowModal }) => {
  return (
    <div className={styles.cardWrapper}>
      {data.map((field, i) => {
        return (
          <div className={styles.card} key={i}>
            <div className={styles.row}>
              <div className={styles.header}>
                <span className={styles.rank}>
                  {field.weeklyRank > 50 ? (
                    <Up style={{ color: "green" }} />
                  ) : (
                    <Down style={{ color: "red" }} />
                  )}
                  Level {field.weeklyRank}
                </span>
                <p className={styles.title}>Some Activity</p>
              </div>
              <div>
                <span className={styles.title}>
                  {field.rewardTokenEarned} {field.rewardToken}
                </span>
                {"  "}
                <span>${field.usdTotal.toLocaleString("en-US")}</span>
              </div>
            </div>
            <div className={styles.row}>
              <div>
                {field.unclaimedAmount} / {field.totalClaimed} claimed
              </div>
              <div>
                <button
                  className={styles.claimButton}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
