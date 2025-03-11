import React, { useState } from "react";
import styles from './threshold-filter.module.scss';
import DraggableItem from '../query-builder/draggable-item.jsx';
import ItemTypes from "../query-builder/item-types-enum.js";
import Button from "../button/button.jsx";

const ThreshFilter = () => {
    const [threshold1, setThreshold1] = useState(null);
    const [threshold2, setThreshold2] = useState(null);
    const [dragThresholds, setDragThresholds] = useState([]);

    const handleThreshold1 = (event) => {
        const value = event.target.value;
        if (!isNaN(value)) {
            setThreshold1(value);
        }
    };

    const handleThreshold2 = (event) => {
        const value = event.target.value;
        if (!isNaN(value)) {
            setThreshold2(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (threshold1 && threshold2) {
            const newThreshold = {
                id: new Date().getTime(),
                threshold1: Number(threshold1), // Convert to number
                threshold2: Number(threshold2), // Convert to number
            };
            setDragThresholds([...dragThresholds, newThreshold]);
            setThreshold1('');
            setThreshold2('');
        }
    };

    const handleDelete = (id) => {
        setDragThresholds(dragThresholds.filter(item => item.id !== id));
    }

    return (
        <div>
            <div className={styles.thresholdFilterContainer}>
                <h4>Set Value Threshold</h4>
                <form onSubmit={handleSubmit} className={styles.inputFilterContainer}>
                    <div className={styles.inputContainer}>
                        <div className={styles.thresholdFilterBox}>
                            <label>Threshold 1</label>
                            <input
                                type="text"
                                value={threshold1}
                                onChange={handleThreshold1}
                            />
                        </div>
                        <div className={styles.thresholdFilterBox}>
                            <label>Threshold 2</label>
                            <input
                                type="text"
                                value={threshold2}
                                onChange={handleThreshold2}
                            />
                        </div>
                    </div>

                    <div className={styles.draggableItemsContainer}>
                        {dragThresholds.map((thresholdItem) => (
                            <DraggableItem
                                key={thresholdItem.id}
                                type={ItemTypes.THRESHOLD_FILTER}
                                item={thresholdItem}
                                itemName={`${thresholdItem.threshold1}, ${thresholdItem.threshold2}`}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    <div className={styles.generateButtonContainer}>
                        <Button type="submit" className={styles.generateButton}>
                            Generate Threshold Filter
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ThreshFilter;
