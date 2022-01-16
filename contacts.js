const fs = require('fs').promises
const path = require('path')
const shortid = require('shortid');

const contactsPath = path.join("db/contacts.json")

async function listContacts() {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
}

async function getContactById(id) {
    const contacts = await listContacts()
    const result = contacts.find((contact) => contact.id === id.toString())
    if (!result) {
        return null
    }
    return result
}

async function addContact(name, email, phone) {
    const data = {id: shortid.generate(), name, email, phone }
    const contacts = await listContacts();
    contacts.push(data)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return data
}

async function removeContact(id) {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === id.toString())
    if (idx === -1) {
        return null
    }
    const deleteContact = contacts[idx]
    contacts.splice(idx, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return deleteContact
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}