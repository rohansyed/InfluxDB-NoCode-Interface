import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from './item-types-enum.js';
import styles from "./droppable-area.module.scss";
import cn from "classnames";

function DroppableArea({ onDrop, classNames }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.BUCKET, ItemTypes.MEASUREMENT, ItemTypes.FIELD, ItemTypes.DATE_FILTER, ItemTypes.THRESHOLD_FILTER],
        drop: (item, monitor) => {
            const itemType = monitor.getItemType();
            onDrop({ ...item, type: itemType });
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={cn({
                [styles.isOver]: isOver,
                [styles.isNotOver]: !isOver,
                [styles.droppableArea]: true,
                [classNames]: classNames,
            })}
        >
            Drop items here
        </div>
    );
}

DroppableArea.propTypes = {
    onDrop: PropTypes.func.isRequired,
    classNames: PropTypes.string,
};

export default DroppableArea;
