import {useState} from "react";
import styles from "./footer-bar.module.scss";
import Button from "../button/button.jsx";
import QueryModal from "../footer-bar/query-modal.jsx";
import GraphanaModal from "../footer-bar/graphana-modal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import QueryHistory from "./query-history.jsx";
import QueryOutput from "./query-output.jsx";

const FooterBar = ({
    queryHistory,
    setActiveQuery,
    runQuery,
    queryOutput,
    queryOutputError,
    fluxQuery,
}) => {
    const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
    const [isGraphanaModalOpen, setIsGraphanaModalOpen] = useState(false);
    const [isQueryHistoryModalOpen, setIsQueryHistoryModalOpen] = useState(false);
    const [queryOutputOpen, setQueryOutputOpen] = useState(false);

    const handleSaveToGraphana = () => {
        setIsGraphanaModalOpen(true);
    }

    const handleOpenQueryHistory = () => {
        setIsQueryHistoryModalOpen(true);
    }

    return (
        <>
            <footer className={styles.footer}>
                <Button
                    className={styles.button}
                    onClick={handleOpenQueryHistory}
                >
                    Query History
                </Button>

                <Button
                    className={styles.button}
                    onClick={handleSaveToGraphana}
                >
                    Save to Graphana
                </Button>

                <Button
                    className={styles.button}
                    onClick={runQuery}
                    disabled={!fluxQuery}
                >
                    <FontAwesomeIcon icon={faPlay}/>
                    Run Query
                </Button>

                <Button
                    className={styles.button}
                    onClick={() => setQueryOutputOpen(true)}
                    disabled={!queryOutput.length && !queryOutputError}
                >
                    View Output
                </Button>
            </footer>

            <QueryModal
                isOpen={isQueryModalOpen}
                setIsOpen={setIsQueryModalOpen}
            />

            <GraphanaModal
                isOpen={isGraphanaModalOpen}
                setIsOpen={setIsGraphanaModalOpen}
            />

            <QueryOutput
                isOpen={queryOutputOpen}
                setIsOpen={setQueryOutputOpen}
                queryOutput={queryOutput}
                error={queryOutputError}
            />

            <QueryHistory
                isOpen={isQueryHistoryModalOpen}
                setIsOpen={setIsQueryHistoryModalOpen}
                queryHistory={queryHistory}
                setActiveQuery={setActiveQuery}
            />
        </>
    );
};

export default FooterBar;
