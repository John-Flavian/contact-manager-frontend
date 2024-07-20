"use client";
import { useState } from "react";
import ContactForm from "./ContactForm";

const Dashboard = () => {
  const [contacts, setContacts] = useState([
    { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "123-456-7890" },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "987-654-3210",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = (contact = null) => {
    setCurrentContact(contact);
    setIsEdit(!!contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentContact(null);
    setIsEdit(false);
  };

  const handleSaveContact = (contact) => {
    if (isEdit) {
      setContacts(
        contacts.map((c) =>
          c.id === currentContact.id ? { ...currentContact, ...contact } : c
        )
      );
    } else {
      const newContact = { id: Date.now(), ...contact };
      setContacts([...contacts, newContact]);
    }
  };

  const handleEditContact = (id) => {
    // Edit contact logic
    const updatedContacts = contacts.map((contact) =>
      contact.id === id
        ? { ...contact, firstName: "Updated", lastName: "Contact" }
        : contact
    );
    setContacts(updatedContacts);
  };

  const handleDeleteContact = (id) => {
    // Delete contact logic
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-[80vh] w-full sm:max-w-md mx-auto">
      <ContactForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveContact}
        initialValues={
          currentContact || { firstName: "", lastName: "", phoneNumber: "" }
        }
        isEdit={isEdit}
      />
      <h1 className="text-3xl text-black font-bold mb-4">Welcome John</h1>
      <div className="w-full max-w-2xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl text-black font-semibold">Contacts</h2>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Contact
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex justify-between items-center mb-2 border-b pb-2"
            >
              <div>
                <p className="text-lg font-medium text-gray-600">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-gray-600">{contact.phoneNumber}</p>
              </div>
              <div>
                <button
                  onClick={() => handleOpenModal(contact)}
                  className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
