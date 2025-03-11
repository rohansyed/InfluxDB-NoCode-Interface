import styles from "./run-query.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";

const RunQuery = () => {
    const runQueryAlert = () => {
        alert("Query running")
    };

    return (
        <Button className={styles.runQuery} onClick={runQueryAlert}>
            Run Query

            <FontAwesomeIcon icon={faPlay}/>
        </Button>
    );
};

export default RunQuery;