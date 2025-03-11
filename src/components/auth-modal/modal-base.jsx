import React from 'react';
import styles from "./modal-base.module.scss";
import PropTypes from "prop-types";
import cn from "classnames";

const ModalBase = ({
    isOpen,
    onClose,
    children,
    isCloseable = false,
    className,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className={styles.modalOverlay}
        >
            <div className={styles.modalContent}>
                <div className={cn(styles.leftPanel, className)}>
                    {children}
                </div>

                <div className={styles.rightPanel}/>

                {isCloseable && (
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                )}
            </div>
        </div>
    );
};

ModalBase.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
    isCloseable: PropTypes.bool,
    className: PropTypes.string,
}

export default ModalBase;
