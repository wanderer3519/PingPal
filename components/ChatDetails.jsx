"use client"
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import MessageBox from "./MessageBox";

const ChatDetails = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);
  const [text, setText] = useState("");

  const { data: session } = useSession();
  const currentUser = session?.user;

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
  useEffect(() => {
    if (currentUser && chatId)
      getChatDetails();
  }, [currentUser, chatId])

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

      if(response.ok)
        setText("");
    } 
    catch (error) {
      console.log(error);
    }
  }

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

  return loading ? <Loader /> : (
    <div className="chat-details">
      <div className="chat-header">
        {chat?.isGroup ? (
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
          <>
            <img src={otherMembers[0].profileImage || "/assets/person.jpg"} alt="profile-photo"
              className="profilePhoto" />
            <div>
              <p> {otherMembers[0].username} </p>
            </div>
          </>
        )}
      </div>


      <div className="chat-body">
        {chat?.messages?.map((message, index) => (
          <MessageBox key={index} message={message} currentUser={currentUser} />
        ))}
      </div>

      <div className="send-message">
        <div className="prepare-message">
          <CldUploadButton options={{ maxFiles: 1 }} onSuccess={sendPhoto} uploadPreset='rn7zselu' >
          <AddPhotoAlternate sx={{ fontSize: "35px", color: "#737373", cursor: "pointer", "&:hover": { color: "red" } }} />
          </CldUploadButton>

          <input type="text" placeholder="Write a message..." className="input-field"
            value={text} onChange={e => setText(e.target.value)} required />

        </div>
        <div>
          <img onClick={sendText} src="/assets/send.jpg" alt="send-msg" className="send-icon" />
        </div>
      </div>
    </div>
  )
}

export default ChatDetails