import styles from "./query-modal.module.scss";
import Button from "../button/button.jsx";

//modal saying query has run

const QueryModal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.queryModalContainer}>
      <div className={styles.queryModal}>
        <div className={styles.queryModalContent}>
          <h1>Query has run</h1>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default QueryModal;
