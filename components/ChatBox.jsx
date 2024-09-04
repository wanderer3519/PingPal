import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react'

const ChatBox = ({ chat, currentUser }) => {

  const otherUser = chat?.members?.filter(member => member._id !== currentUser._id);
  const lastMessage = (chat?.messages?.length > 0) && chat?.messages[chat.messages.length - 1];

  const router = useRouter();

  return (
    <div className='chat-box' onClick={() => 
      router.push(`/chats/${chat._id}`)
    }>
      <div className="chat-info">
        {chat.isGroup ? (
          <img src={chat?.groupPhoto || "/assets/group.png"} alt="Group-Photo" className='profilePhoto' />
        ) : (
          <img src={otherUser[0].profileImage || "assets/person.jpg"} alt='profile-photo'
            className='profilePhoto' />
        )}

        <div className='flex flex-col gap-1'>
          {chat.isGroup ? (
            <p className='text-base-bold'> {chat?.name} </p>
          ) : (
            <p className='text-base-bold'> {otherUser[0]?.username} </p>
          )}

          {!lastMessage && (
            <p className='text-small-bold'> Started a new chat </p>
          )}
        </div>
      </div>

      <div>
          <p className='text-base-light text-grey-3'>
            {!lastMessage && format(new Date(chat.createdAt), 'p')}
          </p>
      </div>
    </div>
  )
}

export default ChatBox