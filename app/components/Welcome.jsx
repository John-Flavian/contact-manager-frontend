"use client";
import { useState } from "react";
import RegisterAndLogin from "./RegisterAndLogin";
import Image from "next/image";

const Welcome = ({ setIsLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <RegisterAndLogin
        isOpen={isModalOpen}
        setIsLoggedIn={setIsLoggedIn}
        onClose={handleCloseModal}
      />

      <section className="flex flex-col items-center justify-center flex-1 w-full px-4 text-center">
        <h2 className="text-2xl text-black font-semibold leading-snug md:text-4xl">
          Effortlessly Manage Your Contacts
        </h2>
        <p className="mt-4 text-lg text-gray-700 md:text-xl">
          Create, edit, delete, and update your contacts with ease.
        </p>
        <div className="mt-6">
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full mt-4 px-4 py-8 bg-white">
        <div className="max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
              <Image
                src="/images/add_contact.png"
                width={200}
                height={200}
                alt="Create Contacts"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-bold">Create Contacts</h3>
              <p className="mt-2 text-gray-600">
                Easily add new contacts with a simple form.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
              <Image
                src="/images/edit_contact.png"
                width={200}
                height={200}
                alt="Edit Contacts"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-bold">Edit Contacts</h3>
              <p className="mt-2 text-gray-600">
                Update contact information quickly.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
              <Image
                src="/images/delete_contact.png"
                width={200}
                height={200}
                alt="Delete Contacts"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-bold">Delete Contacts</h3>
              <p className="mt-2 text-gray-600">
                Remove contacts you no longer need.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
              <Image
                src="/images/contact_list.png"
                width={200}
                height={200}
                alt="Update Contacts"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-bold">Update Contacts</h3>
              <p className="mt-2 text-gray-600">
                Keep your contact list up-to-date.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
