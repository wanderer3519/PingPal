"use client";

import React from 'react'
import { useSession } from 'next-auth/react';
import Loader from './Loader';
import { RadioButtonUnchecked } from '@mui/icons-material';

const Contacts = () => {
  
    const [loading, setLoading] = React.useState(true);
    const [contacts, setContacts] = React.useState([]);

    const [search, setSearch] = React.useState("");

    const { data: session } = useSession();
    const currUser = session?.user;

    const getContacts = async () => {
        try {
            const response = await fetch(search !== '' ? `/api/users/searchContact/${search}`: '/api/users');
            const data = await response.json();
        
            setContacts(data.filter(user => user._id !== currUser._id));

            setContacts(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if(currUser) getContacts();

    }, [currUser, search]);

    return  loading? <Loader/> : (
        <div className='create-chat-container'>
            <input type="text" placeholder='search contact...' className='input-search' value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        
            <div className="contact-bar">
                <div className='contact-list'>
                    <p className='text-body-bold'>
                        select or deselect
                    </p>

                    {contacts.map((user, index) => (
                        <div key={index} className='contact'>
                            <RadioButtonUnchecked />
                            <img src={user.profileImage || "/assets/person.jpg"} alt="profile" className='profilePhoto' />
                        <p className='text-base-bold'> {user.username} </p>
                        
                        </div>
                    ))}
                </div>


                <div className='create-chat'>
                    <button className='btn'> Start new chat </button>
                </div>
            </div>
        </div>
        
    )
}

export default Contacts