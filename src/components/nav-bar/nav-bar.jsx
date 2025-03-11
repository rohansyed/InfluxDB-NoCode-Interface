import styles from "./nav-bar.module.scss";
import SignOut from "../sign-out-button/sign-out.jsx";

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <a href="/" className={styles.influx}>
                <h3 className={styles.influx}>Influx-UI</h3>
            </a>

            <SignOut/>
        </nav>
    );
};

export default NavBar;