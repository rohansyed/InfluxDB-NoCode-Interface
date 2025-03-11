import styles from "./glass-pane.module.scss";
import PropTypes from "prop-types";
import cn from "classnames";

const GlassPane = ({
    children,
    classNames,
    landingPage = false,
}) => {
    return (
        <div
            className={cn(`${classNames} ${landingPage ? styles.glassBackground : styles.gradientBackground}`)}
        >
            {children}
        </div>
    )
};

GlassPane.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
    landingPage: PropTypes.bool,
}

export default GlassPane;