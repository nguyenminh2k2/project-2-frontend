import React, { useEffect, useRef, useState } from "react";
import { getAllUsers, getUser } from "../../redux/apiRequest";
import { addMessage, getMessages } from "../../redux/MessageRequest";
import "./chatbox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import ChatMembersView from "../ChatMembersView/ChatMembersView";
import AddMembers from "../AddMembers/AddMembers";

const ChatBox = ({ chat, currentUser, online,setSendMessage, receivedMessage }) => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    // const userList = useSelector((state) => state.users.users?.allUsers);
    // const [showMembers, setShowMembers] = useState(false);
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // const getUserName = (senderId) => {
    //     const users = userList.find((user) => user._id === senderId);
        
    //     if(users){
    //         return user.username;
    //     }else{
    //         return null;
    //     }
    // }
    // const users = userList.filter((user) => user._id === chatData?.members);
    // console.log(users)
    // console.log(getUserName(chatData))
    // // console.log(messages.id)
    // // console.log(chatData?.members)

  /* eslint-disable */
    useEffect(() => {
        if (user?.accessToken) {
          getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
      }, []);
//  fetching data for header
    useEffect(() => {
        if(chat?.members.length <= 2){
            const userId = chat?.members?.find((id)=>id!==currentUser);
            const getUserData = async ()=> {
                try
                {
                    const {data} =await getUser(userId);
                    setUserData(data);
                }
                catch(error)
                {
                    console.log(error);
                }
            }
            if(chat !== null) getUserData();
        }else{
            setChatData(chat);
        }
       
    },[chat, currentUser])

//  fetching data for messages
    useEffect(() => {
        const fetchMessages = async () => {
        try {
            const { data } = await getMessages(chat._id);
            setMessages(data);
        } catch (error) {
            console.log(error);
        }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);

      // Always scroll to last Message
        useEffect(()=> {
            scroll.current?.scrollIntoView({ behavior: "smooth" });
        },[messages])

    const handleChange = (newMessage) =>{
        setNewMessage(newMessage)
    }

    // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    // const receiverId = chat.members.find((id)=>id!==currentUser);
    const receiverId = chat.members.find((id)=>id!==currentUser);
    // send message to socket server
    setSendMessage({...message, receiverId});
    // send message to database
    try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessage("");
    }
    catch
    {
        console.log("error")
    }
    }

    // Receive Message from parent component
    /* eslint-disable */
    useEffect(()=> {
        // console.log("Message Arrived: ", receivedMessage);
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }
    
    },[receivedMessage])

    const renderUsernames = () => {
        if (userData) {
          return (
            <div className="username">
              {userData.username}
            </div>
          );
        } else {
          return null;
        }
      };

    const renderUserPhoto = () => {
        if(userData) {
            return(
                <img
                    src={userData?.profilePicture}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                /> 
            )
        } else {
            return null;
        }
    };

    const renderChatPhoto = () =>{
        if(chatData?.name) {
            return (
                <img
                    src={chatData?.profilePicture || 'https://cdn2.iconfinder.com/data/icons/avatar-profile/478/avatar_group_couple_account_user_default_team-512.png'}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                /> 
            )
        }else {
            return null;
        }
    }
    
    const renderChatNames = () => {
        if (chatData?.name) {
          return (
            <div className="username">
              {chatData.name}
            </div>
          );
        } else {
          return null;
        }
    };
    
    const scroll = useRef();

    return(
        <> 
        <div className="Chatbox-container">
            {chat? (
                <>
                {/* chat-header */}
                <div className="chat-header">
                    <div className="follower">
                        <div>
                            <ChatMembersView
                                chat = {chat}
                            />
                            <AddMembers
                                chat = {chat}
                            />
                            {online && <div className="online-dot"></div>}
                            { chat?.members.length <= 2 ? renderUserPhoto() : renderChatPhoto()}
                            <div className="Name" style={{fontSize: '0.8rem'}}>
                                {chat?.members.length <= 2 ? (
                                  renderUsernames()
                                ) : (
                                  renderChatNames()
                                )}
                            </div>
                            
                        </div>
                        
                        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                    </div>
                </div>
                
                {/* chat-body */}
                <div className="chat-body">
                    {messages.map((message) => (
                        <>
                        <div ref={scroll}
                            className={
                            message.senderId === currentUser
                                ? "message own"
                                : "message"
                            }
                        >
                            <span>{message.text}</span>{" "}
                            <span>{format(message.createdAt)}</span>
                        </div>
                        </>
                    ))}
                </div>
                {/* chat-sender */}
                <div className="chat-sender">
                    <div>+</div>
                    <InputEmoji 
                        value={newMessage}
                        onChange={handleChange}
                    />
                    <div className="send-button button" onClick = {handleSend}>
                        Send
                    </div>
                </div>
            </>
            ) : (
                <span className="chatbox-empty-message">
                    Tap on a chat to start conversation...
                </span>
            )}
            
        </div>
        </>
        
    );
};

export default ChatBox;