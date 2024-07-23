"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ContactForm from "./ContactForm";
import { userRequest } from "../requestMethods";

const Dashboard = ({ accessToken, setIsLoggedIn }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const intitailizeData = async () => {
      try {
        const userResponse = await userRequest(accessToken)
          .get("/auth/me")
          .then((res) => {
            return res.data;
          });
        const user = await userResponse.data;
        setUserData(user);

        const contactResponse = await userRequest(accessToken)
          .get("/contacts")
          .then((res) => {
            return res.data;
          });
        const contactData = await contactResponse.data;
        setContacts(contactData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    intitailizeData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

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

  const handleSaveContact = async (contact) => {
    let toastId = toast.loading("Saving...");
    try {
      if (isEdit) {
        // Update contact logic
        await userRequest(accessToken)
          .put(`/contacts/${currentContact._id}`, contact)
          .then((res) => {
            toast.success(res.data.message, { id: toastId });

            setContacts(
              contacts.map((c) =>
                c._id === currentContact._id
                  ? { ...currentContact, ...contact }
                  : c
              )
            );
          })
          .catch((err) => {
            toast.error(err.response.data.message, { id: toastId });
          });

        //
      } else {
        // Save new contact logic
        await userRequest(accessToken)
          .post("/contacts", contact)
          .then((res) => {
            toast.success(res.data.message, { id: toastId });
            setContacts([...contacts, res.data.data]);
          })
          .catch((err) => {
            toast.error(err.response.data.message, { id: toastId });
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContact = async (id) => {
    let toastId = toast.loading("Deleting...");
    // Delete contact logic
    try {
      const updatedContacts = contacts.filter((contact) => contact._id !== id);

      await userRequest(accessToken)
        .delete(`/contacts/${id}`)
        .then((res) => {
          toast.success(res.data.message, { id: toastId });
          setContacts(updatedContacts);
        })
        .catch((err) => {
          toast.error(err.response.data.message, { id: toastId });
        });
    } catch (error) {}
  };

  const handleLogout = async () => {
    let toastId = toast.loading("Logging out...");

    try {
      await userRequest(accessToken)
        .post("/auth/logout")
        .then((res) => {
          toast.success(res.data.message, { id: toastId });
          localStorage.setItem("user", "");
          setIsLoggedIn(false);
        })
        .catch((err) => {
          toast.error("Logout failed", { id: toastId });
        });
    } catch (error) {
      console.error(error);
    }
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

      <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4">
        <h1 className="text-3xl text-black font-bold mb-4 sm:mb-0">
          Welcome {userData?.firstName} {userData?.lastName}
        </h1>
        <button
          onClick={handleLogout}
          className="px-2 py-2 ml-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="w-full mt-8 max-w-2xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl text-black font-semibold">Contacts</h2>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Contact
          </button>
        </div>

        {contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
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
                    onClick={() => handleDeleteContact(contact._id)}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
