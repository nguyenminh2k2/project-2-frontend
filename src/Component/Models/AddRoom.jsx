import React, { useEffect, useState } from "react";
import {Form, Input, Modal, Select} from "antd";
import './addRoom.css';
import { createChatRoom } from "../../redux/chatRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { getAllUsers } from "../../redux/apiRequest";

const AddRoom = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers);
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { Option } = Select;
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [members, setMembers] = useState([]);

      /* eslint-disable */
    useEffect(() => {
        if (user?.accessToken) {
          getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const handleCreateChatRoom = (e) => {
        e?.preventDefault(); 
        const newChatRoom = {
            name: name,
            members: members
        };
        createChatRoom(newChatRoom, user?.accessToken, navigate, setVisible)
    }

    const handleOk = () => {
        handleCreateChatRoom();
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const openModal = () => {
        setVisible(true);
    }

    return (
        <div>
            <button className="icon-button" onClick={openModal}><img src="https://cdn-icons-png.flaticon.com/512/4458/4458537.png" alt="add-chat" className="icon-img"/></button>
            <Modal
                title="Create Room"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form onSubmit={handleCreateChatRoom}>
                    <Form.Item label="Name" name="name">
                        <Input 
                            placeholder="Tên phòng" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Members" name="members">
                        <Select 
                            mode="multiple"
                            placeholder="select..." 
                            value={members}
                            onChange={(values) => setMembers(values)}
                        >
                            {userList?.map((user) => (
                                <Option key={user._id} value={user.username}>
                                    {user.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}


export default AddRoom;