import React, { useState } from 'react';
import Datetime from 'react-datetime';
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import styles from './date-time-filter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import DraggableItem from '../query-builder/draggable-item.jsx';
import ItemTypes from '../query-builder/item-types-enum.js';
import Button from '../button/button.jsx';

const DateFilter = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dragDates, setDragDates] = useState([]);

    const formatDate = (date) => {
        if (!date) return '';
        // Convert to ISO 8601 format
        return moment(date).toISOString();
    };

    const handleStartDate = (value) => {
        setStartDate(value);
    };

    const handleEndDate = (value) => {
        setEndDate(value);
    };

    const renderInput = (props, openCalendar, closeCalendar) => {
        return (
            <div className={styles.customDateInput}>
                <input {...props} />
                <FontAwesomeIcon
                    icon={faCalendar}
                    onClick={openCalendar}
                    className={styles.calendarIcon}
                />
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (startDate && endDate) {
            const newDateItem = {
                id: new Date().getTime(),
                start: formatDate(startDate),
                end: formatDate(endDate),
            };
            setDragDates([...dragDates, newDateItem]);
        }
    };

    const handleDelete = (id) => {
        setDragDates(dragDates.filter(item => item.id !== id));
    };

    return (
        <div className={styles.dateTimeFilter}>
            <h2>Set Filter Parameters:</h2>
            <h4 className={styles.heading}>Set Date and Time Range:</h4>
            <form onSubmit={handleSubmit} className={styles.filterContainer}>
                <div className={styles.datePickerContainer}>
                    <div className={styles.startDateContainer}>
                        <span>Start Date & Time: </span>
                        <div>
                            <Datetime
                                className={styles.startInput}
                                onChange={handleStartDate}
                                value={startDate}
                                dateFormat="DD/MM/YYYY"
                                renderInput={renderInput}
                            />
                        </div>
                    </div>

                    <div className={styles.endDateContainer}>
                        <span>End Date & Time: </span>
                        <Datetime
                            className={styles.endInput}
                            onChange={handleEndDate}
                            value={endDate}
                            dateFormat="DD/MM/YYYY"
                            renderInput={renderInput}
                        />
                    </div>
                </div>
                <div className={styles.draggableItemsContainer}>
                    {dragDates.map((dateItem) => (
                        <DraggableItem
                            key={dateItem.id}
                            type={ItemTypes.DATE_FILTER}
                            item={dateItem}
                            itemName={`${dateItem.start} - ${dateItem.end}`}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                <div className={styles.generateButtonContainer}>
                    <Button type="submit" className={styles.generateButton}>
                        Generate Date Filter
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DateFilter;
