import {useState,useEffect} from "react"
import ContactForm from "./ContactForm/ContactForm"
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { nanoid } from "nanoid";
 const App = () =>{

  const[contacts,setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter,setFilter] = useState('');



useEffect(()=>{



  localStorage.setItem('contacts',JSON.stringify(contacts))

},[contacts])






  const addContact = (name,number) =>{
    const isDublicate = contacts.find(item =>item.name === name)
    if(isDublicate){
       return alert (`${name} is already in contacts`)
    }
    setContacts([...contacts,{
      id:nanoid(),
      name:name,
      number:number,
    }])
}
  const deleteContact = (id) =>{
    const newContactList = contacts.filter(item => item.id !== id)
    setContacts(
      newContactList
      )
}

const onChangeFilter = (e) =>{
  setFilter(e.target.value)
}

const getFilteredContacts = () =>{

  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter));
}
const filteredContacts = getFilteredContacts()


  return (

    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}/>
      <h1>Contacts</h1>
      <Filter type="text"
      name="filter"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
      value = {filter}
      onChangeFilter = {onChangeFilter}
  />
      <ContactList items={filteredContacts} deleteContact={deleteContact}/>
    </div>




  )

}


export default App
