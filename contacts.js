import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const getContactsList = async () => {
  try {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
  } catch (error) {
    throw new Error("Error while reading contacts file: " + error.message);
  }
};

export const getContactById = async (id) => {
  try {
    const contactsList = await getContactsList();
    const contact = contactsList.find((contact) => contact.id === id);
    return contact || null;
  } catch (error) {
    throw new Error("Error while getting contact by ID: " + error.message);
  }
};

export const removeContact = async (id) => {
  try {
    const contactsList = await getContactsList();
    const index = contactsList.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return null;
    }

    const [deletedContact] = contactsList.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return deletedContact;
  } catch (error) {
    throw new Error("Error while removing contact: " + error.message);
  }
};

export const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const contactsList = await getContactsList();

    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return newContact;
  } catch (error) {
    throw new Error("Error while adding a new contact: " + error.message);
  }
};
