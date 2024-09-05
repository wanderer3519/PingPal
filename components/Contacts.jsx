/**
 * Display list of all contacts and enable user to select contacts to start a chat
 */

"use client";

import React from 'react'
import { useSession } from 'next-auth/react';
import Loader from './Loader';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Contacts = () => {
  // Set the initial state of the contacts
  const [loading, setLoading] = React.useState(true);
  const [contacts, setContacts] = React.useState([]);
  const [search, setSearch] = React.useState("");

  // Get the current user session
  const { data: session } = useSession();
  const currUser = session?.user;

  // Fetch the contacts
  const getContacts = async () => {
    try {
      const response = await fetch(search !== '' ? `/api/users/searchContact/${search}` : '/api/users');
      const data = await response.json();

      setContacts(data.filter(user => user._id !== currUser._id));
      setLoading(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  // Use the current user and search to get contacts
  React.useEffect(() => {
    if (currUser) getContacts();

  }, [currUser, search]);

  // Select contacts
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const isGroup = selectedContacts.length > 1;
  const handleSelect = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prevSelectedContacts) => prevSelectedContacts.filter((c) => c !== contact));
    }
    else {
      setSelectedContacts((prevSelectedContacts) => [...prevSelectedContacts, contact]);
    }
  }

  // Add group chat name
  const [name, setName] = React.useState("");

  const router = useRouter();

  // Create a new chat
  const createChat = async () => {
    const res = await fetch('/api/chats', {
      method: 'POST',
      body: JSON.stringify({
        currentUserId: currUser._id,
        members: selectedContacts.map((contact) => contact._id),
        isGroup,
        name
      })
    });
    const chat = await res.json();

    if (res.ok) {
      router.push(`/chats/${chat._id}`);
    };
  }

  // Loading screen
  return loading ? <Loader /> : (

    // Display the contacts and enable user to search for contacts
    <div className='create-chat-container'>
      <input type="text" placeholder='search contact...' className='input-search' value={search}
        onChange={(e) => setSearch(e.target.value)} />

      <div className="contact-bar">
        <div className='contact-list'>
          <p className='text-body-bold'>
            Select or De-select
          </p>

          {/* Show all contacts */}
          {contacts.map((user, index) => (
            <div key={index} className='contact' onClick={() => handleSelect(user)}>
              {selectedContacts.find((item) => item === user) ? (
                <CheckCircle sx={{ color: "red" }} />
              ) : (
                <RadioButtonUnchecked />
              )}

              <img src={user.profileImage || "/assets/person.jpg"} alt="profile" className='profilePhoto' />
              <p className='text-base-bold'> {user.username} </p>

            </div>
          ))}
        </div>


        <div className='create-chat'>
          {selectedContacts.length > 1 && (
            <>
              {/* Add group chat name or display old name */}
              <div className='flex flex-col gap-3'>
                <p className='text-body-bold'> Group chat name </p>
                <input
                  type="text"
                  placeholder='Enter group chat name...'
                  className='input-search'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Display all group contacts */}
              <div className='flex flex-col gap-3'>
                <p className='text-body'> Members </p>
                <div className='flex flex-wrap gap-3'>
                  {selectedContacts.map((contact, index) => (
                    <p className='selected-contact' key={index}>
                      {contact.username}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Create chat button */}
          <button className='btn' onClick={createChat}> Find or Start new chat </button>
        </div>
      </div>
    </div>

  )
}

export default Contacts