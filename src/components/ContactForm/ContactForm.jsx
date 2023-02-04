import { useState } from 'react';
import PropTypes from 'prop-types';
import initialState from './initialState';
import styles from './contactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });
  const { name, number } = state;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setState({ ...initialState });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <span className={styles.name}>Name</span>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        <span className={styles.number}>Number</span>
        <input
          className={styles.input}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>

      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
