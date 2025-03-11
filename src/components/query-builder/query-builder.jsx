import { useState, useEffect } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./query-builder.module.scss";
import ItemTypes from "./item-types-enum.js";
import DroppableArea from "./droppable-area.jsx";
import DraggableItem from "./draggable-item.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Button from "../button/button.jsx";
import GlassPane from "../glass-pane/glass-pane.jsx";
import ThreshFilter from "../threshold-filter/threshold-filter.jsx";
import FluxCodePreview from "../flux-code-preview/flux-code-preview.jsx";
import DateFilter from "../date-time-filter/date-time-filter.jsx";
import cn from "classnames";
import FooterBar from "../footer-bar/footer-bar.jsx";


const QueryBuilder = () => {
    const [queryResult, setQueryResult] = useState([]);
    const [error, setError] = useState(null);
    const [fluxQuery, setFluxQuery] = useState(null); // storing generated query here

    const handleExecuteQuery = async () => {
        setError(null);

        try {
            const apiToken = localStorage.getItem('apiToken');

            console.log('Generated Flux Query:', fluxQuery);

            const response = await axios.post(
                'http://localhost:3001/api/execute-query',
                { query: fluxQuery }, // Send the Flux query
                {
                    headers: {
                        'Authorization': `Bearer ${apiToken}`, // Pass the API token
                        'Content-Type': 'application/json'
                    }
                }
            );

            setQueryResult(response.data); // Displaying results in frontend
        } catch (error) {
            setError('Error executing query');
            console.error('Query execution error:', error);
        }
    };

    const [buckets, setBuckets] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [fields, setFields] = useState([]);
    const [createQueryDisabled, setCreateQueryDisabled] = useState(true);
    const [tabs, setTabs] = useState([
        {
            name: "Bucket",
            active: true,
        },
        {
            name: "Measurement",
            active: false,
        },
        {
            name: "Field",
            active: false,
        },
        {
            name: "Filter",
            active: false,
        },
    ]);
    // States for the following aren't working for some reason so have used global variables for now, the following
    // are just for rendering.
    const [selectedBucket, setSelectedBucket] = useState(null);
    const [selectedMeasurement, setSelectedMeasurement] = useState(null);
    const [selectedFields, setSelectedFields] = useState([]);
    const [selectedThresholdFilters, setSelectedThresholdFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [queryHistory, setQueryHistory] = useState([]);
    const [queryCount, setQueryCount] = useState(1);

    let selectedBucketGlobal, selectedMeasurementGlobal;
    let selectedFieldsGlobal = [];

    const setActiveQuery = (index) => {
        const selectedQuery = queryHistory[index];

        setSelectedBucket(selectedQuery.bucket);
        setSelectedMeasurement(selectedQuery.measurements);
        setSelectedThresholdFilters(selectedQuery.thresholdFilters);
        setSelectedFilters(selectedQuery.dateFilter);
        setSelectedFields(selectedQuery.fields);
        setFluxQuery(selectedQuery.query);

        // Resetting query result... should be fine since the user can always just re-run it to get it back.
        setQueryResult([]);
        setError(null);
    };

    const fetchBuckets = async () => {
        try {
            const response = await axios.get("/api/buckets");

            setBuckets(response.data);
        } catch (error) {
            console.error('Error fetching buckets:', error);
        }
    };

    const fetchMeasurements = async (bucketName) => {
        try {
            const response = await axios.get(`/api/measurements/${bucketName}`);

            setMeasurements(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchFields = async (measurementName) => {
        try {
            const response = await axios.get(`/api/fields/${selectedBucketGlobal.name}/${measurementName}`);

            setFields(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Fetches buckets on mount
    useEffect(() => {
        void fetchBuckets();
    }, []);

    useEffect(() => {
        if (selectedBucket && selectedMeasurement && selectedFields.length > 0) {
            setCreateQueryDisabled(false);
        } else {
            setCreateQueryDisabled(true);
        }
    }, [
        selectedBucket,
        selectedMeasurement,
        selectedFields,
    ]);

    const resetMeasurements = async () => {
        await setSelectedMeasurement(null);
        selectedMeasurementGlobal = null;
    };

    const resetFields = async () => {
        await setSelectedFields([]);
        selectedFieldsGlobal = [];
    };

    const handleDrop = async (item) => {
        // If bucket tab is active
        if (item.type === "bucket") {
            await resetMeasurements().then(() => {
                resetFields().then(() => {
                    setSelectedBucket(item.item);
                    selectedBucketGlobal = item.item;
                    void fetchMeasurements(item.item.name);
                });
            });

            return;
        }

        // If measurement tab is active
        if (item.type === "measurement") {
            await resetFields().then(() => {
                void fetchFields(item.item._value);
                setSelectedMeasurement(item.item);
                selectedMeasurementGlobal = item.item;
            });

            return;
        }

        // If field tab is active
        if (item.type === "field") {
            setFields(
                prevFields => {
                    return prevFields.filter(field => field._value !== item.item._value);
                },
            );

            setSelectedFields([...selectedFields, item]);
            selectedFieldsGlobal.push(item);
        }

        // If filter tab is active
        if (item.type === "filter") {
            const filterExists = selectedFilters.some(filter => filter.id === item.item.id);
            if (!filterExists) {
                setSelectedFilters(prevFilters => [...prevFilters, item.item]);
            }
        }

        if (item.type === "threshold-filter") {
            const filterExists = selectedThresholdFilters.some(filter => filter.id === item.item.id);
            if (!filterExists) {
                setSelectedThresholdFilters(prevFilters => [...prevFilters, item.item]);
            }
        }
    };

    const handleRemoveItem = async (itemType, index = 0) => {
        if (itemType === ItemTypes.BUCKET) {
            setMeasurements([]);
            setFields([]);
            setSelectedBucket(null);
            setSelectedMeasurement(null);
            setSelectedFields([]);
            selectedBucketGlobal = null;
            selectedMeasurementGlobal = null;
            selectedFieldsGlobal = [];

            return;
        }

        if (itemType === ItemTypes.MEASUREMENT) {
            setFields([]);
            setSelectedMeasurement(null);
            setSelectedFields([]);
            selectedMeasurementGlobal = null;
            selectedFieldsGlobal = [];

            return;
        }

        if (itemType === ItemTypes.FIELD) {
            const removedField = selectedFields[index].item;
            setFields(prevFields => [...prevFields, removedField]);
            setSelectedFields(prevFields => prevFields.filter((_, i) => i !== index));
            selectedFieldsGlobal.splice(index, 1);
        }

        if (itemType === ItemTypes.DATE_FILTER) {
            setSelectedFilters(prevFilters => prevFilters.filter((_, i) => i !== index));
        }

        if (itemType === ItemTypes.THRESHOLD_FILTER) {
            setSelectedThresholdFilters(prevFilters => prevFilters.filter((_, i) => i !== index));
        }
    };

    const handleQuerySubmit = () => {
        setError(null);
        setQueryResult([]);

        const bucket = selectedBucket ? selectedBucket.name : "None";
        const measurements = selectedMeasurement ? selectedMeasurement._value : "add measurement";
        const fields = selectedFields.length > 0 ? selectedFields.map(field => field.item._value).join(", ") : "add fields";
        const thresholdFilters = selectedThresholdFilters.map(filter => `${filter.threshold1} - ${filter.threshold2}`).join(", ");

        // Ensureing there's a default time range if no filters are provided
        const dateFilter = selectedFilters.length > 0 ?
            selectedFilters.map(filter => `range(start: ${filter.start}, stop: ${filter.end})`).join(", ") :
            'range(start: -1h)';  // Default to past 1 hour if no date filter is provided

        const query =
            `
            from(bucket: "${bucket}")
            |> ${dateFilter}
            |> filter(fn: (r) => r._measurement == "${measurements}")
            |> filter(fn: (r) => r._field == "${fields}")
            ${thresholdFilters && `|> filter(fn: (r) => r.threshold >= ${thresholdFilters.split(' - ')[0]} and r.threshold <= ${thresholdFilters.split(' - ')[1]})`}
        `;

        setFluxQuery(query); // Storing the generated query in state

        // Adds query to history, taking the selected stuff and giving a timestamp and id (just an int that is incremented).
        const timestamp = new Date().toLocaleString();
        const newQuery = {
            id: queryCount,
            name: `Query ${queryCount}`,
            query: query,
            bucket: selectedBucket,
            measurements: selectedMeasurement,
            fields: selectedFields,
            thresholdFilters: selectedThresholdFilters,
            dateFilter: selectedFilters,
            timestamp,
        };

        setQueryHistory([...queryHistory, newQuery]);
        setQueryCount(queryCount + 1);
    };

    const handleTabClick = (tabName) => {
        setTabs(tabs.map(tab =>
            tab.name === tabName ? {
                name: tab.name,
                active: true,
            } : {
                name: tab.name,
                active: false,
            }
        ));
    };

    const generateDraggableContent = () => {
        // If bucket tab is active.
        if (tabs[0].active) {
            return (
                buckets.map(bucket => (
                    <DraggableItem
                        type={ItemTypes.BUCKET}
                        item={bucket}
                        key={bucket.id}
                        itemName={bucket.name}
                    />
                ))
            );
        }

        // If measurement tab is active.
        if (tabs[1].active) {
            return (
                measurements.length > 0 ? (
                    measurements.map(measurement => (
                        <DraggableItem
                            type={ItemTypes.MEASUREMENT}
                            item={measurement}
                            key={measurement._value}
                            itemName={measurement._value}
                        />
                    ))
                ) : (
                    <div>
                        Select a bucket to view measurements.
                    </div>
                )
            );
        }

        // If field tab is active.
        if (tabs[2].active) {
            return (
                fields.length > 0 ? (
                    fields.map(field => (
                        <DraggableItem
                            type={ItemTypes.FIELD}
                            item={field}
                            key={field._value}
                            itemName={field._value}
                        />
                    ))
                ) : (
                    <div>
                        Select a bucket and measurement to view fields.
                    </div>
                )
            );
        }

        if (tabs[3].active) {
            return (
                <div>
                    <DateFilter />
                    <ThreshFilter />
                </div>
            );
        }

        return (
            <div>
                Error, failed to determine which tab is active.
            </div>
        )
    }

    return (
        <>
            <GlassPane classNames={styles.queryBuilderWrapper}>
                <div className={styles.builderContainer}>
                    <DndProvider backend={HTML5Backend}>
                        <div className={styles.dndGroup}>
                            <h3 className={styles.headerThree}>
                                Filters & Data
                            </h3>

                            {/* Tabs */}
                            <div
                                className={styles.tabGroupWrapper}
                            >
                                {tabs.map((tab, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={styles.individualTab}
                                            onClick={() => handleTabClick(tab.name)}
                                        >
                                            <div
                                                className={tab.active ? styles.activeTab : styles.inactiveTab}
                                            >
                                                {tab.name}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.sectionWrapper}>
                                <div className={styles.draggableWrapper}>
                                    {generateDraggableContent()}
                                </div>
                            </div>

                            <DroppableArea
                                onDrop={(item) => {
                                    handleDrop(item);
                                }}
                                classNames={styles.droppableArea}
                            />
                        </div>

                        <div className={styles.queryBuilderGroup}>
                            <h3 className={styles.headerThree}>
                                Query Builder
                            </h3>

                            <div className={cn(styles.sectionWrapper, styles.queryBuilderSectionWrapper)}>
                                <div className={styles.droppedItem}>
                                    <div>
                                        Selected Bucket
                                    </div>

                                    {selectedBucket && (
                                        <div className={styles.droppedItems}>
                                            {selectedBucket.name}

                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={async () => await handleRemoveItem(ItemTypes.BUCKET)}
                                            />
                                        </div>
                                    )}

                                    <div>
                                        Selected Measurement
                                    </div>

                                    {selectedMeasurement && (
                                        <div className={styles.droppedItems}>
                                            {selectedMeasurement._value}

                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={async () => await handleRemoveItem(ItemTypes.MEASUREMENT)}
                                            />
                                        </div>
                                    )}

                                    <div>
                                        Selected Fields
                                    </div>

                                    {selectedFields.map((field, index) => (
                                        <div
                                            className={styles.droppedItems}
                                            key={field.item._value}
                                        >
                                            {field.item._value}

                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={async () => {
                                                    await handleRemoveItem(ItemTypes.FIELD, index)
                                                }}
                                            />
                                        </div>
                                    ))}

                                    <div>Selected Filters</div>

                                    {selectedFilters.map((filter, index) => (
                                        <div className={styles.droppedItems} key={filter.id}>
                                            {filter.start} - {filter.end}
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={() => handleRemoveItem(ItemTypes.DATE_FILTER, index)}
                                            />
                                        </div>
                                    ))}

                                    {selectedThresholdFilters.map((filter, index) => (
                                        <div className={styles.droppedItems} key={filter.id}>
                                            {filter.threshold1} - {filter.threshold2}
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={() => handleRemoveItem(ItemTypes.THRESHOLD_FILTER, index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <FluxCodePreview fluxQuery={fluxQuery}/>

                            <Button
                                onClick={handleQuerySubmit}
                                className={styles.buildQueryButton}
                                disabled={createQueryDisabled}
                            >
                                Build query
                            </Button>
                        </div>
                    </DndProvider>
                </div>
            </GlassPane>

            <div>
                <FooterBar
                    queryHistory={queryHistory}
                    setActiveQuery={setActiveQuery}
                    runQuery={handleExecuteQuery}
                    queryOutput={queryResult}
                    queryOutputError={error}
                    fluxQuery={fluxQuery}
                />
            </div>
        </>
    );
};

export default QueryBuilder;