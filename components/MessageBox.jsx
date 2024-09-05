import { format } from "date-fns"

const MessageBox = ({ message, currentUser }) => {
  // console.log("User123", currentUser)
  // console.log("Message123", message)

  const dateFormatter = (date) => {
    const getOrdinalSuffix = () => { 
      if (getOrdinalSuffix > 3 && getOrdinalSuffix < 21) return 'th'; // covers 11th to 13th
      switch (getOrdinalSuffix % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }
    const day = format(date, 'd'); // get the day without leading zero
    const month = format(date, 'MMMM').slice(0,3); // full month name
    const year = format(date, 'yyyy'); // full year
    const ordinalSuffix = getOrdinalSuffix(parseInt(day)); // get ordinal suffix for the day

    const time = format(date, 'hh:mm aaaa')
    return `${day}${ordinalSuffix} ${month} ${year}: ${time}`;
  }

  return message?.sender?._id !== currentUser._id ? (
    <div className="message-box">
      <img src={message?.sender?.profileImage || "/assets/person.jpg"} alt="profile-pic"
        className="message-profilePhoto" />

      <div className="message-info">
        <p className="text-small-bold">
          {message?.sender?.username} &#160; &#183; &#160; {dateFormatter(new Date(message?.createdAt))}
        </p>

        {message?.text ? (
          <p className="message-text"> {message?.text} </p>
        ) : (
          <img src={message?.photo} alt="message" className="message-photo" />
        )}
      </div>
    </div>
  ) :
    (<div className="message-box justify-end">
      <div className="message-info items-end">
        <p className="text-small-bold">
          {dateFormatter(new Date(message?.createdAt))}
        </p>

        {message?.text ? (
          <p className="message-text-sender"> {message?.text} </p>
        ) : (
          <img src={message?.photo} alt="message" className="message-photo" />
        )}

      </div>
    </div>)
}

export default MessageBox