import styles from './filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ filter, onChange }) => {
  return (
    <label className={styles.label}>
      <span className={styles.title}>Find contacts by name</span>
      <input
        className={styles.input}
        type="text"
        value={filter}
        onChange={onChange}
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
