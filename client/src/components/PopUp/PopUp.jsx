import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./pop-up.module.scss";

const PopUp = ({ showModal, setShowModal, title, children }) => {
  const ref = useRef();

  const handleOverlayClick = (e) => {
    if (ref.current === e.target) {
      setShowModal(false);
    }
  };

  // Event listeners
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [showModal, setShowModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // Render
  if (!showModal) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} ref={ref}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default PopUp;
