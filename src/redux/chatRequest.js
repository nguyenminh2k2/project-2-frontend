import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000' });

// create chat 1-1
export const createChat = (data) => API.post('/v1/chat/', data);

// create chat group
export const createChatRoom = async ( chat, accessToken, navigate, setVisible) => {
    try {
      await axios.post("http://localhost:8000/v1/chat/chatroom/", chat, {
        headers: { token: `Bearer ${accessToken}` },
      });
      navigate("/chat");
      setVisible(false);
    } catch (err) {
        console.log(err);
    }
};

// get members
export const getMembers = (chatId) => API.get(`/v1/chat/members/${chatId}`);

// leave group
export const leaveGroupChat = async (chatId, accessToken, navigate, setIsModalOpen) => {
  try{
    await axios.put(`http://localhost:8000/v1/chat/leave/${chatId}`, chatId, {
      headers: { token: `Bearer ${accessToken}` },
    });
    navigate("/chat");
    alert("leave group successfully");
    setIsModalOpen(false);
  }catch(err){
    console.log(err);
    alert("You are no longer in this group");
    setIsModalOpen(false);
  }
};

export const addMember = async (chatId, chat, accessToken, navigate, setIsModalOpen) => {
  try{
    await axios.put(`http://localhost:8000/v1/chat/add/${chatId}`, chat, {
      headers: { token: `Bearer ${accessToken}` },
    });
    navigate("/chat");
    alert("add members successfully");
    setIsModalOpen(false);
  }catch(err){
    console.log(`ERROR: ${err}`);
    alert("You are no longer in this group");
    setIsModalOpen(false);
  }
}

export const removerMember = async (chatId, chat, accessToken, navigate, setIsModalOpen) => {
  try{
    await axios.put(`http://localhost:8000/v1/chat/remove/${chatId}`, chat, {
      headers: { token: `Bearer ${accessToken}` },
    });
    navigate("/chat");
    alert("remove members successfully");
    setIsModalOpen(false);
  }catch(err){
    console.log(err);
    alert("You aren't admin");
    setIsModalOpen(false);
  }
}

// get chat from user
export const userChats = (id) => API.get(`/v1/chat/${id}`);

//search chat
export const findChat = (firstId, secondId) => API.get(`/v1/chat/find/${firstId}/${secondId}`);

//get a chat
export const getAChat = (ChatId) => API.get(`/v1/chat/achat/${ChatId}`);