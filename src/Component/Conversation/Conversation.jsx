import React from "react";
import "./conversation.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/apiRequest";
// import { userChats } from "../../redux/chatRequest";

const Conversation = ({ data, currentUser, online }) =>{
    // const  user  = useSelector((state) => state.auth.login?.currentUser);

    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState({});
    const dispatch = useDispatch();

    /* eslint-disable */
    useEffect(()=> {
        if(data.members.length <= 2){
            const userId = data.members.find((id)=>id!==currentUser);
            const getUserData = async ()=> {
                try
                {
                    const {data} =await getUser(userId)
                    setUserData(data)
                    // console.log(data)
                    dispatch({type:"SAVE_USER", data:data})
                }
                catch(error)
                {
                    console.log(error)
                }
            } 
            // console.log(data.members)  
            getUserData(); 
        }
        else
        {
            setChatData(data);
        }
        
      }, [])

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
        if(chatData.name) {
            return (
                <img
                    src={userData?.profilePicture || 'https://cdn4.iconfinder.com/data/icons/avatar-1-2/100/Avatar-16-512.png'}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                /> 
            )
        }
    }
    
    const renderChatNames = () => {
        if (chatData.name) {
          return (
            <div className="username">
              {chatData.name}
            </div>
          );
        } else {
          return null;
        }
    };

    return (
        <>
        <div className="follower conversation">
            <div>
                {online && <div className="online-dot"></div>}
                { data?.members.length <= 2 ? renderUserPhoto() : renderChatPhoto()}
                <div className="name" style={{fontSize: '0.8rem'}}>
                    { data?.members.length <= 2 ? renderUsernames() : renderChatNames()}
                    <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
                </div>
            </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    );
};
export default Conversation;