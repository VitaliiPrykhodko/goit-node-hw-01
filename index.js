const { listContacts, getContactById, addContact, removeContact } = require('./contacts')
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const contacts = await listContacts()
          console.table(contacts);
      break;

    case 'get':
          const contact = await getContactById(id)
          console.log(contact);
      break;

    case 'add':
          const newContact = await addContact(name, email, phone)
          console.log(newContact);
      break;

    case 'remove':
          const deleteContact = await removeContact(id)
          console.log(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction({action: "list"})
// invokeAction({ action: "get", id: "2" })
// invokeAction({action: "add", name: "Vitalii Dev", email: "v@gmail.com", phone: "727-800-300"})
// invokeAction({ action: "remove", id: "4uzwrCE1X" })

invokeAction(argv);
