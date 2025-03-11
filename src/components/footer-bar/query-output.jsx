import Button from "../button/button.jsx";
import styles from "./query-output.module.scss";

const QueryOutput = ({
    isOpen,
    setIsOpen,
    queryOutput,
    error,
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.queryModalContainer}>
            <div className={styles.queryModal}>
                <div className={styles.queryModalContent}>
                    <div className={styles.queryContainer}>
                        {error ?? queryOutput.map(item => {
                            return (
                                <pre>
                                    {JSON.stringify(item, null, 2)}
                                </pre>
                            );
                        })}
                    </div>

                    <Button onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QueryOutput;
