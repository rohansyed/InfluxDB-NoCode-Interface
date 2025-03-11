import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from "./draggable-item.module.scss";
import { Bucket, Field, Measurement } from "./item-prop-types.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const DraggableItem = ({ type, item, itemName, onDelete }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: type,
        item: { item },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} key={item.id} className={styles.item}>
            {itemName}
            {onDelete && (
                <FontAwesomeIcon
                    className={styles.crossicon}
                    icon={faCircleXmark}
                    onClick={() => onDelete(item.id)}
                />
            )}
        </div>
    );
};

DraggableItem.propTypes = {
    type: PropTypes.string.isRequired,
    item: PropTypes.oneOfType([Bucket, Measurement, Field]).isRequired,
    itemName: PropTypes.string.isRequired,
};

export default DraggableItem;
