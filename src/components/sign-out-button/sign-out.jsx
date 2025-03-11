import styles from "./sign-out.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";

const SignOut = () => {
    const signoutHelper = () => {
        alert("You have been logged out.")
        window.location.href = "/";
    };

    return (
        <Button className={styles.signOut} onClick={signoutHelper}>
            Sign Out

            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
        </Button>
    );
};

export default SignOut;