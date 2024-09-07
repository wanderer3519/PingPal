/**
 * This component represents the chat details section of the chat page
 * More formally, the one that displays the chat messages in group / individual chat
 */
"use client"
import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import MessageBox from "./MessageBox";
import { pusherClient } from "@lib/pusher";

const ChatDetails = ({ chatId }) => {
  // Set the initial state of the chat details
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);
  const [text, setText] = useState("");

  // Get the current user session
  const { data: session } = useSession();
  const currentUser = session?.user;

  // Fetch the chat details
  const getChatDetails = async () => {
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
      );

      const data = await response.json();
      setChat(data);
      setLoading(false);
      setOtherMembers(data.members.filter(member => member._id !== currentUser._id));

    }
    catch (err) {
      console.log(err);
    }
  }

  // Use chatId and currentUser to get chat details
  useEffect(() => {
    if (currentUser && chatId)
      getChatDetails();
  }, [currentUser, chatId])

  // Send new message
  const sendText = async () => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          text,
        })
      });

      if (response.ok)
        setText("");
    }
    catch (error) {
      console.log(error);
    }
  }

  // Send photo
  const sendPhoto = async (result) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          photo: result?.info?.secure_url
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Real time message update
  useEffect(() => {
    pusherClient.subscribe(chatId);

    // Handle new message
    const handleMessage = async (message) => {
      setChat(prevChat => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, message]
        }
      });
    }

    pusherClient.bind("new-message", handleMessage);

    return () => {
      // After usage, unsubscribe and unbind the event
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    }

  }, [chatId]);

  const bottomRef = useRef(null);

  // Use effect to scroll to the bottom of the chat automatically
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages])

  // Loader while fetching chat details
  return loading ? <Loader /> : (

    // Display chat details
    <div className="chat-details">
      <div className="chat-header">
        {chat?.isGroup ? (
          // Use dummy parent since parent is mandatory

          // The header section of the group chat
          <>
            <Link href={`/chats/${chatId}/group-info`}>
              <img src={chat?.groupPhoto || "/assets/group.png"} alt="group-photo"
                className="profilePhoto" />
            </Link>

            <div className="text">
              <p> {chat?.name} &#160; &#183; &#160; {chat?.members?.length} members </p>
            </div>
          </>
        ) : (

          // The header section of the individual chat
          <>
            <img src={otherMembers[0].profileImage || "/assets/person.jpg"} alt="profile-photo"
              className="profilePhoto" />
            <div>
              <p> {otherMembers[0].username} </p>
            </div>
          </>
        )}
      </div>

      {/* Display all the chat messages */}
      <div className="chat-body">
        {chat?.messages?.map((message, index) => (
          <MessageBox key={index} message={message} currentUser={currentUser} />
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="send-message">
        <div className="prepare-message">
          {/* Upload button for photo */}
          <CldUploadButton options={{ maxFiles: 1 }} onSuccess={sendPhoto} uploadPreset='rn7zselu' >
            <AddPhotoAlternate sx={{ fontSize: "35px", color: "#737373", cursor: "pointer", "&:hover": { color: "red" } }} />
          </CldUploadButton>

          {/* Input field for message */}
          <input type="text" placeholder="Write a message..." className="input-field" style={{ width: "825px" }}
            value={text} onChange={e => setText(e.target.value)} required />

        </div>

        {/* Send message icon */}
        <div>
          {/* <img onClick={sendText} src="/assets/send.jpg" alt="send-msg" className="send-icon" /> */}
          <i className="fa-solid fa-paper-plane btn btn-lg" onClick={sendText}></i>
        </div>

      </div>
    </div>
  )
}

export default ChatDetails