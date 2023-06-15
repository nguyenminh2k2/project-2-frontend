import React, { useEffect, useState } from 'react';
import "./addMembers.css";
import { Form, Modal, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import { getAllUsers } from '../../redux/apiRequest';
import { addMember, getMembers, removerMember } from '../../redux/chatRequest';



const AddMembers = ({chat}) => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers);// mảng chứa tát cả các thành viên
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { Option } = Select;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [membersToAdd, setMembersToAdd] = useState([]);
    const [membersToRemove, setMembersToRemove] = useState([]);
    const [member, setMember] = useState([]);// mảng chứa thành viên trong nhóm

    //mảng chưa các user không có trong nhóm
    const otherUsers = userList?.filter((user) => !member.find((member) => member._id === user._id));      

      /* eslint-disable */
    useEffect(() => {
        if (user?.accessToken) {
          getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await getMembers(chat._id);
            setMember(response.data.members);
          } catch (error) {
            console.log(error);
          }
        };
    
        if (isModalOpen) {
          fetchMembers();
        }
    }, [isModalOpen, chat._id]);
    
    const handleAddMembers = (chatId) => {
        const addMembers = {
            membersToAdd: membersToAdd
        };
        addMember(chatId, addMembers, user?.accessToken, navigate, setIsModalOpen);
    }

    const handleRemoveMembers = (chatId) => {
        const addMembers = {
            membersToRemove: membersToRemove
        };
        removerMember(chatId, addMembers, user?.accessToken, navigate, setIsModalOpen);
    }


    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return ( 
        <div>
            <button className={chat?.members?.length <= 2 ? 'non-display' : 'fa-person-circle-pluss'}
                onClick={openModal}
            >
                <i className="fa-solid fa-user-plus fa-xl"></i>
            </button> 
            <Modal
                title="Thêm xóa thành viên"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}

            >
                <Form>
                    <Form.Item label="Add Members" name="members">
                        <Select 
                            mode="multiple"
                            placeholder="Select..." 
                            value={membersToAdd}
                            onChange={(values) => setMembersToAdd(values)}
                        >
                            {otherUsers?.map((user) => (
                                <Option key={user._id} value={user.username}>
                                    {user.username}
                                </Option>
                            ))}
                        </Select>    
                    </Form.Item>
                    <button className="button-add" onClick={() => handleAddMembers(chat._id)}>
                        <i className="fa-plus fa-lg">Add</i>
                    </button>
                    <Form.Item label="Remove Members" name="name">
                        <Select 
                            mode="multiple"
                            placeholder="Select..." 
                            value={membersToRemove}
                            onChange={(values) => setMembersToRemove(values)}
                        >
                            {member?.map((user) => (
                                <Option key={user._id} value={user.username}>
                                    {user.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <button className="button-remove" onClick={() => handleRemoveMembers(chat._id)}>
                        <i class="eraser">Remove</i>
                    </button>
                </Form>
            </Modal>
        </div>
    );
}
 
export default AddMembers;

