"use client"
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import Loader from './Loader';
import ChatBox from './ChatBox';

const ChatList = ({ currentChatId }) => {
  const { data: sessions } = useSession();
  const currentUser = sessions?.user;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');


  const getChats = async () => {
    try {
      const response = await fetch(search !== '' 
        ? `/api/users/${currentUser.id}/searchChat/${search}`
        : `/api/users/${currentUser.id}`);
      const data = await response.json();
      setChats(data);
      setLoading(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser) getChats();

  }, [currentUser, search]);

  return loading ? <Loader /> : (
    <div className='chat-list'>
      <input type="text" placeholder='search a chat...' className='input-search' value={search} 
      onChange={(e) => setSearch(e.target.value)} />

      <div className='chats'>
        {chats?.map((chat, index) => (<ChatBox chat={chat} index={index} currentUser={currentUser} 
        currentChatId={currentChatId} />))}
      </div>
    </div>
  )
}

export default ChatList