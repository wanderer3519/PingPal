/**
 * This page is used to display the chats and contacts
 */

import ChatList from "@components/ChatList"
import Contacts from "@components/Contacts"

const chats = () => {
  
  return (
    <div className="main-container">
      {/* Display the chat list and contacts */}
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full"> <ChatList/> </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden"> <Contacts/> </div>
    </div>
  )
}

export default chats