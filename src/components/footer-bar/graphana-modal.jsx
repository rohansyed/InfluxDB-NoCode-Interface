import styles from "../footer-bar/graphana-modal.module.scss";
import Button from "../button/button.jsx";

const GraphanaModal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.graphanaModalContainer}>
      <div className={styles.graphanaModal}>
        <div className={styles.graphanaModalContent}>
          <h1>Save to Graphana</h1>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default GraphanaModal;