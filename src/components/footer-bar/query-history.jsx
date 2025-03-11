import Button from "../button/button.jsx";
import styles from "./query-history.module.scss";

const QueryHistory = ({
    isOpen,
    setIsOpen,
    queryHistory,
    setActiveQuery,
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.queryModalContainer}>
            <div className={styles.queryModal}>
                <div className={styles.queryModalContent}>
                    {queryHistory.map((query) => (
                        <div key={query.id} className={styles.queryItem}>
                            <p>{query.name}</p>
                            <p>{query.timestamp}</p>
                            <Button
                                onClick={() => {
                                    setActiveQuery(query.id - 1);
                                    setIsOpen(false);
                                }}
                                className={styles.setActiveButton}
                            >
                                Set as Active
                            </Button>
                        </div>
                    ))}

                    <Button onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QueryHistory;
