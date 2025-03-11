import PropTypes from "prop-types";

export const Bucket = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    organizationID: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    retentionPeriod: PropTypes.number.isRequired,
    retentionPolicy: PropTypes.string.isRequired,
    table: PropTypes.number.isRequired,
});

export const Measurement = PropTypes.shape({
    result: PropTypes.string.isRequired,
    table: PropTypes.number.isRequired,
    _value: PropTypes.string.isRequired,
});

export const Field = PropTypes.any;