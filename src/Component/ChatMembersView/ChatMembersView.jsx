import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './chatView.css';
import { getMembers, leaveGroupChat } from '../../redux/chatRequest';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ChatMembersView = ({ chat }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
//   const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);

  const handleLeaveGroup = (chatId) => {
    leaveGroupChat(chatId,user?.accessToken, navigate, setIsModalOpen)
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers(chat._id);
        setMembers(response.data.members);
      } catch (error) {
        console.log(error);
      }
    };

    if (isModalOpen) {
      fetchMembers();
    }
  }, [isModalOpen, chat._id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className={chat?.members?.length <= 2 ? 'non-display' : 'display'}
        onClick={openModal}
      >
        <img
          src="https://media.istockphoto.com/id/957096060/vi/vec-to/ba-ch%E1%BA%A5m-ba-ch%E1%BA%A5m-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng.jpg?s=612x612&w=0&k=20&c=KbwRHON522qZ3m3aqpTrPfJZ6T45IA8d-1iiKsvsFcU="
          alt="3 chấm"
          style={{ width: '35px' }}
          className="display-img"
        />
      </button>

      <Modal
        title="Danh sách thành viên"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <ul>
          {members?.map((member) => (
            <div className='div-members' key={member.id}>
              <li className='list-members'>{member.username}</li>
            </div>
          ))}
        </ul>
       
        <button className='button-leave' onClick={() => handleLeaveGroup(chat._id)}>
            <i className="fa-solid fa-arrow-up-from-bracket fa-rotate-90"></i>
            <p className="leave">Leave</p>
        </button>
      </Modal>
    </div>
  );
};

export default ChatMembersView;



