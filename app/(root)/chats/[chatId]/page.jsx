/**
 * This page is used to display the chat details of both the group and individual chats
 */

"use client"
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatList from "@components/ChatList";
import ChatDetails from "@components/ChatDetails";
import { useEffect } from "react";

const ChatPage = () => {
  // Get the chatId from the URL
  const { chatId } = useParams();

  const { data: session } = useSession();
  const currentUser = session?.user;

  const seenMessages = async () => {
    try {
      // Fetch the chat details
      await fetch(`/api/chats/${chatId}`, {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        body: JSON.stringify({
          currentUserId: currentUser._id
        })
      });  
    } 
    catch (error) {
      console.log(error);
    }
  }

  // If the user is logged in and the chatId is available, mark the messages as seen
  useEffect(() => {
    if(currentUser && chatId)
      seenMessages();
  }, [currentUser, chatId])

  return (
    // Display the chat list and chat details
    <div className="main-container">
      <div className="w-1/3 max-lg:hidden"> <ChatList chatId={chatId} /> </div>
      <div className="w-2/3 max-lg:w-full"> <ChatDetails chatId={chatId} /> </div>
    </div>
  )
}

export default ChatPage