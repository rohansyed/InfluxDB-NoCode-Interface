import PropTypes from "prop-types";
import styles from "./button.module.scss";
import cn from "classnames";

const Button = ({
    onClick,
    children,
    className,
    disabled = false,
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(`${styles.buttonStyling} ${className} ${disabled && styles.disabled}`)}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}

export default Button;