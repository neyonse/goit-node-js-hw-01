import * as contactsServices from "./contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-id, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactsServices.getContactsList();
      return console.table(contactsList);
    case "get":
      const contact = await contactsServices.getContactById(id);
      return console.log(contact);
    case "add":
      const newContact = await contactsServices.addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const deletedContact = await contactsServices.removeContact(id);
      return console.log(deletedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
