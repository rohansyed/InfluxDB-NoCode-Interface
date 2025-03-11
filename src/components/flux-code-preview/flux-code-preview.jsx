import styles from "./flux-code-preview.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"

const FluxCodePreview = ({ fluxQuery }) => {
    return (
        <div className={styles.previewBoxContainer}>
            <div className={styles.previewHeader}>
                <FontAwesomeIcon
                    icon={faCode}
                    color="white"
                    size="2x"
                />

                <h3 className={styles.heading}>
                    Flux Code
                </h3>
            </div>

            <div className={styles.previewBox}>
                <h4>
                    Constructed Query:
                </h4>

                <pre
                    contentEditable={true}
                >
                    {fluxQuery}
                </pre>
            </div>
        </div >
    )
}

export default FluxCodePreview;