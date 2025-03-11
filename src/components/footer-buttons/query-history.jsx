import styles from "./query-history.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Button from "../button/button";

const QueryHistory = () => {
    const queryHistoryMessage = () => {
        alert("opening previous query history")
    };

    return (
        <Button className={styles.queryHistory} onClick={queryHistoryMessage}>
            Query History

            <FontAwesomeIcon icon={faClock}/>
        </Button>
    );
};

export default QueryHistory;