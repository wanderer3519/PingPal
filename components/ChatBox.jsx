/**
 * This represents a chat box in the chat list on left of the chats page
 * Includes the profile photo of the chat, the name of the chat, the last message, and the time of the last 
 * message
 */

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react'

const ChatBox = ({ chat, currentUser, currentChatId }) => {

  // get the required data
  const otherUser = chat?.members?.filter(member => member._id !== currentUser._id);
  const lastMessage = (chat?.messages?.length > 0) && chat?.messages[chat.messages.length - 1];
  const seen = lastMessage?.seenBy?.find(member => member._id === currentUser._id);

  // Using router to navigate to the chat page
  const router = useRouter();

  return (
    // Display the chat box
    <div className={`chat-box ${chat._id === currentChatId ? "bg-blue-2" : ""}`} onClick={() =>
      router.push(`/chats/${chat._id}`)}>

      {/* At the start of chat message, check if there is a profile pic corresponding to chat */}
      <div className="chat-info">
        {chat.isGroup ? (
          <img src={chat?.groupPhoto || "/assets/group.png"} alt="Group-Photo" className='profilePhoto' />
        ) : (
          <img src={otherUser[0].profileImage || "/assets/person.jpg"} alt='profile-photo'
            className='profilePhoto' />
        )}

        <div className='flex flex-col gap-1'>
          {chat.isGroup ? (
            // Group chat name
            <p className='text-base-bold'> {chat?.name} </p>
          ) : (
            // Other Individual's name
            <p className='text-base-bold'> {otherUser[0]?.username} </p>
          )}

          {!lastMessage && (
            // If there is no last message, display this message
            <p className='text-small-bold'> Started a new chat </p>
          )}


          {
            // Displaying the last message if it is a photo or text
            lastMessage?.photo ? (
              lastMessage?.sender === currentUser._id
                ? (<p className='text-small-medium text-grey-3'> You sent a photo </p>)
                : (<p className={`${seen ? "text-small-medium text-grey-3" : "text-small-bold"}`}>
                  Received a photo </p>)
            ) : (
              // Displaying normal text messages
              <p
                className={
                  `last-message ${seen ? "text-small-medium text-grey-3" : "text-small-bold"}`}>
                {lastMessage?.text}
              </p>
            )
          }


        </div>
      </div>

      {/* Display the time of the last message */}
      <div>
        <p className='text-base-light text-grey-3'>
          {!lastMessage
            ? format(new Date(chat?.createdAt), 'p')
            : format(new Date(chat?.lastMessageAt), 'p')}
        </p>
      </div>
    </div>
  )
}

export default ChatBox