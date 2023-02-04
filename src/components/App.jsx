import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const KEY = 'Contacts';
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem(KEY));
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const addContact = ({ name, number }) => {
    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkContact) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(prevContacts => {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      return [...prevContacts, contact];
    });
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normolizeFilter = filter.toLowerCase();

    const result = contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(normolizeFilter);
    });

    return result;
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contact</h2>

      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} onChange={changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </>
      ) : (
        <h2>No contacts in your phonebook</h2>
      )}
    </>
  );
};
