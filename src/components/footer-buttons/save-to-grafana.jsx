import styles from "./save-to-grafana.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import Button from "../button/button";

const SaveToGrafana = () => {
    const SaveToGrafanaAlert = () => {
        alert("Now saved to Grafana")
    };

    return (
        <Button className={styles.saveToGrafana} onClick={SaveToGrafanaAlert}>
            Save To Grafana

            <FontAwesomeIcon icon={faFloppyDisk}/>
        </Button>
    );
};

export default SaveToGrafana;