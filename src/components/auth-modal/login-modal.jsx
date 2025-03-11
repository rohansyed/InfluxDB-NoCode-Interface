import React, { useState } from "react";
import ModalBase from "./modal-base.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./login-modal.module.scss";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import PropTypes from "prop-types";
import axios from "axios";

const LoginModal = ({
    isOpen,
    onClose,
    toggleModalView,
}) => {
    const [username, setUsername] = useState("");
    const [apiToken, setApiToken] = useState("");
    const [showApiToken, setShowApiToken] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', {
                username,
                apiToken,
            });

            if (response.status === 200) {
                // Save token to localStorage or sessionStorage
                localStorage.setItem('apiToken', apiToken);
                console.log('Login successful');
                onClose();
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid credentials');
        }
    };

    const toggleApiTokenVisibility = () => {
        setShowApiToken((prevShowApiToken) => !prevShowApiToken);
    };

    return (
        <ModalBase
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={styles.loginContainer}>
                <h2>
                    Welcome back to

                    <div className={cn(styles.gradientText)}>
                        Influx UI
                    </div>
                </h2>

                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">
                            Username:
                        </label>

                        <input
                            className={styles.usernameInput}
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="apiToken">
                            API Token:
                        </label>

                        <div className={styles.passwordWrapper}>
                            <input
                                type={showApiToken ? "text" : "password"}
                                id="apiToken"
                                value={apiToken}
                                onChange={(e) => {
                                    setApiToken(e.target.value)
                                }}
                                required
                            />

                            <button
                                type="button"
                                className={cn(styles.viewPasswordButton, styles.gradientBackground)}
                                onClick={toggleApiTokenVisibility}
                            >
                                {showApiToken ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div
                        className={error && styles.error}
                    >
                        {error}
                    </div>

                    <button
                        type="submit"
                        className={cn(styles.submitButton, styles.gradientBackground)}
                    >
                        Login
                    </button>
                </form>

                <div
                    className={styles.register}
                >
                    Don't have an account?

                    <span
                        className={styles.registerInstead}
                        onClick={toggleModalView}
                    >
                        Register
                    </span>
                </div>
            </div>
        </ModalBase>
    );
};

LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    toggleModalView: PropTypes.func.isRequired,
};

export default LoginModal;