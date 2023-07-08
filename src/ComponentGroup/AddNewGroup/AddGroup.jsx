import { useDispatch, useSelector } from "react-redux";
import {Form, Input, Modal, Select} from "antd";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { useEffect, useState } from "react";
import "./addGroup.css";
import { getAllUsers } from "../../redux/apiRequest";
import { createGroup, } from "../../redux/groupRequest";

const AddGroup = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers);
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { Option } = Select;
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [members, setMembers] = useState([]);
    const [type, setType] = useState(true);

      /* eslint-disable */
    useEffect(() => {
        if (user?.accessToken) {
          getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const handleCreateGroup = (e) => {
        e?.preventDefault(); 
        const newGroup = {
            name: name,
            members: members,
            type: type
        };
        createGroup(newGroup, user?.accessToken, navigate, setVisible);
        window.location.reload();
    }

    const handleOk = async () => {
        handleCreateGroup();
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const openModal = () => {
        setVisible(true);
    }

    return (  
        <div>
            <button className="Create-group" onClick={openModal}>
                <h4>+ Create new Group</h4>
            </button>
            <Modal
                title="New Group"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form onSubmit={handleCreateGroup}>
                    <p style={{ color: "#fff" }}>ggg</p>
                    <Form.Item label="Name" name="name">
                        <Input 
                            placeholder="Tên phòng" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Item>
                    <h4 style={{ color: "#fff" }}>ggg</h4>
                    <Form.Item label="Members" name="members">
                        <Select 
                            mode="multiple"
                            placeholder="Select..." 
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
                    <h4 style={{ color: "#fff" }}>ggg</h4>
                    <Form.Item label="Type" name="type">
                        <Select
                            placeholder="Public"
                            value={type} // Giá trị được chọn sẽ là giá trị của biến state 'type'
                            onChange={(value) => setType(value)} // Cập nhật giá trị khi người dùng chọn
                        >
                            <Select.Option value={true}>Public</Select.Option>
                            <Select.Option value={false}>Private</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
 
export default AddGroup;