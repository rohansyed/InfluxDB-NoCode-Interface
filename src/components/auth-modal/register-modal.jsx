import React, { useState } from "react";
import ModalBase from "./modal-base.jsx";
import styles from "./register-modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import PropTypes from "prop-types";

const RegisterModal = ({
    isOpen,
    onClose,
    toggleModalView,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Handle registration logic here, dummy logic to log to console :)
        console.log("Username:", username);
        console.log("Password:", password);
        onClose();
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <ModalBase
            isOpen={isOpen}
            onClose={onClose}
            className={styles.modalBase}
        >
            <div className={styles.registerContainer}>
                <h2>
                    Register to

                    <div className={cn(styles.gradientText)}>
                        Influx UI
                    </div>
                </h2>
            </div>

            <div className={styles.login}>
                To register, simply

                <a
                    href="http://localhost:8086"
                    target="_blank"
                >
                    click here
                </a>

                and create an all-access API token.
            </div>

            <div className={styles.login}>
                Once you have your token, use your InfluxDB OSS username and token to login.
            </div>

            <div
                className={styles.login}
            >
                Already have an account?

                <span
                    className={styles.loginInstead}
                    onClick={toggleModalView}
                >
                    Sign in
                </span>
            </div>
        </ModalBase>
    );
};

RegisterModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
        onClose
:
    PropTypes.func.isRequired,
        toggleModalView
:
    PropTypes.func.isRequired,
};

export default RegisterModal;